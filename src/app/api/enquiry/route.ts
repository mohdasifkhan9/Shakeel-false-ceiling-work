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

  try {
    await db.insert(enquiries).values({
      name,
      phone,
      location: clip(body.location, 160),
      propertyType: clip(body.propertyType, 60),
      service: clip(body.service, 120),
      area: clip(body.area, 40),
      message: clip(body.message, 2000),
      attachmentName: clip(body.attachmentName, 200),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "We couldn't save your enquiry right now — please try again." },
      { status: 500 },
    );
  }
}
