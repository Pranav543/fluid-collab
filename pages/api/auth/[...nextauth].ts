import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const scopes = ['identify', 'email']



export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID ?? "",
          clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
          authorization: {params: {scope: scopes.join(' ')}},
        }),
      ],
  };

export default NextAuth(authOptions);