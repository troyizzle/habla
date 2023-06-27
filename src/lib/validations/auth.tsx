import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long"
  }).max(40, {
    message: "Name must be less than 40 characters long"
  }),
  email: z.string().email(),
  dob: z.string().min(10, {
    message: "Date of birth must be at least 10 characters long"
  }).max(10, {
    message: "Date of birth must be less than 10 characters long"
  })
})

export type Auth = z.infer<typeof authSchema>

export const termsSchema = z.object({
  terms: z.boolean()
})

export type Terms = z.infer<typeof termsSchema>

export const verifyEmailSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be at least 6 characters long"
  }).max(6)
})

export type VerifyEmail = z.infer<typeof verifyEmailSchema>

// TODO: Make this password criteria stronger
export const passwordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }).max(40, {
    message: "Password must be less than 40 characters long"
  })
})

export type Password = z.infer<typeof passwordSchema>

export const usernameSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long"
  }).max(40, {
    message: "Username must be less than 40 characters long"
  })
})

export type Username = z.infer<typeof usernameSchema>

