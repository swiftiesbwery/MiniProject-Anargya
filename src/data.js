/* Semua isi teks halaman ada di sini. Ubah di file ini, tidak perlu menyentuh
   komponen. Sumber: ITS News (its.ac.id/news) dan situs resmi Anargya. */

import fsjPhoto from './assets/fsj.jpg'
import giiasPhoto from './assets/giias.jpg'
import plnPhoto from './assets/plnice.jpg'
import hofPhoto from './assets/hof.jpg'

export const LINKS = {
  site: 'https://www.anargyaits.com/',
  news: 'https://www.its.ac.id/news/',
  address: 'Jl. Teknik Sipil No. 2, Keputih, Kec. Sukolilo, Kota Surabaya, Jawa Timur 60111',
}

const ITS = 'https://www.its.ac.id/news/wp-content/uploads/sites/2'

/* ---------- ABOUT ---------- */
export const ABOUT = {
  eyebrow: 'Pit stop · About',
  title: ['Ride the', 'infinity.'],
  paragraphs: [
    'Anargya ITS Formula EV Team is one of the car research teams from Sepuluh Nopember Institute of Technology (ITS), founded in September 2018 and part of ITS PUI-SKO.',
    'The team focuses on research in electric car technologies, especially electric formula cars and autonomous vehicles. Students from Electrical Engineering all the way to Business Administration work together in divisions to design, build and race a single-seat electric car.',
    '"Anargya" comes from Sanskrit and means infinite value, a promise to keep levelling up electric vehicles, to infinity and beyond.',
  ],
  photo: {
    src: `${ITS}/2026/08/WhatsApp-Image-2026-08-11-at-18.59.36-1.jpeg`,
    alt: 'Anargya ITS EV Team on the circuit at FSAE Japan 2026',
    caption: 'FSAE Japan 2026 · Aichi Sky Expo',
  },
}

export const STATS = [
  { value: '2018', label: 'Founded in Surabaya' },
  { value: '6', label: 'Formula EV generations' },
  { value: '3', label: 'Awards at FSAE Japan 2026' },
]

/* ---------- SLIDER (Formula Student Japan, GIIAS, PLN-ICE) ----------
   Geser otomatis ke samping. Tambah/kurangi slide dengan menambah/menghapus
   satu blok { ... } di bawah. Ganti foto dengan menimpa file di src/assets/
   (fsj.jpg, giias.jpg, plnice.jpg). logos: isi dengan import PNG kalau perlu. */
export const SLIDER_INTERVAL = 4000 // milidetik

export const SLIDES = [
  {
    title: 'Formula Student Japan',
    text: 'Formula Student Japan is an international student competition where teams design, build, and race formula-style cars. It evaluates performance, engineering design, cost, and business presentation.',
    photo: fsjPhoto,
    alt: 'Anargya ITS EV Team at Formula Student Japan',
    logos: [],
  },
  {
    title: 'GIIAS',
    text: 'GIIAS, the Gaikindo Indonesia International Auto Show, is one of the largest automotive exhibitions in Indonesia, bringing together manufacturers, new vehicles, and the latest mobility technology in front of the public.',
    photo: giiasPhoto,
    alt: 'Anargya ITS EV Team at GIIAS',
    logos: [],
  },
  {
    title: 'PLN-ICE',
    text: 'PLN Innovation & Competition in Electricity (PLN ICE) is a national competition organised by PLN to gather innovation ideas in electricity and electric vehicles from universities across Indonesia. In 2022 the Anargya team won first place with Thevin EV, an old petrol motorcycle restored and converted into a road-worthy electric motorcycle.',
    photo: plnPhoto,
    alt: 'Anargya ITS EV Team at PLN-ICE',
    logos: [],
  },
]

/* ---------- NEWS (urut dari yang terbaru) ---------- */
export const NEWS = [
  {
    date: '12 Aug 2026',
    tag: 'FSAE Japan 2026',
    title: 'Spectacular, ITS Anargya Team Wins Three Titles at FSAE Japan',
    excerpt:
      'With the Mark 6.0, the team took 1st place in the Three-View Drawing Awards (EV) and 2nd place in both the MathWorks Modeling Awards (EV) and the PR Awards.',
    image: `${ITS}/2026/08/WhatsApp-Image-2026-08-11-at-18.59.35.jpeg`,
    url: 'https://www.its.ac.id/news/en/spectacular-its-anargya-team-wins-three-titles-at-fsae-japan/',
  },
  {
    date: '30 Nov 2025',
    tag: 'Car launch',
    title: 'Introducing a New Racing Car, the ITS Anargya Team is Optimistic About Winning in Australia',
    excerpt:
      'The Mark 5.0 was launched at the ITS Research Center Building, ready for FSAE Australasia 2025 at Calder Park Raceway.',
    image: `${ITS}/2025/11/Mechanical-Manager-Tim-Anargya-ITS-Brilliant-Arozaq-saat-menjelaskan-bodi-mobil-Anargya-Formula-EV-Mark-5.0-beserta-spesifikasi-lainnya.jpg`,
    url: 'https://www.its.ac.id/news/en/introducing-a-new-racing-car-the-its-anargya-team-is-optimistic-about-winning-in-australia/',
  },
  {
    date: 'Feb 2025',
    tag: 'IIMS 2025',
    title: 'Tim Anargya Pamerkan Mobil Generasi Pertama di IIMS 2025',
    excerpt:
      'The first-generation Mark 1.0 was displayed at the Indonesia International Motor Show, with a Formula 1 simulator built inside its chassis.',
    image: `${ITS}/2025/02/WhatsApp-Image-2025-02-24-at-15.12.58_7b2c9d0b-scaled.jpg`,
    url: 'https://www.its.ac.id/news/tim-anargya-pamerkan-mobil-generasi-pertama-di-iims-2025/',
  },
  {
    date: '18 Sep 2024',
    tag: 'FSAE Japan 2024',
    title: 'ITS Anargya Team Defends Title at FSAE Japan 2024',
    excerpt:
      'Third place in the Presentation Event and a Top 10 finish in the EV class, as the only Indonesian entry among 75 teams.',
    image: `${ITS}/2024/09/Tim-Anargya-ITS-yang-sukses-meraih-juara-III-cabang-lomba-Presentation-Event-dan-Top-10-untuk-kelas-EV-pada-FSAE-Japan-2024.jpg`,
    url: 'https://www.its.ac.id/news/en/its-anargya-team-defends-title-at-fsae-japan-2024/',
  },
  {
    date: '20 Aug 2024',
    tag: 'Car launch',
    title: 'ITS Anargya Team Ready to Achieve Greatness in Japan',
    excerpt:
      'The Mark 4.0 was unveiled at Balai Pemuda, Surabaya, before shipping out to Aichi for its third international FSAE appearance.',
    image: `${ITS}/2024/08/Mobil-Anargya-Formula-EV-Mark-4.0-yang-akan-berlaga-pada-Formula-Society-of-Automotive-Engineers-FSAE-Japan-2024.jpg`,
    url: 'https://www.its.ac.id/news/en/its-anargya-team-ready-to-achieve-greatness-in-japan/',
  },
  {
    date: '9 Jun 2022',
    tag: 'Formula-E Jakarta',
    title: 'ITS Anargya Carves Achievements at the Jakarta 2022 Formula-E Event',
    excerpt:
      'Runner-up in a sustainable electric vehicle design competition with the Faratz EV, an urban electric car concept.',
    image: `${ITS}/2022/06/Tim-Anargya-ITS-terdiri-atas-dari-kiri-Sultan-Achmad-Hidayatulloh-Muhammad-Nizaar-Musyaffa-Febrian-Dwi-Saputra-dan-Hamzah-Nur-Azzam-yang-raih-prestasi-di-Formula-E-Jakarta-2022.jpeg`,
    url: 'https://www.its.ac.id/news/en/its-anargya-carves-achievements-at-the-jakarta-2022-formula-e-event/',
  },
]

/* ---------- CARS ---------- */

/* Mark 6.0 dan Mark 5.0: ada foto dan detail */
export const CARS = [
  {
    id: 'mark6',
    name: 'Mark 6.0',
    badge: 'Latest · 2026',
    number: '21',
    blurb:
      'The newest generation of the Anargya electric formula car, built with a more mature approach to design and modelling. It raced at the 24th Formula SAE Japan in August 2026 and came home with three awards.',
    specs: [
      ['Generation', 'Sixth Anargya Formula EV'],
      ['Race number', 'E21'],
      ['Competed at', 'FSAE Japan 2026, Aichi Sky Expo'],
      ['Technical specs', 'Not published yet'],
    ],
    highlights: [
      '1st · Three-View Drawing (EV)',
      '2nd · MathWorks Modeling (EV)',
      '2nd · PR Award',
    ],
    photos: [
      {
        src: `${ITS}/2026/08/WhatsApp-Image-2026-08-11-at-18.59.35-1.jpeg`,
        alt: 'The team preparing the Mark 6.0 before the race',
      },
      {
        src: `${ITS}/2026/08/WhatsApp-Image-2026-08-11-at-18.59.36.jpeg`,
        alt: 'Explaining the Mark 6.0 to an FSAE Japan judge',
      },
      {
        src: `${ITS}/2026/08/WhatsApp-Image-2026-08-11-at-18.59.36-1.jpeg`,
        alt: 'The team on the circuit at Aichi Sky Expo',
      },
    ],
    source: 'https://www.its.ac.id/news/en/spectacular-its-anargya-team-wins-three-titles-at-fsae-japan/',
  },
  {
    id: 'mark5',
    name: 'Mark 5.0',
    badge: 'Launched Nov 2025',
    number: '05',
    blurb:
      'Launched on 28 November 2025 with the latest development in its electrical components, mainly the powertrain. Side wings add downforce and cornering stability. It was built for FSAE Australasia 2025.',
    specs: [
      ['Weight', '271 kg'],
      ['Motor', 'Emrax 208 Medium Voltage, 80 kW'],
      ['Battery', 'High-performance lithium-ion'],
      ['Top speed', 'Up to 94 km/h'],
      ['Dimensions', '3,503 × 1,465 × 1,283 mm'],
      ['Chassis', 'Tubular space frame, JIS STKM 13B carbon steel'],
      ['Body', 'Fiberglass composite, Nomex honeycomb core'],
      ['Competed at', 'FSAE Australasia 2025, Calder Park Raceway'],
    ],
    highlights: ['Side wings for downforce', 'Powertrain upgrade', 'Wet lay-up body'],
    photos: [
      {
        src: `${ITS}/2025/11/Mechanical-Manager-Tim-Anargya-ITS-Brilliant-Arozaq-saat-menjelaskan-bodi-mobil-Anargya-Formula-EV-Mark-5.0-beserta-spesifikasi-lainnya.jpg`,
        alt: 'Mechanical manager explaining the body of the Mark 5.0',
      },
      {
        src: `${ITS}/2025/11/Tampilan-mobil-Anargya-Formula-EV-Mark-5.0-dari-Tim-Anargya-ITS-yang-akan-berlaga-pada-ajang-Formula-Society-of-Automotive-Engineers-FSAE-Australasia-2025.jpg`,
        alt: 'The Anargya Formula EV Mark 5.0',
      },
    ],
    source: 'https://www.its.ac.id/news/en/introducing-a-new-racing-car-the-its-anargya-team-is-optimistic-about-winning-in-australia/',
  },
]

/* Mark 1.0 sampai 4.0: cukup definisi */
export const LEGACY = [
  {
    name: 'Mark 1.0',
    year: '2019',
    text: 'The first generation. A carbon fibre monocoque, about 2.9 m long and 1.5 m wide, that took the team to Student Formula Japan 2019. It later returned as a milestone on display at IIMS 2025.',
  },
  {
    name: 'Mark 2.0',
    year: '2021',
    text: 'Cheaper to build and quicker on track. Added a bigger high-voltage system, a compact radiator, a driver display, radio telemetry and an automatic shutdown when something goes wrong.',
  },
  {
    name: 'Mark 3.0',
    year: '2023',
    text: 'Battery capacity grew from 6 to 7.46 kWh, air cooling was routed through the sidepods and a diffuser was added for stability. Raced at FSAE Japan 2023 as the only Indonesian team.',
  },
  {
    name: 'Mark 4.0',
    year: '2024',
    text: 'A 287 kg car with a tubular space frame and a 90 km/h top speed. New suspension and steering geometry, Peltier cooling and an active cooling fan. Third in Presentation and Top 10 in EV at FSAE Japan 2024.',
  },
]

/* ---------- HALL OF FAME ----------
   Foto hero "Podium Finishers": src/assets/hof.jpg
   Foto samar di belakang daftar lencana: src/assets/hof-bg.jpg (dipakai di sections.css)
   Tiap prestasi = satu baris. tone: 'gold' (hijau) untuk juara 1 / Winner,
   'silver' (krem) untuk yang lain. Tambah baris baru kapan saja. */
export const HOF_PHOTO = hofPhoto

export const HOF_SUB = 'Awards collected at FSAE Japan, Formula Bharat Pi-EV, and the competitions in between.'

export const HOF = [
  { place: '1st', title: 'Three-View Drawing Awards (EV)', event: 'FSAE Japan 2026', tone: 'gold' },
  { place: '2nd', title: 'MathWorks Modelling Awards (EV)', event: 'FSAE Japan 2026', tone: 'silver' },
  { place: '2nd', title: 'PR Awards', event: 'FSAE Japan 2026', tone: 'silver' },
  { place: 'Winner', title: 'PR Awards', event: 'FSAE Japan 2025', tone: 'gold' },
  { place: '2nd', title: 'Presentation Event', event: 'FSAE Japan 2025', tone: 'silver' },
  { place: '1st', title: 'Overall Winner', event: 'Pi-EV 2024', tone: 'gold' },
  { place: '1st', title: 'South East Asian Team Ranking', event: 'FSAE Japan 2024', tone: 'gold' },
  { place: '2nd', title: 'EV Class Ranking (Overseas Team)', event: 'FSAE Japan 2024', tone: 'silver' },
  { place: '3rd', title: 'Presentation Event', event: 'FSAE Japan 2024', tone: 'silver' },
  { place: '2nd', title: 'EV Class Ranking (Overseas Team)', event: 'FSAE Japan 2023', tone: 'silver' },
  { place: '3rd', title: 'Presentation Event', event: 'FSAE Japan 2023', tone: 'silver' },
  { place: '3rd', title: 'Best Vehicle Drawing', event: 'FSAE Japan 2023', tone: 'silver' },
  { place: '7th', title: 'EV Class Ranking (Overseas Team)', event: 'FSAE Japan 2023', tone: 'silver' },
]