import React from "react";

interface CandidateData {
  title: string;      
  nama: string;
  noUrut: number;
  nimJurusan: string; 
  persen: number;     
  totalSuara: number; 
}

// Props utama untuk komponen VotingCard
export interface VotingCardProps {
  leftCandidates: CandidateData[];
  rightCandidates: CandidateData[];
}

const VotingCard: React.FC<VotingCardProps> = ({
  leftCandidates,
  rightCandidates,
}) => {
  const renderCandidate = (data: CandidateData) => (
    <div className="relative flex flex-col items-center text-center py-3 px-2">

      {/* Judul Atas (K3M / MWA WM) - Menggunakan Serif */}
      <h2
        className="text-[#12499D] text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6 tracking-tight"
        style={{ fontFamily: 'serif', fontWeight: 700 }}
      >
        {data.title}
      </h2>

      {/* Foto Profil / Placeholder Pink */}
      <div className="relative w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 bg-[#D6546A] rounded-full mb-3 sm:mb-4 md:mb-6 shadow-lg flex items-center justify-center border-4 border-white">
          {/* Badge Nomor Urut 01 */}
          <div className="absolute bottom-0 right-0 bg-[#12499D] text-white text-[10px] sm:text-xs w-5 sm:w-6 md:w-6 h-5 sm:h-6 md:h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
              01
          </div>
      </div>

      {/* Nama Kandidat */}
      <h3
        className={`text-medium text-[#D6546A] sm:text-xl md:text-2xl font-bold leading-tight mb-1`}
      >
        {data.nama}
      </h3>

      {/* NIM & Jurusan */}
      <p className="text-[#D6546A] text-xs sm:text-sm font-medium opacity-80 mb-3 sm:mb-4 md:mb-6">
        {data.nimJurusan}
      </p>

      {/* Angka Persentase */}
      <div className={`font-semibold text-[#12499D] text-4xl sm:text-5xl md:text-6xl font-black leading-none`}>
        {data.persen}%
      </div>

      {/* Total Suara */}
      <p className="text-[#12499D] text-[8px] sm:text-[10px] font-bold mt-2 tracking-wider">
        dari {data.totalSuara.toLocaleString('id-ID')} suara
      </p>
    </div>
  );

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
        {/* Left Candidates - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 md:p-6">
          {leftCandidates.map((candidate, index) => (
            <div key={`left-${index}`}>
              {renderCandidate(candidate)}
              {index < leftCandidates.length - 1 && (
                <div className="w-full h-[1px] bg-[#12499D]/10 my-4" />
              )}
            </div>
          ))}
        </div>

        {/* Garis pemisah tengah (opsional, tipis) */}
        <div className="w-[1px] bg-[#12499D]/10 self-stretch" />

        {/* Right Candidates - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 md:p-6">
          {rightCandidates.map((candidate, index) => (
            <div key={`right-${index}`}>
              {renderCandidate(candidate)}
              {index < rightCandidates.length - 1 && (
                <div className="w-full h-[1px] bg-[#12499D]/10 my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingCard;