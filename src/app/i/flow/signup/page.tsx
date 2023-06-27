"use client"

import OAuthSignIn from "@/components/auth/oauth-signin";
import { Button } from "@/components/ui/button";
import { useSignUpForm } from "@/context/sign-up-provider";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [isEditing, setIsEditing] = useState(false)
  const { form } = useSignUpForm()

  if (isEditing) {
    return (
      form
    )
  }

  return (
    <>
      <div className="flex flex-col justify-center p-4 min-h-screen">
        <h1 className="text-2xl font-bold -mt-24">Join Habla today</h1>
        <div className="mt-6">
          <div className="flex flex-col gap-4">
            <OAuthSignIn />
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full md:w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-white -translate-x-1/2 left-1/2 bg-background">or</span>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="lg"
              className="w-full">Create Account</Button>
            <div>
              <span>Already have an account?</span>
              <Link className="text-blue-300" href="/i/flow/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
