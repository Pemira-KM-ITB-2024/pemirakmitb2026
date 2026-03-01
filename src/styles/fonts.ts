import localFont from "next/font/local";
import { Montserrat, Open_Sans, Unbounded } from "next/font/google";

const header = localFont({
  src: "/fonts/Anisette.otf",
  variable: "--font-header",
});

const sexsmith = localFont({
  src: "../../public/fonts/Sexsmith.otf",
  variable: "--font-sexsmith",
});

const anisette = {
  variable: "font-anisette",
  // other properties...
};

const clashDisplay = {
  variable: "font-clash-display",
  // other properties...
};

const body = localFont({
  src: "/fonts/ClashDisplay-Variable.ttf",
});

const bodyBold = localFont({
  src: "/fonts/TangoSans_Bold.ttf",
});
const bodyBoldItalic = localFont({
  src: "/fonts/TangoSans_BoldItalic.ttf",
});
const bodyItalic = localFont({
  src: "/fonts/TangoSans_Italic.ttf",
});

const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export {
  anisette,
  clashDisplay,
  header,
  sexsmith,
  unbounded,
  body,
  bodyBold,
  bodyBoldItalic,
  bodyItalic,
  openSans,
  montserrat,
};
