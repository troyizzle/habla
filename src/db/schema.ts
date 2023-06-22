import { type InferModel } from "drizzle-orm"
import {
  serial,
  mysqlTable,
  varchar
} from "drizzle-orm/mysql-core"

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  body: varchar("body", { length: 420 })
})

export type Post = InferModel<typeof posts>
