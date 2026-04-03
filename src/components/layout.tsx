import { type ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";
import { body } from "@fonts";
import FadeIn from "./fade-in";
import { Toaster } from "./ui/sonner";

const Layout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const isProfilCalonPage = router.pathname === "/profil-calon";

  return (
    <FadeIn>
      {/* Background color */}
      <div className="fixed inset-0 -z-20 bg-[#FFF6E0]" />
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/Group 4.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <Navbar />
      <div
        className={`${body.className} flex min-h-dvh w-[100vw] max-w-[100vw] flex-col overflow-x-hidden text-black`}
      >
        <Head>
          <title>PEMIRA KM ITB</title>
          <meta
            name="description"
            content="Website Pemilu Raya KM ITB 2024/2025"
          />
          <link rel="icon" href="/logo26.ico" />
        </Head>
        <Toaster richColors />
        <main
          className="pt-16 flex items-center min-h-dvh w-[100vw] max-w-[100vw] flex-1 flex-col overflow-hidden"
          style={
            isProfilCalonPage
              ? undefined
              : {
                  // backgroundImage: "url(/bg-pemira26.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
          }
        >
          {children}
          <Footer />
        </main>
      </div>
    </FadeIn>
  );
};

export default Layout;
