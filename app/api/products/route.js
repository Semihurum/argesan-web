import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

const productsFilePath = path.join(process.cwd(), "data", "products.json");
const siteDataFilePath = path.join(process.cwd(), "data", "siteData.json");

function getLocalProducts() {
  try {
    if (fs.existsSync(productsFilePath)) {
      return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    }
  } catch (e) {
    console.error("Yerel ürünler okuma hatası:", e);
  }
  return [];
}

function saveLocalProducts(products) {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf-8");
    if (fs.existsSync(siteDataFilePath)) {
      const siteData = JSON.parse(fs.readFileSync(siteDataFilePath, "utf-8"));
      siteData.products = products;
      fs.writeFileSync(siteDataFilePath, JSON.stringify(siteData, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Yerel ürün kaydetme hatası:", e);
  }
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      let dbProducts = await Product.find().sort({ createdAt: -1 }).lean();

      // Veritabanı henüz boşsa yerel 9 ürünü MongoDB'ye otomatik seed et
      if (!dbProducts || dbProducts.length === 0) {
        const local = getLocalProducts();
        if (local.length > 0) {
          const seeded = await Product.insertMany(
            local.map((p) => ({
              title: p.title,
              category: p.category,
              categoryBadge: p.categoryBadge || p.category,
              description: p.description || p.desc || "",
              image: p.image,
            }))
          );
          dbProducts = seeded.map((doc) => doc.toObject());
        }
      }

      const formatted = dbProducts.map((p) => ({
        id: p._id.toString(),
        _id: p._id.toString(),
        title: p.title,
        category: p.category,
        categoryBadge: p.categoryBadge || p.category,
        description: p.description,
        image: p.image,
        createdAt: p.createdAt,
      }));

      // Yerel fallback deposunu da senkronize et
      saveLocalProducts(formatted);
      return NextResponse.json(formatted);
    }
  } catch (err) {
    console.warn("MongoDB ürün çekme hatası, yerel JSON deposuna dönülüyor:", err.message);
  }

  // Fallback: Yerel JSON
  const fallback = getLocalProducts();
  return NextResponse.json(fallback);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, description, image, categoryBadge } = body || {};

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Başlık, kategori ve açıklama alanları zorunludur." },
        { status: 400 }
      );
    }

    const badgeMap = {
      "WEB & E-TİCARET": "Web & Yazılım",
      "GÜVENLİK KAMERA": "Güvenlik Kamera",
      "POS & DONANIM": "POS & Donanım",
      "YAZICI & BARKOD": "Yazıcı & Barkod",
      "YAZILIM": "ERP & Yazılım",
    };

    const newProductData = {
      title: title.trim(),
      category: category.trim(),
      categoryBadge: categoryBadge || badgeMap[category] || category,
      description: description.trim(),
      image: image?.trim() || "/images/products/web-cms-mockup.png",
      createdAt: new Date(),
    };

    let createdId = Date.now().toString();

    // MongoDB'ye kaydet
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Product.create(newProductData);
        createdId = created._id.toString();
      }
    } catch (dbErr) {
      console.warn("MongoDB ürün ekleme hatası, yerel depoya yazılıyor:", dbErr.message);
    }

    // Yerel JSON'a da ekle (Failover)
    const local = getLocalProducts();
    const itemToSave = { id: createdId, _id: createdId, ...newProductData };
    local.unshift(itemToSave);
    saveLocalProducts(local);

    return NextResponse.json(itemToSave, { status: 201 });
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    return NextResponse.json({ error: "Ürün eklenirken bir hata oluştu." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ürün ID parametresi eksik." }, { status: 400 });
    }

    // MongoDB'den sil
    try {
      const conn = await connectToDatabase();
      if (conn) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          await Product.findByIdAndDelete(id);
        } else {
          await Product.deleteOne({ $or: [{ _id: id }, { id: id }] });
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB silme hatası, yerel depodan siliniyor:", dbErr.message);
    }

    // Yerel JSON'dan da sil
    const local = getLocalProducts();
    const filtered = local.filter((p) => String(p.id) !== String(id) && String(p._id) !== String(id));
    saveLocalProducts(filtered);

    return NextResponse.json({ success: true, message: "Ürün başarıyla silindi." });
  } catch (error) {
    console.error("Ürün silme hatası:", error);
    return NextResponse.json({ error: "Ürün silinirken bir hata oluştu." }, { status: 500 });
  }
}
