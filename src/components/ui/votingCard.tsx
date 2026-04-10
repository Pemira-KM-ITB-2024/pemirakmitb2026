import React from "react";

interface RoundData {
  round: number;
  percentages: Record<number, number>;
  eliminated?: number;
  exhaustedVotes?: number;
}

export interface ElectionResult {
  title: string;
  winner: number | null;
  rounds: RoundData[];
  totalVotes: number;
  kotakKosongVotes: number;
  exhaustedVotes: number;
  candidateNames: string[];
  candidatePhotoUrls: string[];
}

// Props utama untuk komponen VotingCard
export interface VotingCardProps {
  leftElection: ElectionResult;
  rightElection: ElectionResult;
}

const VotingCard: React.FC<VotingCardProps> = ({
  leftElection,
  rightElection,
}) => {
  const renderCandidate = (
    candidateNum: number,
    name: string,
    photoUrl: string,
    rounds: RoundData[],
    totalVotes: number,
    isWinner: boolean
  ) => {
    const lastRoundIndex = rounds.length - 1;
    const finalPercent = rounds[lastRoundIndex]?.percentages[candidateNum] ?? 0;

    return (
      <div className="relative flex flex-col items-center text-center py-3 px-2">
        {/* Winner Badge */}
        {isWinner && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#D6546A] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full mb-1 z-10">
            PEMENANG
          </div>
        )}

        {/* Foto Profil / Placeholder Pink */}
        <div className="relative w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 bg-[#D6546A] rounded-full mb-2 sm:mb-3 shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
          {/* Badge Nomor Urut */}
          <div className="absolute bottom-0 right-0 bg-[#12499D] text-white text-[10px] sm:text-xs w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 rounded-full flex items-center justify-center border-2 border-white font-bold">
            {String(candidateNum).padStart(2, '0')}
          </div>
        </div>

        {/* Nama Kandidat */}
        <h3 className="text-[#D6546A] sm:text-lg md:text-xl font-bold leading-tight mb-1">
          {name}
        </h3>

        {/* NIM & Jurusan */}
        <p className="text-[#D6546A] text-xs sm:text-sm font-medium opacity-80 mb-2 sm:mb-3">
          Kandidat {candidateNum}
        </p>

        {/* Final Percentage */}
        <div className="font-black text-[#12499D] text-3xl sm:text-4xl md:text-5xl leading-none mb-2">
          {finalPercent != 0 ? `${finalPercent}%` : 'Eliminated'}
        </div>

        {/* Total Suara */}
        <p className="text-[#12499D] text-[8px] sm:text-[10px] font-bold mb-2 tracking-wider">
          dari {totalVotes.toLocaleString('id-ID')} suara
        </p>

        {/* Per Round Breakdown */}
        {rounds.length > 0 && (
          <div className="w-full bg-[#12499D]/5 rounded-lg p-1.5 sm:p-2 mt-2">
            <p className="text-[8px] sm:text-[10px] text-[#12499D]/70 font-bold mb-1">PER ROUND</p>
            <div className="flex flex-wrap justify-center gap-1">
              {rounds.map((round, idx) => {
                const percent = round.percentages[candidateNum] ?? 0;
                const isLast = idx === lastRoundIndex;
                const isEliminated = round.eliminated === candidateNum;
                return (
                  <div
                    key={round.round}
                    className={`
                      flex flex-col items-center justify-center min-w-[28px] sm:min-w-[36px]
                      ${isLast ? 'bg-[#D6546A]/20 rounded-md px-1 py-0.5' : ''}
                      ${isEliminated ? 'opacity-40' : ''}
                    `}
                  >
                    <span className="text-[8px] sm:text-[10px] text-[#12499D]/60">
                      {isLast ? '🏆' : `R${idx + 1}`}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-bold ${isLast ? 'text-[#D6546A]' : 'text-[#12499D]'} ${isEliminated ? 'line-through' : ''}`}>
                      {percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderElection = (election: ElectionResult) => {
    const numCandidates = election.candidateNames.length;

    return (
      <div className="flex-1 flex flex-col min-h-0">
        {/* Judul Atas (K3M / MWA WM) */}
        <h2
          className="text-[#12499D] text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 tracking-tight text-center"
          style={{ fontFamily: 'serif', fontWeight: 700 }}
        >
          {election.title}
        </h2>

        {/* Kotak Kosong Info */}
        <div className="bg-[#888888]/20 rounded-lg p-2 mb-3 text-center">
          <p className="text-[#888888] text-xs sm:text-sm font-bold">KOTAK KOSONG</p>
          <p className="text-[#888888] text-lg sm:text-xl font-black">
            {election.kotakKosongVotes} suara
          </p>
          <p className="text-[#12499D]/60 text-[10px] sm:text-xs">
            ({Math.round((election.kotakKosongVotes / election.totalVotes) * 100) || 0}%)
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {election.candidateNames.map((name, idx) => {
              const candidateNum = idx + 1;
              return (
                <div key={candidateNum}>
                  {renderCandidate(
                    candidateNum,
                    name,
                    election.candidatePhotoUrls[idx] ?? "",
                    election.rounds,
                    election.totalVotes,
                    election.winner === candidateNum
                  )}
                  {idx < numCandidates - 1 && (
                    <div className="w-full h-[1px] bg-[#12499D]/10 my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative flex shadow-2xl w-full min-h-[400px] md:min-h-[500px]"
      style={{
        backgroundColor: '#FFF6E0',
      }}
    >
      {/* Background Image Layer (Bintang-bintang) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bgvotingcard.png"
          alt="Background Card"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-row w-full min-h-[400px] md:min-h-[500px]">
        {/* Left Election - K3M */}
        <div className="flex-1 flex flex-col min-h-0 p-2 sm:p-3 md:p-4 overflow-hidden">
          {renderElection(leftElection)}
        </div>

        {/* Garis pemisah tengah */}
        <div className="w-[1px] bg-[#12499D]/10 self-stretch" />

        {/* Right Election - MWA WM */}
        <div className="flex-1 flex flex-col min-h-0 p-2 sm:p-3 md:p-4 overflow-hidden">
          {renderElection(rightElection)}
        </div>
      </div>
    </div>
  );
};

export default VotingCard;