import SignUpProvider from "@/context/sign-up-provider";

type SignUpLayoutProps = {
  children: React.ReactNode
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <div className="safe-bottom">
      <SignUpProvider>
        {children}
      </SignUpProvider>
    </div>
  )
}
