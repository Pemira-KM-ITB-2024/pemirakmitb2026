import React, { useState, useEffect } from "react";
import Image from "next/image";
import VotingCard from "../components/ui/votingCard";
import EnvelopeAnimation from "../components/ui/EnvelopeAnimation";
import { Bounce, toast } from "react-toastify";
// import Navbar from "../components/navbar";
// import Bg from "../components/background";

interface CandidateData {
  title: string;
  nama: string;
  noUrut: number;
  nimJurusan: string;
  persen: number;
  totalSuara: number;
}

interface IRVResult {
  winner: number | null;
  totalVotes: number;
  peakPercentages: Record<number, number>;
  rounds: {
    round: number;
    counts: Record<number, number>;
    percentages: Record<number, number>;
    eliminated?: number;
  }[];
}

interface ApiResult {
  k3m: IRVResult;
  mwawm: IRVResult;
}

// Placeholder candidate names - replace with actual names from your data source
const K3M_CANDIDATE_NAMES = ["Calon 1", "Calon 2", "Calon 3", "Kotak Kosong"];
const MWAWM_CANDIDATE_NAMES = ["Calon 1", "Calon 2", "Kotak Kosong"];

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
  const transformToVotingData = (): { leftCandidates: CandidateData[]; rightCandidates: CandidateData[] } | null => {
    if (!resultData) return null;

    const leftCandidates: CandidateData[] = resultData.k3m.rounds[0]?.counts
      ? Object.keys(resultData.k3m.rounds[0].counts).map((key) => {
          const noUrut = parseInt(key);
          const peakPercent = resultData!.k3m.peakPercentages[noUrut] ?? 0;
          return {
            title: "K3M",
            nama: K3M_CANDIDATE_NAMES[noUrut - 1] ?? `Calon ${noUrut}`,
            noUrut,
            nimJurusan: `Kandidat ${noUrut}`,
            persen: peakPercent,
            totalSuara: resultData!.k3m.totalVotes,
          };
        }).sort((a, b) => a.noUrut - b.noUrut)
      : [];

    const rightCandidates: CandidateData[] = resultData.mwawm.rounds[0]?.counts
      ? Object.keys(resultData.mwawm.rounds[0].counts).map((key) => {
          const noUrut = parseInt(key);
          const peakPercent = resultData!.mwawm.peakPercentages[noUrut] ?? 0;
          return {
            title: "MWA WM",
            nama: MWAWM_CANDIDATE_NAMES[noUrut - 1] ?? `Calon ${noUrut}`,
            noUrut,
            nimJurusan: `Kandidat ${noUrut}`,
            persen: peakPercent,
            totalSuara: resultData!.mwawm.totalVotes,
          };
        }).sort((a, b) => a.noUrut - b.noUrut)
      : [];

    return { leftCandidates, rightCandidates };
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
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-[#12499D] text-xl md:text-2xl font-bold">Memuat hasil...</div>
                  </div>
                ) : (
                  <VotingCard {...(transformToVotingData() ?? { leftCandidates: [], rightCandidates: [] })} />
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