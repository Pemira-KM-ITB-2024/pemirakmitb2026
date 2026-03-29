import React from "react";
import { unbounded } from "../../styles/fonts"; 

interface CandidateData {
  title: string;      
  nama: string;       
  nimJurusan: string; 
  persen: number;     
  totalSuara: number; 
}

// Props utama untuk komponen VotingCard
export interface VotingCardProps {
  leftCandidate: CandidateData;
  rightCandidate: CandidateData;
}

const VotingCard: React.FC<VotingCardProps> = ({
  leftCandidate,
  rightCandidate,
}) => {
  const renderCandidate = (data: CandidateData) => (
    <div className="relative flex-1 flex flex-col items-center text-center p-6">
      
      {/* Judul Atas (K3M / MWA WM) - Menggunakan Serif */}
      <h2 
        className="text-[#12499D] text-4xl mb-6 tracking-tight"
        style={{ fontFamily: 'serif', fontWeight: 700 }}
      >
        {data.title}
      </h2>

      {/* Foto Profil / Placeholder Pink */}
      <div className="relative w-40 h-40 bg-[#D6546A] rounded-full mb-6 shadow-lg flex items-center justify-center border-4 border-white">
          {/* Badge Nomor Urut 01 */}
          <div className="absolute bottom-1 right-2 bg-[#12499D] text-white text-[12px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
              01
          </div>
      </div>

      {/* Nama Kandidat */}
      <h3 
        className={`${unbounded.className} text-[#D6546A] text-2xl font-bold uppercase leading-tight mb-1`}
      >
        {data.nama}
      </h3>

      {/* NIM & Jurusan */}
      <p className="text-[#D6546A] text-sm font-medium opacity-80 mb-6">
        {data.nimJurusan}
      </p>

      {/* Angka Persentase */}
      <div className={`${unbounded.className} text-[#12499D] text-6xl font-black leading-none`}>
        {data.persen}%
      </div>

      {/* Total Suara */}
      <p className="text-[#12499D] text-[10px] font-bold mt-2 tracking-wider">
        dari {data.totalSuara.toLocaleString('id-ID')} suara
      </p>
    </div>
  );

  return (
    <div 
      className="relative flex flex-row items-center overflow-hidden shadow-2xl"
      style={{ 
        width: '1040px', 
        height: '414px', 
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
      <div className="relative z-10 flex flex-row w-full h-full items-center">
        {renderCandidate(leftCandidate)}
        
        {/* Garis pemisah tengah (opsional, tipis) */}
        <div className="w-[1px] h-[60%] bg-[#12499D]/10"></div>
        
        {renderCandidate(rightCandidate)}
      </div>
    </div>
  );
};

export default VotingCard;