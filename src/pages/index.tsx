"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { sexsmith, unbounded } from "@fonts";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = window.innerWidth >= 768 ? 300 : 150;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center pt-16 pb-32 md:pt-32 md:pb-[400px] gap-6 bg-[#FFF6E0] ${sexsmith.variable} ${unbounded.variable}`}
      style={{
        backgroundImage: "url('/Group 4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* PEMIRA HEADER */}
      <Image
        src="/pemiraheader.png"
        width={553}
        height={399}
        alt="Pemira Header"
        className="mb-8 w-[80vw] max-w-[320px] h-auto md:mb-64 md:w-[553px] md:max-w-none"
      />
      {/* ABOUT PEMIRA */}
      <div
        className="text-center text-5xl md:text-[96px] md:whitespace-nowrap px-4 md:px-0"
        style={{
          color: '#12499D',
          textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          fontFamily: 'var(--font-sexsmith), sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        ABOUT PEMIRA
      </div>
      {/* Lorem Ipsum */}
      <div
        className="w-full max-w-[800px] text-center text-xs md:text-[20px] px-4 md:px-0"
        style={{
          color: '#0A8E8B',
          textShadow: '0 4px 4px rgba(0, 0, 0, 0.08)',
          fontFamily: 'var(--font-unbounded), sans-serif',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        Lorem ipsum dolor sit amet. Ex dolorem exercitationem et iure odio sed corporis iusto non reprehenderit magni. Cum nemo nihil et voluptas veniam rem dolorem nobis ut quisquam suscipit. Et galisum Quis ut ducimus tempore ut saepe ratione et blanditiis cupiditate et exercitationem quod sit delectus repellat. Id consectetur quod sit quia beatae ea quisquam iure.
      </div>
      {/* FORSOS */}
      <div
        className="mt-6 flex h-[50px] w-[260px] md:h-[78px] md:w-[380px] items-center justify-center rounded-[25px] bg-[#F2B61E] cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:brightness-110"
      >
        <span
          className="text-2xl md:text-[55px]"
          style={{
            color: '#FFF6E0',
            fontFamily: 'var(--font-sexsmith), sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          FORUM SOSIALISASI
        </span>
      </div>
      {/* LINI MASA PEMILIHAN */}
      <div
        className="-mt-2 text-center text-[32px] md:mt-96 md:text-[96px] md:whitespace-nowrap px-4 md:px-0"
        style={{
          color: '#12499D',
          textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          fontFamily: 'var(--font-sexsmith), sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        LINI MASA PEMILIHAN
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`-mt-2 w-full overflow-x-auto pb-8 pt-4 select-none md:mt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className="relative flex min-w-full w-max items-start">
          <div className="hidden md:block flex-1" />

          <div className="relative flex shrink-0 items-start px-4 md:px-[5vw] gap-12 md:gap-32">

            <div className="absolute left-[76px] right-[76px] md:left-[calc(5vw_+_90px)] md:right-[calc(5vw_+_90px)] top-[22px] md:top-[33px] h-[16px] md:h-[24px] bg-[#EF476F] z-0" />

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center gap-4">
                <div className="h-[60px] w-[60px] md:h-[90px] md:w-[90px] shrink-0 rounded-full bg-[#EF476F]" />

                <div
                  className="flex flex-col items-center gap-2"
                  style={{
                    fontFamily: 'var(--font-unbounded), sans-serif',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                  }}
                >
                  <span className="text-sm md:text-[24px] font-medium" style={{ color: '#0A8E8B' }}>
                    Lorem ipsum
                  </span>
                  <span className="text-xs md:text-[18px] font-medium" style={{ color: '#12499D' }}>
                    2 Des 2028
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block flex-1" />
        </div>
      </div>
    </div>
  );
}
