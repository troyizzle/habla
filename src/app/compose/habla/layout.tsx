type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div className="container mx-auto pt-2">
    {children}
  </div>
}
