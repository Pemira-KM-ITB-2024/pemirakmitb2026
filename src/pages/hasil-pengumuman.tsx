import React, { useState, useEffect } from "react";
import Image from "next/image";
import VotingCard from "../components/ui/votingCard";
import type { ElectionResult } from "../components/ui/votingCard";
import EnvelopeAnimation from "../components/ui/EnvelopeAnimation";
import { Bounce, toast } from "react-toastify";
// import Navbar from "../components/navbar";
// import Bg from "../components/background";

interface IRVResult {
  winner: number | null;
  totalVotes: number;
  peakPercentages: Record<number, number>;
  rounds: {
    round: number;
    counts: Record<number, number>;
    percentages: Record<number, number>;
    eliminated?: number;
    exhaustedVotes?: number;
  }[];
  kotakKosongVotes: number;
  exhaustedVotes: number;
}

interface ApiResult {
  k3m: IRVResult;
  mwawm: IRVResult;
}

const K3M_CANDIDATE_NAMES = [
  "Samuel P. H. Panjaitan (EL'22)",
  "Nahdah Nabillah HR. (PL'22)",
  "Hazmi Abdul Jalil (BA'22)",
];
const MWAWM_CANDIDATE_NAMES = [
  "David Christian Saputro (AR'22)",
  "Rian Albar Insani (BA'22)",
];

const K3M_CANDIDATE_PHOTOS = [
  "/calon-2026/1.png",
  "/calon-2026/2.png",
  "/calon-2026/3.png",
];

const MWAWM_CANDIDATE_PHOTOS = [
  "/calon-2026/4.png",
  "/calon-2026/5.png",
];

function HasilPengumuman() {
  const [stage, setStage] = useState<1 | 2>(1);
  const [isPermanentlyOpen, setIsPermanentlyOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [resultData, setResultData] = useState<ApiResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch results from API
  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/result");
      if (response.ok) {
        const data: ApiResult = await response.json();
        setResultData(data);
      } else {
        toast.error("Gagal mengambil hasil voting", {
          position: "top-center",
          autoClose: 3000,
          toastId: "fetch-error",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Terjadi kesalahan saat mengambil hasil", {
        position: "top-center",
        autoClose: 3000,
        toastId: "fetch-error",
        pauseOnHover: false,
        closeOnClick: true,
        transition: Bounce,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Transform API result to VotingCard format
  const transformToVotingData = (): { leftElection: ElectionResult; rightElection: ElectionResult } | null => {
    if (!resultData) return null;

    const leftElection: ElectionResult = {
      title: "K3M",
      winner: resultData.k3m.winner,
      rounds: resultData.k3m.rounds.map((r) => ({
        round: r.round,
        percentages: r.percentages,
        eliminated: r.eliminated,
        exhaustedVotes: r.exhaustedVotes,
      })),
      totalVotes: resultData.k3m.totalVotes,
      kotakKosongVotes: resultData.k3m.kotakKosongVotes,
      exhaustedVotes: resultData.k3m.exhaustedVotes,
      candidateNames: K3M_CANDIDATE_NAMES,
      candidatePhotoUrls: K3M_CANDIDATE_PHOTOS,
    };

    const rightElection: ElectionResult = {
      title: "MWA WM",
      winner: resultData.mwawm.winner,
      rounds: resultData.mwawm.rounds.map((r) => ({
        round: r.round,
        percentages: r.percentages,
        eliminated: r.eliminated,
        exhaustedVotes: r.exhaustedVotes,
      })),
      totalVotes: resultData.mwawm.totalVotes,
      kotakKosongVotes: resultData.mwawm.kotakKosongVotes,
      exhaustedVotes: resultData.mwawm.exhaustedVotes,
      candidateNames: MWAWM_CANDIDATE_NAMES,
      candidatePhotoUrls: MWAWM_CANDIDATE_PHOTOS,
    };

    return { leftElection, rightElection };
  };

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

  // Fetch results when card is shown
  useEffect(() => {
    if (showCard && !resultData) {
      void fetchResults();
    }
  }, [showCard, resultData]);

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
                className="mt-4 absolute z-0 bg-[#12499D] w-full hidden md:block"
                style={{ height: '400px', top: '0px' }}
              />

              {/* Mobile: smaller blue layer */}
              <div
                className="mt-6 absolute z-0 bg-[#12499D] w-full md:hidden"
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
                    ? 'z-50 opacity-100 pointer-events-auto '
                    : 'z-10 opacity-0 pointer-events-none'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white text-xl md:text-2xl font-bold">Memuat hasil...</div>
                  </div>
                ) : (
                  <div className="transition-all duration-700 ease-out mt-28">
                    <VotingCard {...(transformToVotingData() ?? { leftElection: { title: "", winner: null, rounds: [], totalVotes: 0, kotakKosongVotes: 0, exhaustedVotes: 0, candidateNames: [], candidatePhotoUrls: [] }, rightElection: { title: "", winner: null, rounds: [], totalVotes: 0, kotakKosongVotes: 0, exhaustedVotes: 0, candidateNames: [], candidatePhotoUrls: [] } })} />
                  </div>
                )}
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