import NextAuth, { AuthOptions } from "next-auth";
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const user = await UserModel.findOne({ email: credentials.email });
        
        if (!user) return null;
        
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) return null;

        return {
          id: (user._id as any).toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          phone: user.phonne || "",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("=== SIGNIN CALLBACK ===");
      console.log("Provider:", account?.provider);
      
      if (account?.provider === "google") {
        await dbConnect();
        
        let dbUser = await UserModel.findOne({ email: user.email });
        console.log("User exists in DB:", !!dbUser);
        
        if (!dbUser) {
          const [firstName, ...rest] = user.name?.split(" ") || ["Usuario"];
          dbUser = await UserModel.create({
            firstName,
            lastName: rest.join(" ") || "",
            email: user.email,
            phonne: "",
            role: "client",
          });
          console.log("New user created");
        }
        
        console.log("DB User phone:", dbUser.phonne);
        
        (user as any).dbId = (dbUser._id as any).toString();
        (user as any).phone = dbUser.phonne || "";
        (user as any).role = dbUser.role;
        
        console.log("User object after signIn:", {
          dbId: (user as any).dbId,
          phone: (user as any).phone,
          role: (user as any).role
        });
      }
      
      return true;
    },
    
    async jwt({ token, user }) {
      console.log("=== JWT CALLBACK ===");
      
      if (user) {
        console.log("User exists, setting token");
        token.id = (user as any).dbId || user.id;
        token.phone = (user as any).phone || "";
        token.role = (user as any).role || "client";
      }
      
      console.log("Token:", { id: token.id, phone: token.phone, role: token.role });
      return token;
    },
    
    async session({ session, token }) {
      console.log("=== SESSION CALLBACK ===");
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as any).phone = token.phone || "";
      }
      
      console.log("Session user:", session.user);
      return session;
    },
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