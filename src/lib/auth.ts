import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ROUTES } from "@/lib/constants"
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
            return {
              id: loginResponse.user.id,
              email: loginResponse.user.email,
              name: loginResponse.user.name,
              role: loginResponse.user.role,
              token: loginResponse.token,
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
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        // Store the auth token in the JWT token
        if (user.token) {
          token.authToken = user.token
        }
      }
      return token
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.sub!
          session.user.role = token.role as string
          // Include the auth token in the session
          session.token = token.authToken as string
        }
        return session
      } catch (error) {
        console.error('NextAuth session callback error:', error)
        return session
      }
    }
  },
  pages: {
    signIn: ROUTES.AUTH.SIGNIN,
    error: ROUTES.AUTH.ERROR
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('User signed in:', user.email)
    },
    async signOut({ token }) {
      console.log('User signed out')
    },
    async session({ session, token }) {
      // This is called every time a session is checked
      return session
    }
  }
}
