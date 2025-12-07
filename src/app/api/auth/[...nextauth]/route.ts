import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "@/models";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

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
        
        try {
          // Usar la colección directamente para evitar validaciones de Mongoose
          const usersCollection = mongoose.connection.collection("users");
          
          // Buscar usuario existente
          let dbUser = await usersCollection.findOne({ email: user.email });
          
          if (!dbUser) {
            console.log("Usuario no existe, creando nuevo...");
            const [firstName, ...rest] = user.name?.split(" ") || ["Usuario"];
            
            const result = await usersCollection.insertOne({
              firstName: firstName || "Usuario",
              lastName: rest.join(" ") || "",
              email: user.email,
              phonne: "",
              role: "client",
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            
            // Recuperar el usuario creado
            dbUser = await usersCollection.findOne({ _id: result.insertedId });
            console.log("Usuario creado exitosamente");
          }
          
          console.log("DB User phone:", dbUser?.phonne);
          
          if (!dbUser) {
            console.error("Error: Usuario no encontrado después de creación");
            return false;
          }
          
          (user as any).dbId = dbUser._id.toString();
          (user as any).phone = dbUser.phonne || "";
          (user as any).role = dbUser.role;
          
          console.log("User object after signIn:", {
            dbId: (user as any).dbId,
            phone: (user as any).phone,
            role: (user as any).role,
            image: user.image
          });
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, trigger, session }) {
      console.log("=== JWT CALLBACK ===");
      
      if (user) {
        console.log("User exists, setting token");
        token.id = (user as any).dbId || user.id;
        token.phone = (user as any).phone || "";
        token.role = (user as any).role || "client";
        token.image = user.image || "";
      }

      // Actualizar token cuando se llama update() desde el cliente
      if (trigger === "update" && session) {
        console.log("Updating token with new session data");
        token.phone = session.user?.phone || token.phone;
      }
      
      console.log("Token:", { id: token.id, phone: token.phone, role: token.role });
      return token;
    },
    
    async session({ session, token }) {
      console.log("=== SESSION CALLBACK ===");
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
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