import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Quote / contact enquiries submitted through the site form.
 * Personal data is kept minimal — only what a callback needs.
 */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  location: text("location"),
  propertyType: text("property_type"),
  service: text("service"),
  area: text("area"),
  message: text("message"),
  attachmentName: text("attachment_name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
