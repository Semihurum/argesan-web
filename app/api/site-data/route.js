import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const siteDataFilePath = path.join(process.cwd(), "data", "siteData.json");

function getSiteData() {
  try {
    if (!fs.existsSync(siteDataFilePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(siteDataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("siteData.json okunurken hata oluştu:", error);
    return null;
  }
}

export const dynamic = "force-dynamic";

function saveSiteData(data) {
  try {
    fs.writeFileSync(siteDataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Vercel dosya sistemi salt-okunur (read-only), yerel diske yazma atlandı:", e.message);
  }
}

export async function GET() {
  try {
    const data = getSiteData();
    if (!data) {
      return NextResponse.json({ error: "Site verisi bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Site verisi getirilemedi." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Geçersiz veri formatı." }, { status: 400 });
    }

    const current = getSiteData() || {};
    const updated = {
      ...current,
      ...body,
    };

    saveSiteData(updated);

    // Eğer products güncellendiyse data/products.json dosyasını da senkronize et
    if (Array.isArray(body.products)) {
      try {
        const prodPath = path.join(process.cwd(), "data", "products.json");
        fs.writeFileSync(prodPath, JSON.stringify(body.products, null, 2), "utf-8");
      } catch (err) {
        console.error("products.json senkron hatası:", err);
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Site verisi güncellenirken hata:", error);
    return NextResponse.json({ error: "Site verisi kaydedilemedi." }, { status: 500 });
  }
}
