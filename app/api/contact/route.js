import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

const messagesFilePath = path.join(process.cwd(), "data", "messages.json");

function getLocalMessages() {
  try {
    if (fs.existsSync(messagesFilePath)) {
      return JSON.parse(fs.readFileSync(messagesFilePath, "utf-8"));
    }
  } catch (e) {
    console.error("Yerel mesaj okuma hatası:", e);
  }
  return [];
}

function saveLocalMessages(messages) {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("Yerel mesaj kaydetme hatası:", e);
  }
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbMessages = await Message.find().sort({ createdAt: -1 }).lean();
      const formatted = dbMessages.map((m) => ({
        id: m._id.toString(),
        _id: m._id.toString(),
        name: m.name,
        phone: m.phone,
        email: m.email,
        subject: m.subject,
        message: m.message,
        createdAt: m.createdAt,
      }));
      saveLocalMessages(formatted);
      return NextResponse.json(formatted);
    }
  } catch (err) {
    console.warn("MongoDB mesaj çekme hatası, yerel JSON deposuna dönülüyor:", err.message);
  }

  // Fallback: Yerel JSON
  const fallback = getLocalMessages();
  return NextResponse.json(fallback);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body || {};

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Ad Soyad, Telefon ve Mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    const messageData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      subject: subject || "Genel Bilgi / Teklif",
      message: message.trim(),
      createdAt: new Date(),
    };

    let createdId = Date.now().toString();

    // MongoDB'ye kaydet
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const created = await Message.create(messageData);
        createdId = created._id.toString();
      }
    } catch (dbErr) {
      console.warn("MongoDB mesaj ekleme hatası, yerel depoya yazılıyor:", dbErr.message);
    }

    // Yerel JSON'a da kaydet (Failover)
    const local = getLocalMessages();
    const itemToSave = { id: createdId, _id: createdId, ...messageData };
    local.unshift(itemToSave);
    saveLocalMessages(local);

    return NextResponse.json(
      { success: true, message: "Mesajınız başarıyla iletildi.", data: itemToSave },
      { status: 201 }
    );
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    return NextResponse.json({ error: "Mesaj gönderilirken bir hata oluştu." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Mesaj ID parametresi eksik." }, { status: 400 });
    }

    // MongoDB'den sil
    try {
      const conn = await connectToDatabase();
      if (conn) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          await Message.findByIdAndDelete(id);
        } else {
          await Message.deleteOne({ $or: [{ _id: id }, { id: id }] });
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB mesaj silme hatası, yerel depodan siliniyor:", dbErr.message);
    }

    // Yerel JSON'dan sil
    const local = getLocalMessages();
    const filtered = local.filter((m) => String(m.id) !== String(id) && String(m._id) !== String(id));
    saveLocalMessages(filtered);

    return NextResponse.json({ success: true, message: "Mesaj başarıyla silindi." });
  } catch (error) {
    console.error("Mesaj silme hatası:", error);
    return NextResponse.json({ error: "Mesaj silinirken bir hata oluştu." }, { status: 500 });
  }
}
