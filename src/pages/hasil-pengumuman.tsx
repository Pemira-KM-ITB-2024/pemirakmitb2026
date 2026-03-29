import React, { useState, ReactElement } from "react";
import VotingCard from "../components/ui/votingCard";
import EnvelopeAnimation from "../components/ui/EnvelopeAnimation";
import { unbounded } from "../styles/fonts";
// import Navbar from "../components/navbar";
// import Bg from "../components/background";

const dataVoting = {
  leftCandidate: {
    title: "K3M",
    nama: "Lorem Ipsum",
    nimJurusan: "12324001 • kedokteran",
    persen: 90,
    totalSuara: 192830,
  },
  rightCandidate: {
    title: "MWA WM",
    nama: "Lorem Ipsum",
    nimJurusan: "12324001 • kedokteran",
    persen: 90,
    totalSuara: 192830,
  }
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
          <img
            src="/lihathasilvoting-mobile.png"
            alt="Header Mobile"
            className="block md:hidden w-full max-w-[300px] h-auto"
            draggable={false}
          />
          {/* VERSI DESKTOP: Muncul di layar md (768px) ke atas */}
          <img
            src="/lihathasilvoting.png"
            alt="Header Desktop"
            className="hidden md:block w-full max-w-4xl h-auto"
            draggable={false}
          />
        </div>

        <p className={`${unbounded.className} text-[#E94F37] text-lg md:text-xl mb-6 text-center font-bold uppercase px-4`}>
          {showCard ? "Hasil Voting Berhasil Dibuka!" : "Click Amplop di bawah ini"}
        </p>

        {/* WRAPPER SCALE: Ini kuncinya untuk Mobile */}
        <div className="relative flex justify-center items-center w-full min-h-[500px] md:min-h-[650px]">
          <div
            className="origin-center scale-[0.35] sm:scale-[0.5] md:scale-[0.8] lg:scale-100 transition-transform duration-500"
          >
            {/* AREA UTAMA (UKURAN TETAP FIX) */}
            <div className="relative" style={{ width: '1134px', height: '600px' }}>
              {/* Layer Biru */}
              <div
                className="absolute z-0 bg-[#12499D]"
                style={{ width: '1134px', height: '400px', top: '0px' }}
              />

              {/* 1. Amplop */}
              <div className="relative z-30 flex justify-center">
                <EnvelopeAnimation
                  stage={stage}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleEnvelopeClick}
                  className="w-[1134px] h-[442px]"
                />
              </div>

              {/* 2. VotingCard */}
              <div
                className={`absolute inset-0 flex justify-center items-center 
                  ${showCard ? 'transition-all duration-700 ease-out z-50 scale-100 opacity-100 translate-y-[-50px] pointer-events-auto'
                            : 'z-10 scale-95 opacity-80 translate-y-[-70px] pointer-events-none'
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