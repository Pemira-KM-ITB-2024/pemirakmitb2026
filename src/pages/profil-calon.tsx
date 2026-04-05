import React from "react";
import { ProfileCard } from "../components/profilecard";
import { header } from "~/styles/fonts";

interface DecorationPosition {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

interface CandidateDecoration {
  left: { src: string; className: string };
  right: { src: string; className: string };
}

const K3M_DECORATIONS: CandidateDecoration = {
  left: {
    src: "/bunga-oren-merah.png",
    className:
      "absolute !w-[45rem] md:!w-[68rem] lg:!w-[91rem] max-w-none -top-[19rem] !-left-[23rem] md:-top-[28rem] md:!-left-[37rem] lg:-top-[36rem] lg:-left-[30rem] z-0 pointer-events-none",
  },
  right: {
    src: "/bintang-birutua-ijo.png",
    className:
      "absolute -top-12 -right-16 md:!w-[24rem] md:top-0 md:-right-32 lg:!w-[30rem] lg:-top-[2rem] lg:-right-[10rem] z-0 pointer-events-none",
  },
};

const MWAWM_DECORATIONS: CandidateDecoration = {
  left: {
    src: "/yellow-star.png",
    className:
      "absolute -top-[3rem] -left-[2rem] md:w-[18rem] md:-top-[6rem] md:-left-[4rem] lg:w-[24rem] lg:top-[15rem] lg:-left-[5rem] -z-20 pointer-events-none",
  },
  right: {
    src: "/asterisk-kuning-besar.png",
    className:
      "absolute -top-[6rem] -right-[8.5rem] md:w-[24rem] md:-top-[10rem] md:-right-[12rem] lg:w-[32rem] lg:-top-[6rem] lg:-right-[10rem] -z-20 pointer-events-none",
  },
};

interface CandidateData {
  id: number;
  election: "K3M" | "MWAWM";
}

const CANDIDATES: CandidateData[] = [
  { id: 1, election: "K3M" },
  { id: 2, election: "K3M" },
  { id: 3, election: "K3M" },
  { id: 4, election: "MWAWM" },
  { id: 5, election: "MWAWM" },
];

// Group candidates by election
const ELECTION_SECTIONS = [
  {
    title: "K3M",
    candidates: CANDIDATES.filter((c) => c.election === "K3M"),
    decorations: K3M_DECORATIONS,
  },
  {
    title: "MWA-WM",
    candidates: CANDIDATES.filter((c) => c.election === "MWAWM"),
    decorations: MWAWM_DECORATIONS,
  },
];

const ProfilCalon = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Image and Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#FFF6E0]">
        <img
          src="/bg-pemira26.png"
          alt=""
          className="absolute inset-0 h-full w-full origin-top scale-y-[1.05] object-fill opacity-100"
        />
        <div className="absolute inset-0 bg-[#11688a] opacity-10 mix-blend-screen" />
      </div>

      {/* Header decorations — only at the very top */}
      <img
        src="/blue-starburst.svg"
        alt="blue starburst decoration"
        className="absolute w-[24rem] sm:w-[27rem] md:w-[33rem] lg:w-[40rem] xl:w-[40rem] h-auto top-[-7rem] sm:top-[-7rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-9rem] left-[-9rem] md:left-[-7rem] lg:left-[-10rem] xl:left-[-2rem] z-10 pointer-events-none"
      />
      <img
        src="/yellow-asterisk.png"
        alt="yellow asterisk decoration"
        className="absolute right-[-10rem] top-4 sm:top-16 w-80 md:right-1 md:w-50 lg:w-[26rem] lg:right-8 lg:top-13 xl:right-20 -z-10 pointer-events-none h-auto"
      />

      <main className="relative z-10 flex min-h-screen w-full flex-col bg-[#fff6e0]/74 px-3 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10">
        {ELECTION_SECTIONS.map((section, sIdx) => (
          <section
            key={section.title}
            className={`mb-12 flex flex-col items-center gap-5 sm:mb-16 sm:gap-8 ${
              sIdx > 0 ? "mt-16 md:mt-24" : ""
            }`}
          >
            {/* Election title */}
            <h1
              className={`${header.variable} mt-0 sm:mt-0 text-center text-6xl font-normal leading-none text-blue-800 font-['Sexsmith'] sm:text-8xl md:translate-y-[40px] md:text-[7rem] lg:text-[12rem]`}
            >
              {section.title}
            </h1>

            {/* Each candidate card with its own decorations */}
            {section.candidates.map((candidate, cIdx) => {
              const isLastCandidate =
                cIdx === section.candidates.length - 1;
              const isLastInElection =
                sIdx === ELECTION_SECTIONS.length - 1 && isLastCandidate;

              return (
                <div
                  key={candidate.id}
                  className={`relative w-full ${
                    cIdx > 0 ? "mt-12 md:mt-16" : ""
                  } ${isLastInElection ? "mb-16 md:mb-20" : ""}`}
                >
                  {cIdx === 0 && sIdx === 0? null : (
                    <>
                      {/* Left decoration — repeats per card */}
                      <img
                        src={section.decorations.left.src}
                        alt=""
                        className={section.decorations.left.className}
                      />

                      {/* Right decoration — repeats per card */}
                      <img
                        src={section.decorations.right.src}
                        alt=""
                        className={section.decorations.right.className}
                      />
                    </>
                  )}
                  <ProfileCard id={candidate.id} />
                </div>
              );
            })}
          </section>
        ))}
      </main>
    </div>
  );
};

export default ProfilCalon;
