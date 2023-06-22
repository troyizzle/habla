import { type InferModel } from "drizzle-orm"
import {
  serial,
  mysqlTable,
  varchar,
  text
} from "drizzle-orm/mysql-core"

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  body: varchar("body", { length: 420 }),
  createdById: text("created_by_id").notNull(),
})

export type Post = InferModel<typeof posts>
