import { type Icons } from "@/components/icons"
import { User } from "@clerk/nextjs/dist/types/server"

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export type NavItemWithChildren = NavItem  & {
  items: NavItemWithChildren[]
}

export type Post = {
  id: number
  body: string
  createdById: string
  createdAt: string
}

export type PostWithUser = Post & {
  user: User
}

export type SidebarNavItem = NavItemWithChildren
