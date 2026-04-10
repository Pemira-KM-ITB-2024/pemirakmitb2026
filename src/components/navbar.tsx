"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { body } from "@fonts";
import { on } from "events";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/profil-calon", label: "Profil Kandidat" },
    // ...session ? [{ href: "/vote", label: "Hasil" }] : [],
    { href: "/hasil-pengumuman", label: "Hasil" },
  ];

  const menuLinks = [
    //TODO: LINK HEARING
    { href: "https://bit.ly/KampanyePemira26", label: "Publikasi Kampanye", onClick: null},
    { href: "https://bit.ly/LaporanPelangaran", label: "Pelaporan", onClick: null},
    { href: "https://drive.google.com/file/d/1o6XjFdfk8ywviOsoYRJ_2ie3nDycGgyZ/view?usp=share_link", label: "Dokumen TAP", onClick: null},
    ...(session ? [{ href: "", label: "Sign out", onClick: () => signOut({ callbackUrl: "/" })}] : 
    [{ href: "", label: "Sign in", onClick: () => signIn("azure-ad") }])
  ];

  const activeIndex = Math.max(
    0,
    mainLinks.findIndex((link) => pathname === link.href),
  );

  useEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabRefs.current[activeIndex];
      if (activeTab) {
        setIndicatorStyle({
          width: activeTab.offsetWidth,
          left: activeTab.offsetLeft,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <div className={`${body.className} fixed left-1/2 -translate-x-1/2 top-4 md:left-auto md:translate-x-0 md:right-6 md:top-6 z-50 flex items-center gap-2 md:gap-4`}>
      {/* Capsule */}
      <div className="relative flex items-center rounded-full bg-[#0A8E8B] p-1 md:p-1.5">
        <span
          className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-[#3FB8AF] transition-all duration-300 ease-out md:top-1.5 md:bottom-1.5"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
          }}
        />

        {mainLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={`relative z-10 flex items-center justify-center rounded-full px-3 py-1.5 text-center text-[10px] whitespace-nowrap md:px-6 md:py-2 md:text-sm font-semibold transition-colors duration-300 ${
                isActive ? "text-white" : "text-white hover:text-[#E8FFFA]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0A8E8B]"
      >
        <div className="flex flex-col gap-1">
          <span
            className={`h-[2px] w-6 bg-white transition-all ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-all ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-all ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-14 w-52 md:w-72 origin-top-right rounded-[32px] md:rounded-[40px] bg-[#0A8E8B] p-6 md:p-10 shadow-xl transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 md:gap-6 text-base md:text-lg font-medium text-white">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={async () => {
                  setIsOpen(false);
                  if (link.onClick) {
                    await link.onClick()
                  };
                }}
                className="transition-colors duration-300 hover:text-[#BEEF62]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;