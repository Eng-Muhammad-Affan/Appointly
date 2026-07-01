import {
  pgTable,
  time,
  text,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./users";
import { type InferSelectModel } from "drizzle-orm";

export const service = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  image: text("image").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  price: integer("price").notNull(),
  currency: varchar("currency").notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  working_days: text("working_days").array().notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  duration: integer("duration").notNull(),

  max_appointments_per_day: integer("max_appointments_per_day").notNull(),
  ratings: integer("ratings").array().default([]).notNull(),
  details: text("details").array().default([]).notNull(),

  maxCapacity: integer("max_capacity").default(1).notNull(),
  last_generated: timestamp("last_count_reset").defaultNow().notNull(),

  buffer_time_in_min: integer("buffer_time").notNull(),
  cancellation_policy_hrs: integer("cancellation_policy_hrs").notNull(), // 2hrs , 24hrs , 48hrs, 0 for non  refundable
});

export type Service = InferSelectModel<typeof service>;
