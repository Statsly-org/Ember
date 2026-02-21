import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'auth.db')

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === 'production' ? 'https://ember.st3ix.net' : 'http://localhost:3000'),
  secret: process.env.BETTER_AUTH_SECRET,
  database: new Database(dbPath),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
})
