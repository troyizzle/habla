import { sql, type InferModel } from "drizzle-orm"
import {
  serial,
  mysqlTable,
  varchar,
  text,
  datetime
} from "drizzle-orm/mysql-core"

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  body: varchar("body", { length: 420 }),
  createdById: text("created_by_id").notNull(),
  createdAt: datetime("createdAt", { mode: "string", fsp: 3}).notNull().default(sql`CURRENT_TIMESTAMP(3)`)
})

export type Post = InferModel<typeof posts>
