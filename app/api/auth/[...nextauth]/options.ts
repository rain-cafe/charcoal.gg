import { getDatabase } from '@/backend/database';
import { compareSync } from 'bcrypt';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials';

const credentialTypes = {
  email: { label: 'Email', type: 'text', placeholder: 'example@domain.com' },
  password: { label: 'Password', type: 'password', placeholder: '********' },
} as const satisfies Record<string, CredentialInput>;

export const options: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: credentialTypes,
      async authorize(rawCredentials) {
        const credentials = rawCredentials as Record<keyof typeof credentialTypes, string | undefined>;

        if (!credentials.email || !credentials.password) return null;

        const db = await getDatabase();

        let user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.info('user does not exist, creating...');
          user = await db.user.create({
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          });
        }

        if (!compareSync(credentials.password as string, user.password)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image,
        };
      },
    }),
    // // Google
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // // Facebook
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    // // Apple
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    // }),
    // // Discord
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
  ],
};
