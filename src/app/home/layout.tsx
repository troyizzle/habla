type HomeLayoutProps = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div className="max-w-7xl mx-auto">
    {children}
  </div>
}
