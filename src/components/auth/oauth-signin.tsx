import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { useState } from "react";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" }
] satisfies {
  name: string,
  icon: keyof typeof Icons,
  strategy: OAuthStrategy
}[]

export default function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return

    try {
      setIsLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = "An unknown error occurred. Please try again later."

      isClerkAPIResponseError(error) ?
        toast.error(error.errors[0]?.longMessage ?? unknownError) :
        toast.error(unknownError)
    }
  }

  return (
    <>
      {
        oauthProviders.map((provider) => {
          const Icon = Icons[provider.icon]

          return (
            <Button
              key={provider.strategy}
              variant="outline"
              className="w-full bg-background sm:w-auto"
              onClick={() => void oauthSignIn(provider.strategy)}
            >
              {isLoading === provider.strategy ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icon className="mr-2 h-4 w-4" />
              )}
              Sign in with {provider.name}
            </Button>
          )
        })
      }
    </>
  )
}
