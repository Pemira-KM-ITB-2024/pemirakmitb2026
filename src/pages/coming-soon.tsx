"use client";

import { useEffect, useState } from "react";
import { sexsmith, unbounded } from "@fonts";

const TARGET_DATE = new Date("2026-03-06T00:00:00+07:00");

const pad = (n: number) => Math.max(0, n).toString().padStart(2, "0");

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((TARGET_DATE.getTime() - Date.now()) / 1000),
  );

  useEffect(() => {
    const id = setInterval(
      () => setTimeLeft((prev) => Math.max(0, prev - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  const days = pad(Math.floor(timeLeft / (60 * 60 * 24)));
  const hours = pad(Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)));
  const minutes = pad(Math.floor((timeLeft % (60 * 60)) / 60));
  const seconds = pad(timeLeft % 60);

  const textShadow = "0 4px 4px rgba(0, 0, 0, 0.25)";

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 pb-32 pt-24 md:gap-12 ${sexsmith.variable} ${unbounded.variable}`}
    >
      {/* Heading */}
      <div
        className="text-center text-[clamp(3rem,14vw,10rem)] leading-none whitespace-nowrap"
        style={{
          color: "#12499D",
          textShadow,
          fontFamily: "var(--font-sexsmith), sans-serif",
          fontWeight: 400,
        }}
      >
        COMING SOON
      </div>

      {/* Subtitle */}
      <div
        className="max-w-[600px] text-center text-xs md:text-lg leading-relaxed"
        style={{
          color: "#0A8E8B",
          textShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
          fontFamily: "var(--font-unbounded), sans-serif",
          fontWeight: 500,
        }}
      >
        Halaman ini sedang dalam persiapan. Nantikan peluncurannya!
      </div>

      {/* Divider */}
      <div className="h-[6px] w-[120px] rounded-full bg-[#EF476F] md:w-[200px]" />

      {/* Countdown */}
      <div className="flex items-start gap-6 md:gap-14">
        {[
          { value: days, label: "HARI" },
          { value: hours, label: "JAM" },
          { value: minutes, label: "MENIT" },
          { value: seconds, label: "DETIK" },
        ].map(({ value, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="text-[clamp(2.5rem,10vw,6rem)] leading-none tabular-nums"
              style={{
                color: "#12499D",
                textShadow,
                fontFamily: "var(--font-sexsmith), sans-serif",
                fontWeight: 400,
              }}
              suppressHydrationWarning
            >
              {value}
            </div>
            <div
              className="text-[10px] md:text-sm tracking-widest"
              style={{
                color: "#EF476F",
                fontFamily: "var(--font-unbounded), sans-serif",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA pill */}
      <div
        className="flex h-[50px] w-[220px] cursor-pointer items-center justify-center rounded-[39px] bg-[#F2B61E] transition-all duration-300 hover:scale-[1.05] hover:brightness-110 hover:shadow-lg md:h-[64px] md:w-[300px]"
        onClick={() => window.open("https://www.instagram.com/pemirakmitb2026", "_self")}
      >
        <span
          className="text-2xl md:text-[40px]"
          style={{
            color: "#FFF6E0",
            textShadow,
            fontFamily: "var(--font-sexsmith), sans-serif",
            fontWeight: 400,
          }}
        >
          PEMIRA KM ITB
        </span>
      </div>
    </div>
  );
}
