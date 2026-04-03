import React, { useState, ReactElement } from "react";
import Image from "next/image";
import VotingCard from "../components/ui/votingCard";
import EnvelopeAnimation from "../components/ui/EnvelopeAnimation";
// import Navbar from "../components/navbar";
// import Bg from "../components/background";

const dataVoting = {
  leftCandidates: [{
      title: "K3M",
      nama: "Lorem Ipsum",
      noUrut: 1,
      nimJurusan: "12324001 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    },
    {
      title: "K3M",
      nama: "Lorem Ipsum",
      noUrut: 2,
      nimJurusan: "12324002 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    },
    {
      title: "K3M",
      nama: "Lorem Ipsum",
      noUrut: 3,
      nimJurusan: "12324003 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    },
    {
      title: "K3M",
      nama: "Kotak Kosong",
      noUrut: 4,
      nimJurusan: "12324004 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    }
  ],
  rightCandidates: [{
      title: "MWA WM",
      nama: "Lorem Ipsum",
      noUrut: 1,
      nimJurusan: "12324001 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    },
    {
      title: "MWA WM",
      nama: "Lorem Ipsum",
      noUrut: 2,
      nimJurusan: "12324002 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    },
    {
      title: "MWA WM",
      nama: "Kotak Kosong",
      noUrut: 3,
      nimJurusan: "12324002 • kedokteran",
      persen: 90,
      totalSuara: 192830,
    }
  ]
};

function HasilPengumuman() {
  const [stage, setStage] = useState<1 | 2>(1);
  const [isPermanentlyOpen, setIsPermanentlyOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // Handler saat Mouse masuk area amplop
  const handleMouseEnter = () => {
    if (!isPermanentlyOpen) {
      setStage(2);
    }
  };

  // Handler saat Mouse keluar (Restart ke stage 1 jika belum diklik)
  const handleMouseLeave = () => {
    if (!isPermanentlyOpen) {
      setStage(1);
    }
  };

  // Handler saat diklik (Buka Permanen + Animasi Card)
  const handleEnvelopeClick = () => {
    if (isPermanentlyOpen) return;

    setIsPermanentlyOpen(true);
    setStage(2);
    
    // Delay sedikit agar transisi amplop terbuka terlihat dulu
    setTimeout(() => {
      setShowCard(true);
    }, 200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-10 px-4 overflow-x-hidden">
      {/* <Navbar />
      <Bg /> */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-10 relative">
        <div className="w-full flex justify-center mb-4 px-4">
          {/* VERSI MOBILE: Muncul di layar kecil (hidden di md ke atas) */}
          <Image
            src="/lihathasilvoting-mobile.png"
            alt="Header Mobile"
            width={300}
            height={75}
            className="block md:hidden w-full max-w-[300px] h-auto"
            priority
          />
          {/* VERSI DESKTOP: Muncul di layar md (768px) ke atas */}
          <Image
            src="/lihathasilvoting.png"
            alt="Header Desktop"
            width={768}
            height={192}
            className="hidden md:block w-full max-w-4xl h-auto"
            priority
          />
        </div>

        <p className={`text-[#E94F37] text-lg md:text-xl mb-6 text-center font-bold uppercase px-4`}>
          {showCard ? "Hasil Voting Berhasil Dibuka!" : "Click Amplop di bawah ini"}
        </p>

        {/* WRAPPER - Mobile: show full width card, Desktop: centered with scaling */}
        <div className="relative flex justify-center items-center w-full min-h-[500px] md:min-h-[650px]">
          <div
            className="origin-center w-full transition-transform duration-500"
            style={{
              transform: 'scale(1)',
            }}
          >
            {/* AREA UTAMA */}
            <div className="relative w-full">
              {/* Layer Biru */}
              <div
                className="absolute z-0 bg-[#12499D] w-full hidden md:block"
                style={{ height: '400px', top: '0px' }}
              />

              {/* Mobile: smaller blue layer */}
              <div
                className="absolute z-0 bg-[#12499D] w-full md:hidden"
                style={{ height: '120px', top: '0px' }}
              />

              {/* 1. Amplop - Desktop */}
              <div className="relative z-30 hidden md:flex justify-center">
                <EnvelopeAnimation
                  stage={stage}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleEnvelopeClick}
                  className="w-full max-w-[1134px] h-[884px]"
                />
              </div>

              {/* Mobile: smaller envelope click area */}
              <div
                className="relative z-30 flex md:hidden justify-center cursor-pointer"
                onClick={handleEnvelopeClick}
              >
                <EnvelopeAnimation
                  stage={stage}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleEnvelopeClick}
                  className="w-full max-w-[500px] h-[180px]"
                />
              </div>

              {/* 2. VotingCard - Appears on top of envelope when opened */}
              <div
                className={`absolute inset-0
                  ${showCard
                    ? 'transition-all duration-700 ease-out z-50 opacity-100 pointer-events-auto mt-28'
                    : 'z-10 opacity-0 pointer-events-none'
                  }
                `}
              >
                <VotingCard {...dataVoting} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// HasilPengumuman.getLayout = (page: ReactElement) => {
//   return page; 
// };
export default HasilPengumuman;