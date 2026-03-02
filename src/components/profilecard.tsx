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
  name: string;
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
    name: "Lorem ipsum",
    studentId: "12324001",
    faculty: "kedokteran",
    visi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.\n\nAut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui..",
    misi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.\n\nAut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui molestias quia qui quis obcaecati. Ut consequatur quas sed voluptas explicabo et autem maxime est voluptas eligendi.\n\nEos repudiandae doloremque hic fugiat similique id necessitatibus fugit aut deserunt impedit? Id incidunt accusantium et tempora tenetur qui quas nisi in ducimus magni et odit cupiditate? Sit officia autem eos animi placeat qui voluptas aliquam et optio consequatur hic dolor eligendi et possimus quia.",
    portfolioUrl: "https://drive.google.com/file",
    instagramUrl: "https://www.instagram.com/username",
  },
  {
    id: 2,
    name: "Lorem ipsum",
    studentId: "12324001",
    faculty: "kedokteran",
    visi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.\n\nAut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui..",
    misi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.\n\nAut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui molestias quia qui quis obcaecati. Ut consequatur quas sed voluptas explicabo et autem maxime est voluptas eligendi.\n\nEos repudiandae doloremque hic fugiat similique id necessitatibus fugit aut deserunt impedit? Id incidunt accusantium et tempora tenetur qui quas nisi in ducimus magni et odit cupiditate? Sit officia autem eos animi placeat qui voluptas aliquam et optio consequatur hic dolor eligendi et possimus quia.",
    portfolioUrl: "https://drive.google.com/file",
    instagramUrl: "https://www.instagram.com/username",
  },
  {
    id: 3,
    name: "Lorem ipsum",
    studentId: "12324001",
    faculty: "kedokteran",
    visi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.Aut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui..",
    misi: "Lorem ipsum dolor sit amet. Est dolor illo qui repellendus voluptatem qui rerum nihil aut quisquam voluptate qui voluptate voluptas! Aut mollitia excepturi aut temporibus necessitatibus et blanditiis rerum ut quaerat voluptatem. Vel libero dignissimos 33 consequatur blanditiis qui atque ratione et natus exercitationem et corporis obcaecati quo suscipit delectus. Est illum accusantium quo excepturi eveniet est velit Quis ut dolores placeat.Aut quia doloribus est dignissimos adipisci non neque natus. Sit necessitatibus omnis qui molestias quia qui quis obcaecati. Ut consequatur quas sed voluptas explicabo et autem maxime est voluptas eligendi.Eos repudiandae doloremque hic fugiat similique id necessitatibus fugit aut deserunt impedit? Id incidunt accusantium et tempora tenetur qui quas nisi in ducimus magni et odit cupiditate? Sit officia autem eos animi placeat qui voluptas aliquam et optio consequatur hic dolor eligendi et possimus quia.",
    portfolioUrl: "https://drive.google.com/file",
    instagramUrl: "https://www.instagram.com/username",
  },
];

interface ProfileCardProps {
  no_kandidat: number;
}

export const ProfileCard = ({ no_kandidat }: ProfileCardProps) => {
  const candidate = DATA_KANDIDAT.find((d) => d.id === no_kandidat) ?? DATA_KANDIDAT[0];

  if (!candidate) {
    return <div>Data kandidat tidak ditemukan</div>;
  }

  return (
    <div className="relative mx-auto w-full max-w-[360px] px-4 md:mt-12 md:max-w-[1000px]">
      <div className="flex flex-col items-center gap-6 md:gap-12 z-10 w-full">
        
        {/* foto n nomor kandidat */}
        <div className="relative flex-shrink-0">
          <div className="h-28 w-28 rounded-full bg-rose-500 md:h-32 md:w-32 lg:h-56 lg:w-56" />
          
          {/* Nomor Kandidat (Absolute relative terhadap foto wrapper ini) */}
          <div className="absolute bottom-0.5 right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-800 md:bottom-0 md:right-0 md:h-11 md:w-11 lg:bottom-2 lg:right-2 lg:h-14 lg:w-14">
            <div className="text-xs font-normal text-yellow-50 md:text-xl">
               {String(no_kandidat).padStart(2, '0')}
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
             <SocialLink label="PORTOFOLIO" href={candidate.portfolioUrl} align="left" />
             <div className="mx-auto h-[3px] w-[3px] rounded-full bg-rose-500 md:h-[6px] md:w-[6px]" />
             <SocialLink label="@username" href={candidate.instagramUrl} align="right" />
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

const SocialLink = ({ label, href, align }: { label: string; href: string; align: 'left' | 'right' }) => (
  <a
    className={`text-${align} text-sm font-normal text-rose-500/60 underline md:text-[24px] hover:text-rose-500 transition-colors`}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {label}
  </a>
);
