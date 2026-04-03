import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { withAuth } from "../utils/withAuth";
import Image from "next/image";
import VoteCard from "~/components/voteCard";
import { sexsmith, unbounded } from "~/styles/fonts";
import Swal from "sweetalert2";

const K3M_CANDIDATES = [
  { id: 1, name: "Calon 1", faculty: "XX'YY", imgUrl: "/k3m1.jpg", bgColor: "#EF476F" },
  { id: 2, name: "Calon 2", faculty: "XX'YY", imgUrl: "/k3m2.jpg", bgColor: "#F2B61E" },
  { id: 3, name: "Calon 3", faculty: "XX'YY", imgUrl: "/k3m3.jpg", bgColor: "#0A8E8B" },
  { id: 4, name: "Calon 4", faculty: "XX'YY", imgUrl: "/k3m4.jpg", bgColor: "#12499D" },
];

const MWAWM_CANDIDATES = [
  { id: 1, name: "Calon 1", faculty: "XX'YY", imgUrl: "/mwam1.jpg", bgColor: "#EF476F" },
  { id: 2, name: "Calon 2", faculty: "XX'YY", imgUrl: "/mwam2.jpg", bgColor: "#F2B61E" },
  { id: 3, name: "Calon 3", faculty: "XX'YY", imgUrl: "/mwam3.jpg", bgColor: "#0A8E8B" },
];

const VOTE_DEADLINE = "2027-03-09T23:59:59.999+07:00";

const Vote = ({
  secureApiCall,
}: {
  secureApiCall: (url: string, options: RequestInit) => Promise<Response>;
}) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [hasVoted, setHasVoted] = useState(false);
  const [hasVotingEnded, setHasVotingEnded] = useState(false);
  const [userJurusan, setUserJurusan] = useState<string | null>(null);
  const [nimStartsWith, setNimStartsWith] = useState<string | null>(null);
  const [isRead, setIsRead] = useState(false);

  // Rankings: ordered array of candidate IDs representing voter preference
  const [rankingsK3M, setRankingsK3M] = useState<number[]>([]);
  const [rankingsMWAWM, setRankingsMWAWM] = useState<number[]>([]);

  useEffect(() => {
    const checkVotingPeriod = () => {
      const now = new Date();
      const deadline = new Date(VOTE_DEADLINE);

      if (now > deadline) {
        setHasVotingEnded(true);
        toast.error("Masa pemilihan telah berakhir", {
          position: "top-center",
          autoClose: 5000,
          toastId: "voting-ended",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        });
        void router.push("/");
      }
    };
    //TODO: (Temporary)
    // checkVotingPeriod();
    // const interval = setInterval(checkVotingPeriod, 60000);
    // return () => clearInterval(interval);
  }, [router]);

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const checkUserExists = async () => {
      if (data?.user?.email) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/getUser?email=${data.user.email}`);
          if (response.ok) {
            const user = await response.json();
            setHasVoted(user.hasVoted as boolean);
            setUserJurusan(user.jurusan as string);
            const nim = extractNumberFromEmail(data.user.email);
            setNimStartsWith(nim ? nim.charAt(0) : null);
          } else {
            toast.error("User not found. Please sign out and sign in again.", {
              position: "top-center",
              autoClose: 3000,
              toastId: "user-not-found",
              pauseOnHover: false,
              closeOnClick: true,
              transition: Bounce,
              theme: "colored",
            });
            void router.push("/");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    void checkUserExists();
  }, [data?.user?.email, router]);

  const handleRankClick = useCallback(
    (
      candidateId: number,
      rankings: number[],
      setRankings: React.Dispatch<React.SetStateAction<number[]>>,
    ) => {
      const existingIndex = rankings.indexOf(candidateId);
      if (existingIndex !== -1) {
        // Remove this candidate and all after it (re-rank from this point)
        setRankings(rankings.slice(0, existingIndex));
      } else {
        // Add candidate as next preference
        setRankings([...rankings, candidateId]);
      }
    },
    [],
  );

  //TODO: Temporary
  // const canVoteK3M = nimStartsWith === "1" && userJurusan !== "Pascasarjana";
  const canVoteK3M = true;
  const isK3MComplete = rankingsK3M.length === K3M_CANDIDATES.length;
  const isMWAWMComplete = rankingsMWAWM.length === MWAWM_CANDIDATES.length;
  const isVoteComplete =
    (canVoteK3M ? isK3MComplete : true) && isMWAWMComplete;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.user?.email) return;

    if (!isRead) {
      toast.error(
        "Tolong konfirmasi bahwa anda telah membaca pakta kejujuran terlebih dahulu",
        {
          position: "top-center",
          autoClose: 3000,
          toastId: "read-error",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        },
      );
      return;
    }

    if (!isVoteComplete) {
      toast.error("Harap urutkan semua calon sebelum mengirimkan suara", {
        position: "top-center",
        autoClose: 3000,
        toastId: "rank-error",
        pauseOnHover: false,
        closeOnClick: true,
        transition: Bounce,
        theme: "colored",
      });
      return;
    }

    const email = data.user.email;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    Swal.fire({
      title: "Apakah Anda yakin mengirimkan suara Anda?",
      showCancelButton: true,
      confirmButtonColor: "#EF476F",
      cancelButtonColor: "#FFFFFF20",
      confirmButtonText: "Kirim!",
      cancelButtonText: "Batalkan",
      background: "#12499Dee",
      color: "white",
      reverseButtons: true,
      customClass: {
        popup: "border border-[#F2B61E]",
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsLoading(true);

            const response = await secureApiCall("/api/vote", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                rankingsK3M: canVoteK3M ? rankingsK3M : undefined,
                rankingsMWAWM,
              }),
            });

            if (response.ok) {
              toast.success("Vote Anda telah terekam!", {
                position: "top-center",
                autoClose: 3000,
                toastId: "vote-success",
                pauseOnHover: false,
                closeOnClick: true,
                transition: Bounce,
                theme: "colored",
              });
              void router.push("/");
            } else {
              toast.error("Vote failed!", {
                position: "top-center",
                autoClose: 3000,
                toastId: "vote-error",
                pauseOnHover: false,
                closeOnClick: true,
                transition: Bounce,
                theme: "colored",
              });
            }
          } catch (error) {
            toast.error("Internal server error", {
              position: "top-center",
              autoClose: 3000,
              toastId: "vote-error",
              pauseOnHover: false,
              closeOnClick: true,
              transition: Bounce,
              theme: "colored",
            });
          } finally {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center text-4xl font-bold text-blue-800">
        Loading...
      </div>
    );
  }

  if (hasVotingEnded) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center text-4xl font-bold text-blue-800">
        Masa pemilihan telah berakhir
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden ${sexsmith.variable} ${unbounded.variable}`}>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#FFF6E0]">
        <img
          src="/bg-pemira26.png"
          alt=""
          className="absolute inset-0 h-full w-full origin-top scale-y-[1.05] object-fill opacity-100"
        />
        <div className="absolute inset-0 bg-[#11688a] opacity-10 mix-blend-screen" />
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-[5rem] -top-[3rem] z-0 h-[14rem] w-[14rem] sm:-left-[7rem] sm:-top-[6rem] sm:h-[24rem] sm:w-[24rem] md:-left-[7rem] md:h-[33rem] md:w-[33rem] lg:-left-[10rem] lg:-top-[9rem] lg:h-[40rem] lg:w-[40rem]">
        <Image
          src="/blue-starburst.svg"
          alt=""
          fill
          className="pointer-events-none object-contain"
        />
      </div>
      <div className="absolute -right-[4rem] top-4 -z-10 h-[12rem] w-[12rem] sm:-right-[8rem] sm:top-4 sm:h-[15rem] sm:w-[15rem] md:right-1 md:h-[20rem] md:w-[20rem] lg:right-8 lg:top-13 lg:h-[26rem] lg:w-[26rem]">
        <Image
          src="/yellow-asterisk.png"
          alt=""
          fill
          className="pointer-events-none object-contain"
        />
      </div>

      {!hasVoted ? (
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center px-3 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-10">
          {/* Page title */}
          <h1
            className="mb-2 mt-2 text-center text-4xl leading-none text-blue-800 sm:text-5xl md:text-7xl lg:text-[10rem]"
            style={{
              fontFamily: "var(--font-sexsmith), sans-serif",
              fontWeight: 400,
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            SURAT SUARA
          </h1>

          {/* Instruction */}
          <div className="relative w-full max-w-[700px] mt-4 md:mt-8 bg-[#FFF6E0]/80 border border-[#F2B61E] rounded-lg px-3 py-3 sm:px-4 sm:py-4">
            <p
              className="mx-auto max-w-[700px] text-center text-[11px] leading-tight text-[#0A8E8B] sm:text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: "var(--font-unbounded), sans-serif",
                fontWeight: 500,
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
              }}
            >
              Klik calon sesuai urutan preferensi Anda. Klik pertama = pilihan
              utama (1), klik kedua = pilihan kedua (2), dst. Klik calon yang
              sudah dipilih untuk membatalkan urutan dari titik tersebut.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col items-center gap-8 sm:gap-16 md:gap-24 mt-6 sm:mt-12"
          >
            {/* K3M Section */}
            {canVoteK3M && (
              <section className="flex w-full flex-col items-center gap-4 sm:gap-8">
                <h2
                  className="text-center text-3xl leading-none text-blue-800 sm:text-5xl md:text-7xl lg:text-[10rem]"
                  style={{
                    fontFamily: "var(--font-sexsmith), sans-serif",
                    fontWeight: 400,
                    textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  K3M
                </h2>
                <p
                  className="text-xs sm:text-sm font-medium text-[#0A8E8B] md:text-base"
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                >
                  Urutkan {K3M_CANDIDATES.length} calon ({rankingsK3M.length}/
                  {K3M_CANDIDATES.length} dipilih)
                </p>
                <div className="grid w-full max-w-[600px] grid-cols-2 gap-3 px-2 sm:gap-5 sm:max-w-[900px] md:max-w-[1200px] md:gap-8 lg:grid-cols-4 lg:gap-6">
                  {K3M_CANDIDATES.map((candidate) => {
                    const rankIndex = rankingsK3M.indexOf(candidate.id);
                    const isSelected = rankIndex !== -1;
                    return (
                      <VoteCard
                        key={candidate.id}
                        bgColor={candidate.bgColor}
                        textColor="#FFF6E0"
                        imgUrl={candidate.imgUrl}
                        onClick={() =>
                          handleRankClick(
                            candidate.id,
                            rankingsK3M,
                            setRankingsK3M,
                          )
                        }
                        clicked={isSelected}
                        rank={isSelected ? rankIndex + 1 : null}
                        name={candidate.name}
                        faculty={candidate.faculty}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* MWA-WM Section */}
            <section className="relative flex w-3/4 flex-col items-center gap-4 sm:gap-8">
              {/* Decorative star */}
              <div className="pointer-events-none absolute -left-[2rem] -top-[2rem] -z-10 h-[6rem] w-[6rem] sm:-left-[3rem] sm:-top-[3rem] sm:h-[11rem] sm:w-[11rem] md:-left-[6rem] md:-top-[2rem] md:h-[20rem] md:w-[20rem] lg:h-[22rem] lg:w-[22rem]">
                <Image
                  src="/yellow-star.png"
                  alt=""
                  fill
                  className="pointer-events-none object-contain"
                />
              </div>

              <h2
                className="text-center text-3xl leading-none text-blue-800 sm:text-5xl md:text-7xl lg:text-[10rem]"
                style={{
                  fontFamily: "var(--font-sexsmith), sans-serif",
                  fontWeight: 400,
                  textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                MWA-WM
              </h2>
              <p
                className="text-xs sm:text-sm font-medium text-[#0A8E8B] md:text-base"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                Urutkan {MWAWM_CANDIDATES.length} calon ({rankingsMWAWM.length}/
                {MWAWM_CANDIDATES.length} dipilih)
              </p>
              <div className="grid w-full max-w-[400px] grid-cols-1 gap-3 px-2 sm:max-w-[700px] sm:grid-cols-2 sm:gap-5 md:max-w-[900px] md:grid-cols-3 md:gap-8">
                {MWAWM_CANDIDATES.map((candidate) => {
                  const rankIndex = rankingsMWAWM.indexOf(candidate.id);
                  const isSelected = rankIndex !== -1;
                  return (
                    <VoteCard
                      key={candidate.id}
                      bgColor={candidate.bgColor}
                      textColor="#FFF6E0"
                      imgUrl={candidate.imgUrl}
                      onClick={() =>
                        handleRankClick(
                          candidate.id,
                          rankingsMWAWM,
                          setRankingsMWAWM,
                        )
                      }
                      clicked={isSelected}
                      rank={isSelected ? rankIndex + 1 : null}
                      name={candidate.name}
                      faculty={candidate.faculty}
                    />
                  );
                })}
              </div>
            </section>

            {/* Confirmation checkbox */}
            <div className="mx-auto mt-4 flex max-w-[600px] items-start gap-3 px-4">
              <input
                type="checkbox"
                id="readCheckbox"
                checked={isRead}
                onChange={() => setIsRead(!isRead)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#EF476F]"
              />
              <label
                htmlFor="readCheckbox"
                className="text-xs sm:text-sm font-medium text-[#12499D] md:text-base"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                Saya yakin dengan pilihan saya dan memahami bahwa suara yang
                saya berikan bersifat final. Saya telah mempertimbangkan dengan
                saksama sebelum memberikan suara dalam Pemira KM ITB 2024/2025
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`mb-12 flex h-12 w-48 items-center justify-center rounded-[39px] bg-[#EF476F] transition-all duration-300 sm:h-[50px] sm:w-[200px] md:h-[70px] md:w-[280px] ${
                !isRead || !isVoteComplete
                  ? "cursor-not-allowed opacity-40"
                  : "hover:scale-[1.05] hover:shadow-lg hover:brightness-110"
              }`}
              disabled={!isRead || !isVoteComplete}
            >
              <span
                className="text-2xl sm:text-3xl md:text-[45px]"
                style={{
                  color: "#FFF6E0",
                  fontFamily: "var(--font-sexsmith), sans-serif",
                  fontWeight: 400,
                  textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                KIRIM!
              </span>
            </button>
          </form>
        </main>
      ) : (
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-6 sm:gap-8 px-6 pb-32 pt-12 sm:pt-16">
          <h1
            className="text-center text-4xl leading-none text-blue-800 sm:text-5xl md:text-7xl lg:text-[10rem]"
            style={{
              fontFamily: "var(--font-sexsmith), sans-serif",
              fontWeight: 400,
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            SURAT SUARA
          </h1>
          <Image
            src={"/paku.svg"}
            alt="paku"
            width={300}
            height={100}
            className="scale-[130%] sm:scale-[150%]"
          />
          <p
            className="text-center text-xl sm:text-2xl font-medium text-[#12499D] md:text-[40px]"
            style={{
              fontFamily: "var(--font-unbounded), sans-serif",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            Terima kasih sudah memberikan suara Anda!
          </p>
          <p
            className="text-center text-base sm:text-lg text-[#0A8E8B] md:text-2xl"
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            Hasil perhitungan suara akan diumumkan: 11 Maret 2025
          </p>
        </main>
      )}
    </div>
  );
};

export default withAuth(Vote, ["/vote"]);
// export default Vote;
