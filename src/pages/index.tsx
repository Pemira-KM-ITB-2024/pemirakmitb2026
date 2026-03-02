"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { sexsmith, unbounded } from "@fonts";

const linimasaData = [
  { title: "Lorem ipsum", date: "2 Des 2028" },
  { title: "Lorem ipsum", date: "3 Des 2028" },
  { title: "Lorem ipsum", date: "4 Des 2028" },
  { title: "Lorem ipsum", date: "5 Des 2028" },
  { title: "Lorem ipsum", date: "6 Des 2028" },
  { title: "Lorem ipsum", date: "7 Des 2028" },
  { title: "Lorem ipsum", date: "8 Des 2028" },
]

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const lastTouchXRef = useRef<number | null>(null);
  const lastTouchYRef = useRef<number | null>(null);
  const touchLockedRef = useRef<"horizontal" | "vertical" | null>(null);
  const wheelEngagedRef = useRef(false);
  const touchEngagedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
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

  const normalizeDelta = (deltaX: number, deltaY: number, deltaMode: number) => {
    const LINE = 40;
    const PAGE = window.innerHeight;
    const m = deltaMode === 1 ? LINE : deltaMode === 2 ? PAGE : 1;
    return { ndx: deltaX * m, ndy: deltaY * m };
  };

  const scrollTimelineBy = (ndx: number, ndy: number) => {
    if (!scrollRef.current) return false;

    const container = scrollRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (maxScrollLeft <= 0) return false;

    const delta = Math.abs(ndy) > Math.abs(ndx) ? ndy : ndx;

    if (delta === 0) return false;

    const isScrollingRight = delta > 0;
    const isAtStart = container.scrollLeft <= 1;
    const isAtEnd = container.scrollLeft >= maxScrollLeft - 1;

    const shouldScrollHorizontally =
      (isScrollingRight && !isAtEnd) || (!isScrollingRight && !isAtStart);

    if (!shouldScrollHorizontally) return false;

    container.scrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, container.scrollLeft + delta),
    );

    return true;
  };

  const scrollTimelineByWheel = (deltaX: number, deltaY: number) =>
    scrollTimelineBy(deltaX, deltaY);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const consumed = scrollTimelineByWheel(e.deltaX, e.deltaY);

    if (!consumed) return;

    e.preventDefault();
  };

  useEffect(() => {
    const isSectionVisible = () => {
      if (!timelineSectionRef.current) return false;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      // section is anywhere in viewport
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const shouldEngage = () => {
      if (!timelineSectionRef.current) return false;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      // latch when the heading has scrolled past 50% of viewport
      return rect.top <= window.innerHeight * 0.5;
    };

    const handleWindowWheel = (e: WheelEvent) => {
      if (!scrollRef.current) return;

      if (!isSectionVisible()) {
        wheelEngagedRef.current = false;
        return;
      }

      if (shouldEngage()) wheelEngagedRef.current = true;

      if (!wheelEngagedRef.current) return;

      const { ndx, ndy } = normalizeDelta(e.deltaX, e.deltaY, e.deltaMode);
      const consumed = scrollTimelineBy(ndx, ndy);

      if (consumed) {
        e.preventDefault();
      } else {
        // timeline reached an edge, disengage so page continues scrolling
        wheelEngagedRef.current = false;
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, []);

  // Mobile: attach touch listeners directly on the scroll container with passive:false
  // so preventDefault() actually suppresses the browser's native scroll.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isSectionVisible = () => {
      if (!timelineSectionRef.current) return false;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const shouldEngage = () => {
      if (!timelineSectionRef.current) return false;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      lastTouchXRef.current = t.clientX;
      lastTouchYRef.current = t.clientY;
      touchLockedRef.current = null;

      if (!isSectionVisible()) {
        touchEngagedRef.current = false;
      } else if (shouldEngage()) {
        touchEngagedRef.current = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;

      if (lastTouchXRef.current === null || lastTouchYRef.current === null) {
        lastTouchXRef.current = t.clientX;
        lastTouchYRef.current = t.clientY;
        return;
      }

      const dx = lastTouchXRef.current - t.clientX;
      const dy = lastTouchYRef.current - t.clientY;

      // Determine lock direction once per gesture with a small threshold
      if (touchLockedRef.current === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        touchLockedRef.current = Math.abs(dy) >= Math.abs(dx) ? "vertical" : "horizontal";
      }

      lastTouchXRef.current = t.clientX;
      lastTouchYRef.current = t.clientY;

      const container = scrollRef.current;
      if (!container) return;

      // Horizontal gesture, let container handle natively
      if (touchLockedRef.current === "horizontal") return;

      if (!touchEngagedRef.current) return;

      const consumed = scrollTimelineBy(0, dy);

      if (consumed) {
        e.preventDefault();
      } else {
        // edge reached, disengage so page scrolls for remainder of gesture
        touchEngagedRef.current = false;
      }
    };

    const onTouchEnd = () => {
      lastTouchXRef.current = null;
      lastTouchYRef.current = null;
      touchLockedRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center pt-8 pb-32 md:pt-16 md:pb-[400px] gap-6 ${sexsmith.variable} ${unbounded.variable}`}
    >
      {/* PEMIRA HEADER */}
      <Image
        src="/pemiraheader.png"
        width={553}
        height={399}
        alt="Pemira Header"
        className="-mb-6 w-[100vw] h-auto md:mb-64 md:w-[553px] md:max-w-none"
      />
      {/* ABOUT PEMIRA */}
      <div
        className="-mb-3 text-center text-5xl md:text-[96px] md:whitespace-nowrap px-4 md:px-0"
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
      {/* About PEMIRA */}
      <div
        className="w-full max-w-[800px] text-center text-xs md:text-[20px] px-10 md:px-0"
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
        className="mt-6 flex h-[50px] w-[260px] md:h-[78px] md:w-[380px] items-center justify-center rounded-[39px] bg-[#F2B61E] cursor-pointer transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:brightness-110"
      >
        <span
          className="text-3xl md:text-[55px]"
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
        ref={timelineSectionRef}
        className="mt-9 text-center text-4xl md:mt-96 md:text-[96px] md:whitespace-nowrap px-4 md:px-0"
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
        onWheel={handleWheel}
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

            {linimasaData.map((item, index) => (
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
                    {item.title}
                  </span>
                  <span className="text-xs md:text-[18px] font-medium" style={{ color: '#12499D' }}>
                    {item.date}
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
