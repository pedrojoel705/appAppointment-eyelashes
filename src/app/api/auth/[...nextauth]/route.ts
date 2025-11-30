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
        // Para OAuth providers (Google, Facebook)
        if (account?.provider !== "credentials") {
          await dbConnect();

          // Verificar si el usuario ya existe
          let existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            // Crear nuevo usuario desde OAuth
            const nameParts = user.name?.split(" ") || ["", ""];
            existingUser = await UserModel.create({
              email: user.email,
              firtsName: nameParts[0] || "Usuario",
              lastName: nameParts.slice(1).join(" ") || "OAuth",
              phonne: "",
              password: Math.random().toString(36).slice(-8), // Password temporal para OAuth users
              role: "client",
            });
          }

          // Actualizar el objeto user con datos de la base de datos
          user.id = existingUser._id.toString();
          (user as any).role = existingUser.role;
          (user as any).phone = existingUser.phonne || "";
        }

        return true;
      } catch (error) {
        console.error("Error en signIn callback:", error);
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
