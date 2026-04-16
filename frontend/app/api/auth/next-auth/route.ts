import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Provider untuk Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_secret",
    }),
    
    // 2. Provider untuk Email & Password (Credentials)
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@contoh.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // PERHATIAN: Di sini nantinya kita akan melakukan HTTP Request (fetch)
        // ke Backend Laravel kita (http://localhost:8000/api/v1/auth/login)
        // menggunakan credentials->email dan credentials->password.
        
        // Untuk sementara kita biarkan me-return null (gagal login)
        // sampai endpoint Laravel-nya kita buat.
        return null;
      }
    })
  ],
  pages: {
    // Kita arahkan halaman login bawaan NextAuth ke halaman custom kita nanti
    signIn: '/login', 
  },
  session: {
    strategy: "jwt", // Wajib JWT jika backend dan frontend terpisah
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Next.js App Router mewajibkan export GET dan POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };