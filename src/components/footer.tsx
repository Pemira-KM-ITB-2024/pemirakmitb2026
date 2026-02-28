import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { type ReactNode } from "react";
import { body, header } from "@fonts";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="h-fit w-[100%] flex flex-col">
      <div className="relative flex flex-col items-center bg-[#12499D]">
        <div className="pointer-events-none absolute inset-x-0 -top-[20vw] h-[20vw] bg-gradient-to-b from-transparent to-[#12499D] md:-top-[8cm] md:h-[8cm]" />

        {/* Social Media Icons - 1 kolom tengah */}
        <div className="z-10 mt-14 mb-6 flex w-full flex-col items-center justify-center md:mt-[7cm]">
          <div className="mb-8 flex w-[92vw] flex-col items-center justify-center gap-3 text-center md:w-[42vw]">
            <h2 className={`${header.className} w-full text-[9.2vw] text-[#fff6e0] md:text-[4.2vw]`}>YUK BERIKAN SUARAMU!</h2>
            <button className="w-[72%] rounded-full bg-[#00b38d] px-8 py-4 text-[5.7vw] font-medium text-white transition-colors hover:bg-[#019878] md:w-[70%] md:px-12 md:py-5 md:text-[2.8vw]">
              MULAI VOTING
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center md:mt-[3cm]">
            <LinkIcon href="https://www.instagram.com/pemirakmitb2026/">
              <FaInstagram />
              <span>PEMIRA KM ITB 2026</span>
            </LinkIcon>

            <LinkIcon href="https://x.com/pemirakmitb2026">
              <FaXTwitter />
              <span>PEMIRA KM ITB 2026</span>
            </LinkIcon>

            <LinkIcon href="https://www.instagram.com/km.itb/">
              <FaInstagram />
              <span>Kabinet KM ITB</span>
            </LinkIcon>

            <LinkIcon href="https://www.twitter.com/KM_ITB/">
              <FaXTwitter />
              <span>Kabinet KM ITB</span>
            </LinkIcon>

            <LinkIcon href="https://www.instagram.com/mwawm_itb/">
              <FaInstagram />
              <span>MWA-WM ITB</span>
            </LinkIcon>
          </div>
          
          <div className="flex items-center justify-center gap-2 p-2 text-[12px] font-medium text-white md:text-[1vw]">
              <IoIosMail />
              pemira@km.itb.ac.id
            </div>
        </div>

      </div>

      <div
        className={`${body.className} relative z-10 flex w-full items-center justify-center bg-[#FFFFFF] py-4 text-sm font-bold md:text-lg md:font-extrabold`}
      >
        <p>©2026 Copyright: Divisi IT PEMIRA KM ITB 2026</p>
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
