export const fakultas = [
  { kode: "STEI-K", nama: "Sekolah Teknik Elektro dan Informatika" },
  { kode: "FMIPA", nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam" },
  { kode: "SITH", nama: "Sekolah Ilmu dan Teknologi Hayati" },
  { kode: "SF", nama: "Sekolah Farmasi" },
  { kode: "FTTM", nama: "Fakultas Teknik Pertambangan dan Perminyakan" },
  { kode: "FITB", nama: "Fakultas Ilmu dan Teknologi Kebumian" },
  { kode: "FTI", nama: "Fakultas Teknologi Industri" },
  { kode: "STEI-R", nama: "Sekolah Teknik Elektro dan Informatika" },
  { kode: "FTMD", nama: "Fakultas Teknik Mesin dan Dirgantara" },
  { kode: "FTSL", nama: "Fakultas Teknik Sipil dan Lingkungan" },
  { kode: "SAPPK", nama: "Sekolah Arsitektur, Perencanaan dan Pengembangan Kebijakan" },
  { kode: "FSRD", nama: "Fakultas Seni Rupa dan Desain" },
  { kode: "SBM", nama: "School of Business and Management" },
  { kode: "SPS", nama: "Sekolah Pascasarjana" },
];

export type ProgramStudi = {
  kode: string;
  nama: string;
  fakultasKode: string;
  himpunan: string;
};

export const programStudi: ProgramStudi[] = [
  // FMIPA
  { kode: "101", nama: "Matematika", fakultasKode: "FMIPA", himpunan: "HIMATIKA ITB" },
  { kode: "102", nama: "Fisika", fakultasKode: "FMIPA", himpunan: "HIMAFI ITB" },
  { kode: "103", nama: "Astronomi", fakultasKode: "FMIPA", himpunan: "HIMASTRON ITB" },
  { kode: "105", nama: "Kimia", fakultasKode: "FMIPA", himpunan: "HMK (AMISCA) ITB" },
  { kode: "108", nama: "Aktuaria", fakultasKode: "FMIPA", himpunan: "HIMATIKA ITB" },
  { kode: "201", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "202", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "203", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "205", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "208", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "209", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "246", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "247", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "248", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "249", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "301", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "302", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "303", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "305", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  { kode: "349", nama: "Pascasarjana", fakultasKode: "FMIPA", himpunan: "" },
  
  // SITH
  { kode: "106", nama: "Biologi", fakultasKode: "SITH", himpunan: "HIMABIO (Nymphaea) ITB" },
  { kode: "104", nama: "Mikrobiologi", fakultasKode: "SITH", himpunan: "HIMAMIKRO (Archaea) ITB" },
  { kode: "112", nama: "Rekayasa Hayati", fakultasKode: "SITH", himpunan: "HMRH ITB" },
  { kode: "114", nama: "Rekayasa Pertanian", fakultasKode: "SITH", himpunan: "HIMAREKTA (Agrapana) ITB" },
  { kode: "115", nama: "Rekayasa Kehutanan", fakultasKode: "SITH", himpunan: "HMH (Selva) ITB" },
  { kode: "119", nama: "Teknologi Pasca Panen", fakultasKode: "SITH", himpunan: "HMPP (VADRA) ITB" },
  { kode: "206", nama: "Pascasarjana", fakultasKode: "SITH", himpunan: "" },
  { kode: "211", nama: "Pascasarjana", fakultasKode: "SITH", himpunan: "" },
  { kode: "213", nama: "Pascasarjana", fakultasKode: "SITH", himpunan: "" },
  { kode: "306", nama: "Pascasarjana", fakultasKode: "SITH", himpunan: "" },
  
  // SF
  { kode: "107", nama: "Sains dan Teknologi Farmasi", fakultasKode: "SF", himpunan: "HMF (Ars Praeparandi) ITB" },
  { kode: "116", nama: "Farmasi Klinik dan Komunitas", fakultasKode: "SF", himpunan: "HMF (Ars Praeparandi) ITB" },
  { kode: "907", nama: "Pascasarjana", fakultasKode: "SF", himpunan: "" },
  { kode: "207", nama: "Pascasarjana", fakultasKode: "SF", himpunan: "" },
  { kode: "217", nama: "Pascasarjana", fakultasKode: "SF", himpunan: "" },
  { kode: "218", nama: "Pascasarjana", fakultasKode: "SF", himpunan: "" },
  { kode: "307", nama: "Pascasarjana", fakultasKode: "SF", himpunan: "" },
  
  // FTTM
  { kode: "121", nama: "Teknik Pertambangan", fakultasKode: "FTTM", himpunan: "HMT ITB" },
  { kode: "122", nama: "Teknik Perminyakan", fakultasKode: "FTTM", himpunan: "HMTM (PATRA) ITB" },
  { kode: "123", nama: "Teknik Geofisika", fakultasKode: "FTTM", himpunan: "HIMA TG (TERRA) ITB" },
  { kode: "125", nama: "Teknik Metalurgi", fakultasKode: "FTTM", himpunan: "IMMG ITB" },
  { kode: "221", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "222", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "223", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "225", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "226", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "321", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "322", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  { kode: "323", nama: "Pascasarjana", fakultasKode: "FTTM", himpunan: "" },
  
  // FITB
  { kode: "120", nama: "Teknik Geologi", fakultasKode: "FITB", himpunan: "HMTG (GEA) ITB" },
  { kode: "128", nama: "Meteorologi", fakultasKode: "FITB", himpunan: "HMME (Atmosphaira) ITB" },
  { kode: "129", nama: "Oseanografi", fakultasKode: "FITB", himpunan: "HMO (TRITON) ITB" },
  { kode: "151", nama: "Teknik Geodesi dan Geomatika", fakultasKode: "FITB", himpunan: "IMG ITB" },
  { kode: "220", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "224", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "227", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "251", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "320", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "324", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  { kode: "351", nama: "Pascasarjana", fakultasKode: "FITB", himpunan: "" },
  
  // FTI
  { kode: "130", nama: "Teknik Kimia", fakultasKode: "FTI", himpunan: "HIMATEK ITB" },
  { kode: "133", nama: "Teknik Fisika", fakultasKode: "FTI", himpunan: "HMFT ITB" },
  { kode: "134", nama: "Teknik Industri", fakultasKode: "FTI", himpunan: "MTI ITB" },
  { kode: "143", nama: "Teknik Pangan", fakultasKode: "FTI", himpunan: "HMPG ITB" },
  { kode: "144", nama: "Manajemen Rekayasa", fakultasKode: "FTI", himpunan: "MTI ITB" },
  { kode: "145", nama: "Teknik Bioenergi dan Kemurgi", fakultasKode: "FTI", himpunan: "HMTB (RINUVA) ITB" },
  { kode: "194", nama: "Teknik Industri (Cirebon)", fakultasKode: "FTI", himpunan: "MTI ITB"},
  { kode: "230", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "233", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "234", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "238", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "294", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "330", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "333", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  { kode: "334", nama: "Pascasarjana", fakultasKode: "FTI", himpunan: "" },
  
  // STEI (Combined STEI-R and STEI-K)
  { kode: "132", nama: "Teknik Elektro", fakultasKode: "STEI-R", himpunan: "HME ITB" },
  { kode: "135", nama: "Teknik Informatika", fakultasKode: "STEI-K", himpunan: "HMIF ITB" },
  { kode: "180", nama: "Teknik Tenaga Listrik", fakultasKode: "STEI-R", himpunan: "HME ITB" },
  { kode: "181", nama: "Teknik Telekomunikasi", fakultasKode: "STEI-R", himpunan: "IMT (Signum) ITB" },
  { kode: "182", nama: "Sistem dan Teknologi Informasi", fakultasKode: "STEI-K", himpunan: "HMIF ITB" },
  { kode: "183", nama: "Teknik Biomedis", fakultasKode: "STEI-R", himpunan: "HME ITB" },
  { kode: "232", nama: "Pascasarjana", fakultasKode: "STEI-R", himpunan: "" },
  { kode: "235", nama: "Pascasarjana", fakultasKode: "STEI-K", himpunan: "" },
  { kode: "282", nama: "Pascasarjana", fakultasKode: "STEI-K", himpunan: "" },
  { kode: "332", nama: "Pascasarjana", fakultasKode: "STEI-R", himpunan: "" },
  
  // FTMD
  { kode: "131", nama: "Teknik Mesin", fakultasKode: "FTMD", himpunan: "HMM ITB" },
  { kode: "136", nama: "Teknik Dirgantara", fakultasKode: "FTMD", himpunan: "KMPN" },
  { kode: "137", nama: "Teknik Material", fakultasKode: "FTMD", himpunan: "MTM ITB" },
  { kode: "231", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  { kode: "236", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  { kode: "237", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  { kode: "331", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  { kode: "336", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  { kode: "337", nama: "Pascasarjana", fakultasKode: "FTMD", himpunan: "" },
  
  // FTSL
  { kode: "150", nama: "Teknik Sipil", fakultasKode: "FTSL", himpunan: "HMS ITB" },
  { kode: "153", nama: "Teknik Lingkungan", fakultasKode: "FTSL", himpunan: "HMTL ITB" },
  { kode: "155", nama: "Teknik Kelautan", fakultasKode: "FTSL", himpunan: "KMKL ITB" },
  { kode: "157", nama: "Rekayasa Infrastruktur Lingkungan", fakultasKode: "FTSL", himpunan: "KMIL ITB" },
  { kode: "158", nama: "Teknik dan Pengelolaan Sumber Daya Air", fakultasKode: "FTSL", himpunan: "Himasda-ITB" },
  { kode: "250", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "253", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "255", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "257", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "258", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "269", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "350", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  { kode: "353", nama: "Pascasarjana", fakultasKode: "FTSL", himpunan: "" },
  
  // SAPPK
  { kode: "152", nama: "Arsitektur", fakultasKode: "SAPPK", himpunan: "IMA (Gunadharma) ITB" },
  { kode: "154", nama: "Perencanaan Wilayah dan Kota", fakultasKode: "SAPPK", himpunan: "HMP Pangripta Loka ITB" },
  { kode: "156", nama: "Perencanaan Wilayah dan Kota (Cirebon)", fakultasKode: "SAPPK", himpunan: "HMP Pangripta Loka ITB" },
  { kode: "240", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "242", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "252", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "254", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "256", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "288", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "289", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "342", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "352", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  { kode: "354", nama: "Pascasarjana", fakultasKode: "SAPPK", himpunan: "" },
  
  // FSRD
  { kode: "170", nama: "Seni Rupa", fakultasKode: "FSRD", himpunan: "KMSR VASA-ITB" },
  { kode: "171", nama: "Kriya (Cirebon)", fakultasKode: "FSRD", himpunan: "KMSR-TERIKAT-ITB" },
  { kode: "172", nama: "Kriya", fakultasKode: "FSRD", himpunan: "KMSR-TERIKAT-ITB" },
  { kode: "173", nama: "Desain Interior", fakultasKode: "FSRD", himpunan: "KMSR-IMDI ITB" },
  { kode: "174", nama: "Desain Komunikasi Visual", fakultasKode: "FSRD", himpunan: "KMSR-IPPDIG ITB" },
  { kode: "175", nama: "Desain Produk", fakultasKode: "FSRD", himpunan: "KMSR-INDDES ITB" },
  { kode: "270", nama: "Pascasarjana", fakultasKode: "FSRD", himpunan: "" },
  { kode: "271", nama: "Pascasarjana", fakultasKode: "FSRD", himpunan: "" },
  { kode: "370", nama: "Pascasarjana", fakultasKode: "FSRD", himpunan: "" },
  
  // SBM
  { kode: "190", nama: "Manajemen", fakultasKode: "SBM", himpunan: "KMM ITB" },
  { kode: "192", nama: "Kewirausahaan", fakultasKode: "SBM", himpunan: "IMK (Artha) ITB" },
  { kode: "290", nama: "Pascasarjana", fakultasKode: "SBM", himpunan: "" },
  { kode: "291", nama: "Pascasarjana", fakultasKode: "SBM", himpunan: "" },
  { kode: "293", nama: "Pascasarjana", fakultasKode: "SBM", himpunan: "" },
  { kode: "390", nama: "Pascasarjana", fakultasKode: "SBM", himpunan: "" },
  
  // SPS
  { kode: "287", nama: "Pascasarjana", fakultasKode: "SPS", himpunan: "" },
  { kode: "387", nama: "Pascasarjana", fakultasKode: "SPS", himpunan: "" },
];