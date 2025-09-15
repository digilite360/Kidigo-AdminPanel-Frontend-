import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { USER_ROLES, ROUTES } from "@/lib/constants"
import { authService } from "@/lib/api/services/auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Use the external API for authentication
          const loginResponse = await authService.login({
            email: credentials.email,
            password: credentials.password
          })

          if (loginResponse.success && loginResponse.user) {
            // Store the auth token in localStorage if available
            if (loginResponse.token && typeof window !== 'undefined') {
              localStorage.setItem('authToken', loginResponse.token)
            }

            return {
              id: loginResponse.user.id,
              email: loginResponse.user.email,
              name: loginResponse.user.name,
              role: loginResponse.user.role,
            }
          }

          return null
        } catch (error) {
          console.error('NextAuth authorize error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: ROUTES.AUTH.SIGNIN,
    error: ROUTES.AUTH.ERROR
  }
}
