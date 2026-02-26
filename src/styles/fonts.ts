import localFont from "next/font/local";
import { Montserrat, Open_Sans } from "next/font/google";

const header = localFont({
  src: "/fonts/Sexsmith.ttf",
  variable: "--font-header",
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
  src: "/fonts/Unbounded.ttf",
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

export {
  anisette,
  clashDisplay,
  header,
  body,
  bodyBold,
  bodyBoldItalic,
  bodyItalic,
  openSans,
  montserrat,
};
