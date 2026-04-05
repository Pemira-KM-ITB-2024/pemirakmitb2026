import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { type ReactNode } from "react";
import { body, header } from "@fonts";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  const contactLinks = [
    {
      href: "https://www.instagram.com/pemirakmitb2026",
      label: "PEMIRA KM ITB 2026",
      icon: FaInstagram,
    },
    {
      href: "https://x.com/pemirakmitb2026",
      label: "PEMIRA KM ITB 2026",
      icon: FaXTwitter,
    },
    {
      href: "https://www.instagram.com/km.itb",
      label: "Kabinet KM ITB",
      icon: FaInstagram,
    },
    {
      href: "https://x.com/KM_ITB",
      label: "Kabinet KM ITB",
      icon: FaXTwitter,
    },
    {
      href: "https://www.instagram.com/mwawm_itb",
      label: "MWA-WM ITB",
      icon: FaInstagram,
    },
    {
      href: "mailto:pemira@km.itb.ac.id",
      label: "pemira@km.itb.ac.id",
      icon: IoIosMail,
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden text-white -mt-100 z-100">
      {/* Background Image */}
      {/* <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/background-footer3.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      /> */}
      
      {/* Background Gradient Blur ke Biru */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-[#12499D]/90 to-[#12499D]" />
      
      {/* Graphic Kiri */}
      <div className="absolute left-0 bottom-0 w-64 h-96 pointer-events-none z-10">
        <img 
          src="/bintangbesar.png" 
          alt="" 
          className="absolute bottom-20 -left-20 w-36 h-36 md:bottom-60 md:left-40 md:w-56 md:h-56" 
        />
        <img 
          src="/bintangputih.png" 
          alt="" 
          className="absolute bottom-16 -left-20 w-40 h-40 md:bottom-60 md:left-60 md:w-48 md:h-48" 
        />
        <img 
          src="/bintangtitikkiri.png" 
          alt="bintang titik" 
          className="absolute bottom-30 left-0 w-30 h-30 md:bottom-[380px] md:left-60 md:w-60 md:h-60" 
        />
      </div>

      {/* Graphic Kanan */}
      <div className="absolute right-0 bottom-0 w-64 h-96 pointer-events-none z-10">
        <img 
          src="/bintangmerah.png" 
          alt="bintang merah" 
          className="absolute bottom-40 -right-5 w-20 h-20 md:bottom-80 md:right-[180px] md:w-[140px] md:h-[140px]" 
        />
        <img 
          src="/segitiga.png" 
          alt="segitiga" 
          className="absolute bottom-10 -right-12 w-20 h-20 md:bottom-40 md:right-40 md:w-20 md:h-20" 
        />
        <img 
          src="/bintangkecil.png" 
          alt="bintang kecil" 
          className="absolute bottom-48 right-2 w-8 h-8 md:bottom-56 md:right-64 md:w-14 md:h-14" 
        />
        <img 
          src="/bintangkecilputih.png" 
          alt="bintang kecil putih" 
          className="absolute bottom-[10px] right-0 w-30 h-30 md:bottom-20 md:right-80 md:w-60 md:h-60" 
        />
      </div>

      <div
        className={`${body.className} relative z-10 flex min-h-[70vh] flex-col items-center justify-between px-6 pt-32 pb-16 text-center md:min-h-[120vh] md:py-20 md:pt-80`}
      >
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2
            className={`${header.className} mb-8 text-4xl tracking-wide md:text-6xl`}
          >
            YUK, BERIKAN SUARAMU!
          </h2>

          <Link
            href="/vote"
            className="mb-12 inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#0FB59A] px-8 py-2.5 text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] hover:bg-[#0DAA91] md:min-w-[380px] md:px-16 md:py-6 md:text-4xl"
          >
            MULAI VOTING
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-10 flex flex-col items-center gap-2 text-xs md:gap-1 md:text-xs">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              const isEmail = item.href.startsWith("mailto:");

              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group flex items-center gap-3 text-[#FFF7E8]"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 md:h-6 md:w-6" />
                  <span className={`inline-block leading-tight ${!isEmail ? 'border-b border-[#FFF7E8]' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="text-[10px] font-semibold text-[#FFF7E8] md:text-xs md:font-bold">
            ©2026Copyright: Divisi IT PEMIRA KM ITB 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

const LinkIcon = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center justify-center gap-2 p-2 text-[12px] font-medium text-white transition-colors hover:text-teal-2 md:text-[1vw]">
        <span className="text-[4vw] md:text-[1vw]">{Array.isArray(children) ? children[0] : children}</span>
        <span>{Array.isArray(children) ? children.slice(1) : null}</span>
      </div>
    </Link>
  );
};

export default Footer;
