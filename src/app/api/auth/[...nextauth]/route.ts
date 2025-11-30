import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "@/models";
import dbConnect from "@/lib/dbConnect";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        await dbConnect();

        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firtsName} ${user.lastName}`,
          role: user.role,
          phone: user.phonne,
        } as any;
      }
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
                scope: "openid email profile"
              }
            },
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                role: "client"
              } as any
            }
          }),
        ]
      : []),
    // Facebook deshabilitado - Descomentar cuando tengas las credenciales
    // ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
    //   ? [
    //       FacebookProvider({
    //         clientId: process.env.FACEBOOK_CLIENT_ID,
    //         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //       }),
    //     ]
    //   : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as any).phone = (token.phone as string) || "";
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider !== "credentials") {
          // Para OAuth providers, crear/actualizar usuario en la base de datos
          await dbConnect();
          
          const existingUser = await UserModel.findOne({ email: user.email });
          
          if (!existingUser) {
            // Crear nuevo usuario desde OAuth
            const nameParts = (user.name || "").split(" ");
            const firstName = nameParts[0] || "Usuario";
            const lastName = nameParts.slice(1).join(" ") || "OAuth";
            
            await UserModel.create({
              firstName: firstName,
              lastName: lastName,
              email: user.email,
              phonne: "", // OAuth no proporciona teléfono (ahora opcional)
              role: "client",
              // password no es necesario para usuarios OAuth
            });
          }
          
          (user as any).role = existingUser?.role || "client";
          (user as any).phone = existingUser?.phonne || "";
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
