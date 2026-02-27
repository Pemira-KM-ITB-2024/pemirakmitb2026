import Image from "next/image";
import Vector1894 from "public/dekor-f26/vector-18-94.svg";
import Logo from "public/logopemira.png";
import Pemira from "public/gambarpemira.png";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { type ReactNode } from "react";
import { body } from "@fonts";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="h-fit w-[100%] flex flex-col">
      <div className="relative flex flex-col items-center">
        <div className="absolute w-[4330px] h-[1145px] bg-blue-800 blur-[100px]" />
        <div className="absolute z-10 -top-[30vw] flex w-full flex-row justify-between p-4 md:-top-[18vw]">
          <div className="absolute left-4 top-[-90px] md:left-6 md:top-[-120px]">
            <Image 
              src={Vector1894}
              width={247}
              height={269}
              alt="Vector 01 kiri"
              className="h-[234px] w-[234px] object-contain"
            />
          </div>

          <div className="absolute right-4 top-[-90px] md:right-6 md:top-[-120px]">
            <Image 
              src={Vector1894}
              width={247}
              height={269}
              alt="Vector 01 kanan"
              className="h-[234px] w-[234px] object-contain"
            />
          </div>
        </div>

        {/* Social Media Icons - 1 kolom tengah */}
        <div className="z-10 mt-12 mb-6 flex w-full flex-col items-center justify-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
            <h2 className="text-[10vw] text-white md:text-[4vw]">YUK BERIKAN SUARAMU!</h2>
            <button className="rounded-[47px] bg-[#00b38d] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#019878] md:px-12 md:py-4 md:text-xl">
              MULAI VOTING
            </button>
          </div>

          <div className="mb-4 flex flex-col items-center justify-center">
            <div className="relative h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]">
              <Image src={Logo} fill alt="Logo" />
            </div>
            <div className="relative -mt-[12vw] -mb-[6vw] h-[48vw] w-[80vw] md:-mt-[2vw] md:-mb-[2vw] md:h-[12vw] md:w-[20vw]">
              <Image src={Pemira} fill alt="Logo bawah" />
            </div>
            <div className="flex items-center justify-center gap-2 p-2 text-[12px] font-bold text-white md:text-[1vw]">
              <IoIosMail />
              pemira@km.itb.ac.id
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
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
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
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
      <div className="flex items-center justify-center gap-2 p-2 text-[12px] font-bold text-white transition-colors hover:text-teal-2 md:text-[1vw]">
        <span className="text-[4vw] md:text-[1vw]">{Array.isArray(children) ? children[0] : children}</span>
        <span>{Array.isArray(children) ? children.slice(1) : null}</span>
      </div>
    </Link>
  );
};

export default Footer;
