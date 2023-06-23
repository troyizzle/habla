'use client'

import { ThemeProvider } from "next-themes"

type ProviderProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
