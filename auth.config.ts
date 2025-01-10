import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./zod-schema";
import { getUserByEmail } from "./lib/db/user";
import bcryptjs from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          //! Check if the user exists and haven't looged from Oauth
          if (!user || !user.password) {
            return null;
          }
          const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
