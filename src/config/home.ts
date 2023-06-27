import type { SidebarNavItem } from "@/types"

export type HomeConfig = {
  sidebarNav: SidebarNavItem[]
}

export const homeConfig: HomeConfig = {
  sidebarNav: [
    {
      title: "Home",
      href: "/",
      icon: 'home',
      items: []
    }
  ]
}
