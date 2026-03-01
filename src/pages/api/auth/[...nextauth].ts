import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaClient } from "@prisma/client";
import { programStudi } from "~/lib/constant/jurusan";

const prisma = new PrismaClient();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pemirakmitb.com"
    : "http://localhost:3000";

const microsoftClientId = process.env.MICROSOFT_CLIENT_ID;
const microsoftClientSecret = process.env.MICROSOFT_CLIENT_SECRET;
const microsoftTenantId = process.env.MICROSOFT_TENANT_ID;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!microsoftClientId || !microsoftClientSecret || !microsoftTenantId) {
  throw new Error(
    "Missing required Microsoft OAuth environment variables: MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_TENANT_ID",
  );
}

if (!nextAuthSecret) {
  throw new Error("Missing required environment variable: NEXTAUTH_SECRET");
}

export default NextAuth({
  debug: true,
  providers: [
    AzureADProvider({
      clientId: microsoftClientId,
      clientSecret: microsoftClientSecret,
      tenantId: microsoftTenantId,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "select_account",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: nextAuthSecret,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? "pemirakmitb.com"
            : "localhost",

        sameSite: "lax",
        path: "/",
      },
    },
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        domain:
          process.env.NODE_ENV === "production"
            ? "pemirakmitb.com"
            : "localhost",
        maxAge: 60 * 20,
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email ?? "";
        const microsoftId = user.id;
        const name = user.name ?? user.id;

        const accountRecord = await prisma.account.upsert({
          where: { microsoftId },
          update: {
            email,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
          },
          create: {
            email,
            microsoftId,
            name,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
          },
          include: { User: true }, // include the associated User records
        });

        // Extract jurusan code from email and match with the list
        const jurusanCode = email.substring(0, 3);
        const numericJurusanCode = parseInt(jurusanCode, 10);

        // Find matching department
        const matchedProgram = programStudi.find((j) => j.kode === jurusanCode);

        const jurusan = matchedProgram?.nama ?? "Pascasarjana";
        const fakultas = matchedProgram?.fakultasKode ?? "SPS";
        let himpunan = matchedProgram?.himpunan ?? null;

        // Check if the 4-5th extracted number from the email is 24
        if (email.substring(3, 5) === "24") {
          himpunan = null;
        }

        // Check if himpunan is an empty string and set it to null
        if (himpunan === "") {
          himpunan = null;
        }

        // Check if a User record already exists (array is empty if not)
        if (!accountRecord.User) {
          await prisma.user.create({
            data: {
              name,
              email,
              jurusan,
              fakultas,
              himpunan: himpunan ?? "",
              account: {
                connect: { id: accountRecord.id },
              },
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl: defaultUrl }) {
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const finalBaseUrl = `${protocol}://${baseUrl.replace(
        /^https?:\/\//,
        "",
      )}`;
      return url.startsWith("/") ? `${finalBaseUrl}${url}` : url;
    },
  },
});
