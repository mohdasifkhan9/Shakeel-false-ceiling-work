import { db } from "@/db";
import { enquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

const clip = (v: unknown, max = 160): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clip(body.name, 120);
  const phone = clip(body.phone, 40);

  if (!name || name.length < 2) {
    return Response.json({ error: "Please share your name." }, { status: 400 });
  }
  if (!phone || phone.replace(/[^\d]/g, "").length < 8) {
    return Response.json(
      { error: "Please share a valid phone number so we can reach you." },
      { status: 400 },
    );
  }

  const location = clip(body.location, 160);
  const propertyType = clip(body.propertyType, 60);
  const service = clip(body.service, 120);
  const area = clip(body.area, 40);
  const message = clip(body.message, 2000);
  const attachmentName = clip(body.attachmentName, 200);

  let dbSuccess = false;
  let sheetSuccess = false;

  // Try database insert
  try {
    if (db) {
      await db.insert(enquiries).values({
        name,
        phone,
        location,
        propertyType,
        service,
        area,
        message,
        attachmentName,
      });
      dbSuccess = true;
    } else {
      console.warn("Database not initialized (missing DATABASE_URL). Skipping DB insert.");
    }
  } catch (dbErr) {
    console.error("Database insertion failed for enquiry:", dbErr);
  }

  // Forward to Google Sheets Webhook if configured
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "https://script.google.com/macros/s/AKfycbwy4eHVhWxgFj_-pYUXWW3ak2It0E4J68aF-yMaNOnoW51Ug5vwbrHNJkzBW9pKRHGh/exec";
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          name,
          phone,
          location: location || "",
          propertyType: propertyType || "",
          service: service || "",
          area: area || "",
          message: message || "",
        }),
      });
      if (response.ok) {
        sheetSuccess = true;
      } else {
        console.error("Google Sheets webhook returned non-OK status:", response.status);
      }
    } catch (webhookErr) {
      console.error("Failed to forward enquiry to Google Sheets Webhook:", webhookErr);
    }
  }

  // If at least one save destination succeeded, we return success to the client
  if (dbSuccess || sheetSuccess) {
    return Response.json({ ok: true });
  }

  return Response.json(
    { error: "We couldn't save your enquiry right now — please try again." },
    { status: 500 },
  );
}
