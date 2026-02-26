import { pgTable, text, timestamp, json, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  checklistProgress: json("checklist_progress").$type<string[]>().default([]),
  demoPageId: text("demo_page_id"),
});

export const demoPages = pgTable("demo_pages", {
  id: text("id").primaryKey(),
  html: text("html").notNull(),
  prompt: text("prompt").notNull(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  persisted: boolean("persisted").default(false),
  /** Number of AI-powered tweaks applied to this page. */
  iterationCount: integer("iteration_count").default(0).notNull(),
});

export const emailCaptures = pgTable("email_captures", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").default("tutorial_completion"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pushes = pgTable("pushes", {
  id: text("id").primaryKey(),
  author: text("author").notNull(),
  summary: text("summary").notNull(),
  commitHash: text("commit_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
