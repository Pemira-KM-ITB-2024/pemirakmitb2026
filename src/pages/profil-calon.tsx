
import React from "react";
import { ProfileCard } from "../components/profilecard";
import { header } from "~/styles/fonts";

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
      
      {/* HIASAN HEADER KIRI ATAS*/}
      {/* StarBurst Biru */}
      <img 
        src="/blue-starburst.svg" 
        alt="blue starburst decoration" 
        className="absolute w-[24rem] sm:w-[27rem] md:w-[33rem] lg:w-[40rem] xl:w-[40rem] h-auto top-[-7rem] sm:top-[-7rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-9rem]  left-[-9rem] md:left-[-7rem] lg:left-[-10rem] xl:left-[-2rem] z-10 pointer-events-none" 
      /> 

      {/* HIASAN HEADER KANAN ATAS*/}
      {/* yellow asterisk */}
      <img
        src="/yellow-asterisk.png"
        alt="yellow asterisk decoration"
        className="absolute right-[-10rem] top-4 sm:top-16 w-80 md:right-1 md:w-50 lg:w-[26rem] lg:right-8 lg:top-13 xl:right-20 -z-10 pointer-events-none h-auto"
      /> 
      
      <main className="relative z-10 flex min-h-screen w-full flex-col bg-[#fff6e0]/74 px-3 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10 z-10">

        <section className="mb-12 flex flex-col items-center gap-5 sm:mb-16 sm:gap-8">
          <h1 className={`${header.variable} mt-0 sm:mt-0 text-center text-6xl font-normal leading-none text-blue-800 font-['Sexsmith'] sm:text-8xl md:translate-y-[40px] md:text-[7rem] lg:text-[12rem]`}>
            K3M
          </h1>

          <div className="w-full z-20"> 
            <ProfileCard no_kandidat={1}/>
          </div>
          
          <div className="relative w-full mt-12 md:mt-16"> 

            {/* bunga oren merah di kiri atas card 2 */}
            <div className="absolute -top-[22rem] -left-[25rem] sm:-top-[26rem] sm:-left-[32rem] md:-top-[23rem] md:left-[-25rem] lg:-top-[30rem] lg:-left-[30rem] z-0 pointer-events-none">
                <img 
                  src="/bunga-oren-merah.png" 
                  alt="" 
                  className="w-[55rem] sm:w-[60rem] md:w-[60rem] lg:w-[80rem] h-auto" 
                />
            </div>
            
            {/* bintang kecil birutua ijo di kanan atas card 2 */}
            <div className="absolute -top-12 -right-16 sm:-top-10 sm:-right-20 md:top-0 md:-right-9 z-0 pointer-events-none">
              <img 
                src="/bintang-birutua-ijo.png"
                alt="" 
                className="w-52 md:w-56 lg:w-72 h-auto"
              />
            </div>

            <ProfileCard no_kandidat={2}/>

          </div>
        </section>

        <section className="mb-16 flex flex-col items-center gap-5 sm:mb-20 sm:gap-8 mt-16 md:mt-24 z-10">
          <h1 className={`${header.variable} mt-0 text-center text-6xl font-normal leading-none text-blue-800 font-['Sexsmith'] sm:text-8xl md:text-[11rem] lg:text-[13rem]`}>
            MWA-WM
          </h1>
          <div className="relative w-full -z-0">

            {/* bintang kuning kecil di kiri */}
            <div className="absolute -top-[3rem] -left-[3rem] sm:-top-[3rem] sm:-left-[3rem] md:-top-[2rem] md:left-[-6rem] lg:-top-[2rem] lg:-left-[5rem] xl:top-[25rem] xl:-left-20 2xl:top-[25rem] 2xl:left-20 -z-20 pointer-events-none">
              <img 
                src="/yellow-star.png" 
                alt="" 
                className="w-[11rem] sm:w-[11rem] md:w-[20rem] lg:w-[22rem] xl:w-60 h-auto" 
              />
            </div>

            {/* ASterisk kuning besar di kanan */}
            <div className="absolute -top-[8rem] -right-[11.5rem] sm:-top-[10rem] sm:-right-[13.5rem] md:-top-[18rem] md:-right-[25.5rem] lg:-top-[18rem] lg:-right-[27rem] xl:-top-[4rem] xl:-right-[5rem] 2xl:right-[6rem] -z-20 pointer-events-none">
              <img 
                src="/asterisk-kuning-besar.png" 
                alt="" 
                className="w-[19rem] sm:w-[21rem] md:w-[41rem] lg:w-[43rem] xl:w-[30rem] h-auto" 
              />
            </div>

            <ProfileCard no_kandidat={3}/>
          </div>
        </section> 
      </main>

    </div>
  );
};

export default ProfilCalon;