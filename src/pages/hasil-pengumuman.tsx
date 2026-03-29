import React, { useState, ReactElement } from "react";
import VotingCard from "../components/ui/votingCard";
import EnvelopeAnimation from "../components/ui/EnvelopeAnimation";
import { unbounded } from "../styles/fonts";

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

  React.useEffect(() => {
      document.body.style.background = "#FFF6E0";
      
      return () => {
        document.body.style.background = "";
      };
    }, []);

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
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-2 bg-[#FFF6E0]">
        
        <div className="fixed inset-0 -z-10">
          <img src="/Group 4.png" alt="Background" className="object-cover w-full h-full" />
        </div>

        {/* Konten Utama */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10 relative">
          <div className="w-full flex justify-center mt-8 mb-2">
            <img src="/lihathasilvoting.png" alt="Header" className="w-full max-w-4xl h-auto" />
          </div>

          <p className={`${unbounded.className} text-[#E94F37] text-xl mb-6 text-center font-bold uppercase`}>
            {showCard ? "Hasil Voting Berhasil Dibuka!" : "Click Amplop di bawah ini"}
          </p>

          {/* AREA UTAMA */}
          <div className="relative w-full flex justify-center" style={{ marginTop: '150px' }}>
            
            {/* Layer Biru */}
            <div 
              className="absolute z-0 bg-[#12499D]" 
              style={{ width: '1134px', height: '400px', top: '0px' }} 
            />

            {/* 1. Amplop */}
            <div className="relative z-30">
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
              className={`absolute flex justify-center items-center 
                ${showCard ? 'transition-all duration-700 ease-out z-50 scale-100 opacity-100 translate-y-[-20px] pointer-events-auto' 
                          : 'z-10 scale-95 opacity-80 translate-y-[15px] pointer-events-none'
                }
              `}
            >
              <VotingCard {...dataVoting} />
            </div>

          </div>
        </div>
      </div>
    );
  }

HasilPengumuman.getLayout = (page: ReactElement) => page;
export default HasilPengumuman;