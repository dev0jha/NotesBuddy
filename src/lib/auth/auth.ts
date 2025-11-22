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

// Build trusted origins list to include all Vercel URLs
const trustedOrigins = [
  baseURL,
  "http://localhost:3001",
  "http://localhost:3000",
];

// Add all Vercel-related URLs
if (process.env.VERCEL_URL) {
  trustedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.NEXT_PUBLIC_WEBSITE_URL) {
  trustedOrigins.push(process.env.NEXT_PUBLIC_WEBSITE_URL);
}
// Add production domain if set
if (process.env.BETTER_AUTH_URL) {
  trustedOrigins.push(process.env.BETTER_AUTH_URL);
}

// Add known Vercel domains
trustedOrigins.push("https://notes-buddy-nine.vercel.app");

// Remove duplicates
const uniqueTrustedOrigins = [...new Set(trustedOrigins)];

console.log("[Better Auth] Using baseURL:", baseURL);
console.log("[Better Auth] Trusted origins:", uniqueTrustedOrigins);
console.log("[Better Auth] Environment variables check:", {
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: uniqueTrustedOrigins,
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
