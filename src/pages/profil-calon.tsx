
import React from "react";
import { KProfileCard, MProfileCard } from "../components/profilecard";
import { header } from "~/styles/fonts";

const ProfilCalon = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/bg-pemira26.png"
          alt=""
          className="absolute inset-0 h-full w-full origin-top scale-y-[1.05] object-fill opacity-100"
        />
        <div className="absolute inset-0 bg-[#11688a] opacity-10 mix-blend-screen" />
      </div>
      <main className="relative z-10 flex min-h-screen w-full flex-col bg-[#fff6e0]/74 px-3 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10">
        <section className="mb-12 flex flex-col items-center gap-5 sm:mb-16 sm:gap-8">
          <h1 className={`${header.variable} mt-4 text-center text-6xl font-normal leading-none text-blue-800 font-['Sexsmith'] sm:text-8xl md:translate-y-[200px] md:text-[11rem] lg:translate-y-[18px] lg:text-[13rem]`}>
            K3M
          </h1>
          <div className="w-full">
            <KProfileCard />
          </div>
          <div className="w-full md:-mt-52">
            <KProfileCard />
          </div>
        </section>

        <section className="-mt-6 mb-16 flex flex-col items-center gap-5 sm:mt-0 sm:mb-20 sm:gap-8 md:-mt-24">
          <h1 className={`${header.variable} mt-4 text-center text-6xl font-normal leading-none text-blue-800 font-['Sexsmith'] sm:text-8xl md:text-[11rem] lg:text-[13rem]`}>
            MWA-WM
          </h1>
          <div className="w-full">
            <MProfileCard />
          </div>
        </section>

      </main>
    </div>
  );
};

export default ProfilCalon;