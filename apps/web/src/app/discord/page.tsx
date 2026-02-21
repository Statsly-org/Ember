import { redirect } from 'next/navigation'

export default function DiscordPage() {
  const url = process.env.DISCORD_URL || 'https://discord.com/users/1451891299396616206'
  redirect(url)
}
