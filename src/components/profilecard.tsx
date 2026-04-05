// import React from "react";

// export const KProfileCard = () => {
//   return (
//     <div className="relative mx-auto w-full max-w-[760px] px-1 md:mt-12 md:h-[1550px] md:max-w-[1344px] md:px-0">
//       <div className="flex flex-col items-center md:block">
//         <div className="h-24 w-24 rounded-full bg-rose-500 md:absolute md:left-1/2 md:top-[15px] md:h-56 md:w-56 md:-translate-x-1/2" />

//         <div className="mt-3 inline-flex h-7 w-7 flex-col items-center justify-center gap-2.5 rounded-full bg-sky-800 px-1.5 py-1.5 md:absolute md:left-1/2 md:top-[127px] md:mt-0 md:h-14 md:w-14 md:-translate-x-1/2 md:translate-x-[64px] md:translate-y-[42px]">
//           <div className="text-xs font-normal text-yellow-50 md:text-xl">01</div>
//         </div>

//         <div className="mt-3 inline-flex flex-col items-center justify-start gap-1 text-center md:absolute md:left-1/2 md:top-[275px] md:mt-0 md:-translate-x-1/2 md:gap-2">
//           <div className="text-xl font-semibold text-rose-500 md:text-[40px]">Lorem ipsum</div>
//           <div className="inline-flex w-full max-w-xs items-center justify-center gap-2.5 md:w-[420px] md:max-w-none md:gap-5">
//             <div className="text-sm font-normal text-rose-500/60 md:text-2xl">12324001</div>
//             <div className="h-[3px] w-[3px] rounded-full bg-rose-500 md:h-[6px] md:w-[6px]" />
//             <div className="text-sm font-normal text-rose-500/60 md:text-2xl">kedokteran</div>
//           </div>
//         </div>

//         <div className="mt-6 inline-flex w-full flex-col items-start justify-start gap-5 md:absolute md:left-0 md:top-[380px] md:mt-0 md:gap-10">
//           <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[40px] bg-rose-500/20 px-4 py-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:w-[90%] md:self-center md:gap-6 md:px-8 md:py-5">
//             <div className="self-stretch text-center text-base font-medium text-blue-800 md:text-[32px]">VISI</div>
//             <div className="self-stretch break-words text-center text-sm font-normal text-cyan-700 md:text-[22px] md:leading-[1.35]">
//               Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.
//               <br />
//               Aut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui..
//             </div>
//           </div>

//           <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[40px] bg-rose-500/20 px-4 py-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:w-[90%] md:self-center md:gap-6 md:px-8 md:py-5">
//             <div className="self-stretch text-center text-base font-medium text-blue-800 md:text-[32px]">MISI</div>
//             <div className="self-stretch break-words text-center text-sm font-normal text-cyan-700 md:text-[22px] md:leading-[1.35]">
//               Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.
//               <br />
//               Aut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui molestias quia qui quis obcaecati. Ut consequatur quas sed voluptas explicabo et autem maxime est voluptas eligendi.
//               <br />
//               Eos repudiandae doloremque hic fugiat similique id necessitatibus fugit aut deserunt impedit? Id incidunt accusantium et tempora tenetur qui quas nisi in ducimus magni et odit cupiditate? Sit officia autem eos animi placeat qui voluptas aliquam et optio consequatur hic dolor eligendi et possimus quia.
//             </div>
//           </div>

//           <div className="grid w-full grid-cols-3 items-center text-center md:w-[90%] md:self-center">
//             <div className="text-left text-sm font-normal text-rose-500/60 underline md:text-[24px]">PORTOFOLIO</div>
//             <div className="mx-auto h-[3px] w-[3px] rounded-full bg-rose-500 md:h-[6px] md:w-[6px]" />
//             <div className="text-right text-sm font-normal text-rose-500/60 underline md:text-[24px]">@username</div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export const MProfileCard = () => {
//   return <KProfileCard />;
// };

import React from "react";

interface DataKandidatType {
  id: number;
  noKandidat: number;
  name: string;
  photoUrl: string;
  studentId: string;
  faculty: string;
  visi: string;
  misi: string;
  portfolioUrl: string;
  instagramUrl: string;
}

// Hardcoded data kandidat, nanti bisa diganti dengan data dari backend
const DATA_KANDIDAT: DataKandidatType[] = [
  {
    id: 1,
    noKandidat: 1,
    name: "Samuel P. H. Panjaitan",
    photoUrl: "/calon-2026/1.png",
    studentId: "EL'22",
    faculty: "Teknik Elektro",
    visi: "REINVENSI KM ITB MENUJU RELEVANSI KOLEKTIF UNTUK SEMUA",
    misi: "1. Mencipta Ulang Kabinet yang Menghangatkan\n2. Mencipta Ulang Sistem yang Memudahkan\n3. Mencipta Ulang Kemahasiswaan yang Menyenangkan",
    portfolioUrl: "https://drive.google.com/drive/folders/1nHnHPM179XaNVmsHJS9Fs3bopC1WzUOy?usp=sharing",
    instagramUrl: "https://www.instagram.com/samthingbig",
  },
  {
    id: 2,
    noKandidat: 2,
    name: "Nahdah Nabillah HR.",
    photoUrl: "/calon-2026/2.png",
    studentId: "PL'22",
    faculty: "Perencanaan Wilayah dan Kota",
    visi: "KM ITB sebagai Inisiator Keberdampakan yang Relevan-Berkelanjutan untuk Kemajuan Bangsa",
    misi: "1. Mendorong pemenuhan kebutuhan dasar dan lanjutan yang relevan untuk menciptakan individu berdaya dalam menjawab tantangan zaman.\n2. Mengoptimalkan lini pergerakan yang berbasis kebenaran ilmiah untuk menciptakan keberdampakan bermakna.\n3. Mewujudkan sistem organisasi yang integratif-kolaboratif guna menjaga relevansi dan keberlanjutan KM ITB.\n4. Memperluas jejaring dan merawat kolaborasi eksternal untuk mengeskalasi keberdampakan.",
    portfolioUrl: "https://drive.google.com/drive/folders/1Wlf1Q82nQdmcqgMUD7kWT-f1D0dk-DVB?usp=sharing",
    instagramUrl: "https://www.instagram.com/bersama.nahda",
  },
  {
    id: 3,
    noKandidat: 3,
    name: "Hazmi Abdul Jalil",
    photoUrl: "/calon-2026/3.png",
    studentId: "BA'22",
    faculty: "Rekayasa Pertanian",
    visi: "Mengakselerasi dan menumbuhkan KM ITB sebagai ekosistem yang terintegrasi dan kolaboratif dalam mewujudkan keterhubungan dan kebermanfaatan bagi seluruh anggotanya.",
    misi: "1. Memperkuat keterhubungan dan integrasi ekosistem KM ITB melalui optimalisasi peran antar lembaga serta implementasi sistem multikampus yang inklusif dan terkoordinasi.\n2. Mengakselerasi proses pengembangan mahasiswa melalui sistem yang terarah, terintegrasi, dan berbasis pengalaman untuk membentuk insan akademis yang adaptif dan berdampak.\n3. Meningkatkan keterjangkauan dan kualitas layanan mahasiswa melalui sistem yang terintegrasi, responsif, dan berorientasi pada kebutuhan nyata mahasiswa.\n4. Membangun sistem kaderisasi KM ITB yang terintegrasi lintas lembaga, berkelanjutan, dan berbasis data sebagai fondasi pengembangan mahasiswa.\n5. Mewujudkan tata kelola organisasi yang transparan, partisipatif, dan akuntabel untuk mendorong keterlibatan mahasiswa yang bermakna.\n6. Menguatkan konsolidasi pergerakan mahasiswa yang adaptif, kolaboratif, dan berkelanjutan dalam merespons dinamika isu serta menjaga arah gerak organisasi.",
    portfolioUrl: "https://drive.google.com/drive/folders/1yv14tdjEr5oWZ6jClXa6UqgBfPlWfXb7?usp=sharing",
    instagramUrl: "https://www.instagram.com/hazmi_bok3m",
  },
  {
    id: 4,
    noKandidat: 1,
    name: "David Christian Saputro",
    photoUrl: "/calon-2026/4.png",
    studentId: "AR'22",
    faculty: "Arsitektur",
    visi: "MWA WM sebagai titik temu suara mahasiswa sebagai advokasi inklusif dan menciptakan keberlanjutan yang progresif.",
    misi: "1. Menciptakan titik temu untuk mensinergikan aspirasi mahasiswa yang akuntabel.\n2. Mendorong pengawalan kebijakan kampus melalui advokasi yang representatif.\n3. Meningkatkan diseminasi informasi yang transparan guna mendorong keberlanjutan yang progresif.",
    portfolioUrl: "https://drive.google.com/drive/folders/1hmha81eTolyZG0mLRwBr3Ijq8pPOtU0G?usp=sharing",
    instagramUrl: "https://www.instagram.com/bertemudavid",
  },
  {
    id: 5,
    noKandidat: 2,
    name: "Rian Albar Insani",
    photoUrl: "/calon-2026/5.png",
    studentId: "BA'22",
    faculty: "Rekayasa Pertanian",
    visi: "MWA WM sebagai personifikasi kemajemukan mahasiswa sekaligus jembatan aksesibilitas dalam mengawal pembenahan institusi dan kemahasiswaan ITB.",
    misi: "1. Mengintegrasikan kemajemukan mahasiswa menjadi satu kesatuan suara advokasi yang representatif.\n2. Membuka aksesibilitas dialog antara mahasiswa dan pemangku kebijakan secara proaktif dan berbasis data.\n3. Mendorong pembenahan tata kelola institusi serta menyinergikan elemen kemahasiswaan secara akuntabel.",
    portfolioUrl: "https://drive.google.com/drive/folders/1A6RW3BGYzpBufX7LEcStxdEIeALaZeH6?usp=sharing",
    instagramUrl: "https://www.instagram.com/seruan.sanubari",
  },
];

interface ProfileCardProps {
  id: number;
}

export const ProfileCard = ({ id }: ProfileCardProps) => {
  const candidate = DATA_KANDIDAT.find((d) => d.id === id);

  if (!candidate) {
    return <div>Data kandidat tidak ditemukan</div>;
  }

  return (
    <div className="relative mx-auto w-full max-w-[360px] px-4 md:mt-12 md:max-w-[1000px]">
      <div className="flex flex-col items-center gap-6 md:gap-12 z-10 w-full">
        
        {/* foto n nomor kandidat */}
        <div className="relative flex-shrink-0">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="h-28 w-28 rounded-full object-cover md:h-32 md:w-32 lg:h-56 lg:w-56"
          />
          
          {/* Nomor Kandidat (Absolute relative terhadap foto wrapper ini) */}
          <div className="absolute bottom-0.5 right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-800 md:bottom-0 md:right-0 md:h-11 md:w-11 lg:bottom-2 lg:right-2 lg:h-14 lg:w-14">
            <div className="text-xs font-normal text-yellow-50 md:text-xl">
               {String(candidate.noKandidat).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* NAMA JURUSAN */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-semibold text-rose-500 md:text-[40px] leading-tight">
            {candidate?.name}
          </h2>
          <div className="flex items-center justify-center gap-2.5 md:gap-5">
            <span className="text-sm font-normal text-rose-500/60 md:text-2xl">{candidate?.studentId}</span>
            <div className="h-[3px] w-[3px] rounded-full bg-rose-500 md:h-[6px] md:w-[6px]" />
            <span className="text-sm font-normal text-rose-500/60 md:text-2xl">{candidate?.faculty}</span>
          </div>
        </div>

        {/* VISI MISI */}
        <div className="flex w-full flex-col gap-6 md:gap-10 items-center">
          <InfoCard title="VISI" content={candidate.visi} />
          <InfoCard title="MISI" content={candidate.misi} />
        </div>

        {/* FOOTER LINKS */}
        <div className="flex w-full items-center justify-between pt-2 px-9 gap-3 text-center md:w-[90%] md:justify-between md:px-20">
             <SocialLink label="DRAF" href={candidate.portfolioUrl} align="left" />
             <div className="mx-auto h-[3px] w-[3px] rounded-full bg-rose-500 md:h-[6px] md:w-[6px]" />
             <SocialLink label={candidate.instagramUrl.replace("https://www.instagram.com/", "@")} href={candidate.instagramUrl} align="right" />
        </div>

      </div>
    </div>
  );
};

const InfoCard = ({ title, content }: { title: string; content: string }) => (
  <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[30px] md:rounded-[40px] bg-rose-500/20 px-6 py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:w-[90%] md:self-center md:gap-6 md:px-8 md:py-5">
    <div className="self-stretch text-center text-base font-medium text-blue-800 md:text-[32px]">{title}</div>
    <div className="self-stretch break-words text-center text-xs sm:text-sm font-normal text-cyan-700 md:text-[22px] md:leading-[1.35] whitespace-pre-line">
      {content}
    </div>
  </div>
);

const SocialLink = ({ label, href, align }: { label: string; href: string; align: 'left' | 'right' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : 'text-right';

  return (
    <a
      className={`${alignmentClass} text-sm font-normal text-rose-500/60 underline md:text-[24px] hover:text-rose-500 transition-colors`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
};
