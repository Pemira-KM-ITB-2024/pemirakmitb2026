import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const signOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  const isProduction = process.env.NODE_ENV === "production";
  const isStaging = process.env.VERCEL_ENV === "preview";
  const secure = isProduction || isStaging ? "Secure;" : "";
  const domain = isProduction
    ? "Domain=pemirakmitb.com;"
    : isStaging
    ? "Domain=vercel.app;"
    : "Domain=localhost;";

  if (token) {
    // Clear all possible session cookies with proper domain
    res.setHeader("Set-Cookie", [
      `__Secure-next-auth.session-token=; Path=/; ${domain} Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
      `__Host-next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
      `next-auth.session-token=; Path=/; ${domain} Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      `next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      `next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
      `next-auth.state=; Path=/; ${domain} Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${secure} SameSite=Lax`,
    ]);
    res.status(200).json({ message: "Signed out successfully" });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};

export default signOutHandler;