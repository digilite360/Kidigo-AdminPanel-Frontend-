import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { USER_ROLES, ROUTES } from "@/lib/constants"
import { vendors } from "@/app/api/vendors/register/route"

// Mock user data - replace with your actual user database
const users = [
  {
    id: "1",
    email: "admin@kidigo.com",
    password: "$2b$10$z.zPputTP0cANGUX3jPgQuLg4VIOziz5IspqBnatPwyHLlkgU7ZUC", // password: admin123
    name: "Admin User",
    role: USER_ROLES.ADMIN
  }
]

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

        // Check admin users first
        const adminUser = users.find((u) => u.email === credentials.email)
        if (adminUser) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            adminUser.password
          )

          if (isPasswordValid) {
            return {
              id: adminUser.id,
              email: adminUser.email,
              name: adminUser.name,
              role: adminUser.role,
            }
          }
        }

        // Check vendor users
        const vendor = vendors.find((v) => v.email === credentials.email)
        if (vendor) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            vendor.password
          )

          if (isPasswordValid) {
            return {
              id: vendor._id,
              email: vendor.email,
              name: vendor.vendorName,
              role: vendor.role,
            }
          }
        }

        return null
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
