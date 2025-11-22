import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db/prisma";
import { deviceFingerprintingPlugin } from "./plugins/device-fingerprinting";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error(
    "Missing Google OAuth credentials. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables.",
  );
}

if (!process.env.BETTER_AUTH_SECRET) {
  console.error(
    "Missing BETTER_AUTH_SECRET. Please set it in your environment variables.",
  );
}

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_WEBSITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3001");

console.log("[Better Auth] Using baseURL:", baseURL);
console.log("[Better Auth] Environment variables check:", {
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [baseURL],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    cookiePrefix: "notes-buddy",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30,
    },
  },
  plugins: [deviceFingerprintingPlugin()],
});
