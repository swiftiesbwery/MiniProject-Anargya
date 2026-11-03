import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import car from './assets/car.jpg'
import Sections from './Sections'
import FsaejBanner from './FsaejBanner'
import PhotoTagline from './PhotoTagline'
import AboutPage from './AboutPage'
import ShopPage from './ShopPage'
import AdminPage from './AdminPage'
import './green.css' /* harus paling akhir */

/* Waktu (ms). Ubah di sini kalau mau lebih cepat atau lambat. */
const LINE_DELAY = 1000 // garis mulai berjalan setelah tulisan muncul
const LINE_MS = 4000 // lama garis berjalan (sebelumnya 7000)
const RISE_AT = LINE_DELAY + LINE_MS // pintu mulai naik
const OPEN_AT = RISE_AT + 1800 // pintu mulai melebar (setelah sempat diam sebentar)
const DONE_AT = OPEN_AT + 3300 // selesai (tunggu tulisan selesai naik), scroll dibuka

/* Parallax saat scroll (seperti web referensi).
   Foto/langit digeser pelan (PAN_RATE x kecepatan scroll), sedangkan tulisan
   naik lebih cepat (TEXT_RATE x). SMOOTH: makin kecil makin "licin" dan lambat
   menyusul (0.05 - 0.2). */
const PAN_RATE = 0.65
const TEXT_RATE = 1.5
const SMOOTH = 0.09

/* Intro (garis + pintu) hanya diputar sekali per kali halaman dibuka.
   Kalau kembali dari halaman About, langsung tampil tanpa intro. */
let introPlayed = false

function Wordmark({ its = true }) {
  return (
    <h1 className="wordmark">
      <span className="mask">
        <span className="up up1">
          <span className="slant">A</span>NARGY<span className="slant">A</span>
        </span>
      </span>
      {its && (
        <span className="mask its">
          <span className="up up2">ITS</span>
        </span>
      )}
    </h1>
  )
}

function Stage() {
  return (
    <div className="stage">
      <span className="side left">Formula</span>
      <Wordmark />
      <span className="side right">EV Team</span>
    </div>
  )
}

/* Tampilan halaman langit: tulisan besar di atas, "ITS Formula" dan "EV Team"
   di baris bawah (seperti "A place ... to return to" di referensi) */
function HeroStage() {
  return (
    <div className="hero-stage">
      <div className="title-block">
        <Wordmark its={false} />
        <div className="tags">
          <span className="side tag">ITS Formula</span>
          <span className="side tag">EV Team</span>
        </div>
      </div>
    </div>
  )
}

/* Isi pintu lengkung = halaman langit (tanpa logo) */
function SkyContent() {
  return <HeroStage />
}

/* Halaman utama (langit, foto, dan semua section) */
function Home() {
  // wait -> rising -> opening -> done
  // (jangan pakai nama 'loading': bentrok dengan class .loading di CSS)
  const [phase, setPhase] = useState(introPlayed ? 'done' : 'wait')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo(0, 0)
    if (introPlayed) return // sudah pernah diputar, langsung tampil

    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      introPlayed = true
      setPhase('done')
    }

    const timers = reduce
      ? [setTimeout(finish, 1200)]
      : [
          setTimeout(() => setPhase('rising'), RISE_AT),
          setTimeout(() => setPhase('opening'), OPEN_AT),
          setTimeout(finish, DONE_AT),
        ]

    return () => {
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase === 'done') document.documentElement.style.overflow = ''
  }, [phase])

  // ---- parallax scroll ----
  const sceneRef = useRef(null)
  const panRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    const pan = panRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cur = 0
    let max = 0
    let raf = 0

    // panjang area scroll = satu layar + jarak geser dibagi kecepatan geser
    const measure = () => {
      const vh = window.innerHeight
      const extra = Math.max(0, pan.offsetHeight - vh)
      max = extra / PAN_RATE
      scene.style.height = `${vh + max}px`
      scene.style.setProperty('--pan', PAN_RATE)
      scene.style.setProperty('--max', max.toFixed(2))
      scene.style.setProperty('--text', TEXT_RATE - PAN_RATE)
      tick()
    }

    const tick = () => {
      const target = Math.min(Math.max(window.scrollY, 0), max)
      cur = reduce ? target : cur + (target - cur) * SMOOTH
      if (Math.abs(target - cur) < 0.05) cur = target
      scene.style.setProperty('--s', cur.toFixed(2))
      raf = cur === target ? 0 : requestAnimationFrame(tick)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    measure()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(pan)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      {phase !== 'done' && (
        <div className="intro" aria-hidden="true">
          {/* 1. Layar hitam dengan garis yang berjalan */}
          <div className={`loader ${phase}`}>
            <img className="logo" src={logo} alt="" />
            <Stage />
            <div className="loading-wrap">
              <div className="loading">
                <div className="track">
                  <div
                    className="fill"
                    style={{
                      animationDuration: `${LINE_MS}ms`,
                      animationDelay: `${LINE_DELAY}ms`,
                    }}
                  />
                </div>
                <p className="caption">
                  Anargya ITS EV Team
                  <br />
                  Always energize.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Pintu lengkung: naik dari bawah, lalu melebar */}
          <div className={`arch ${phase}`}>
            <div className="sky in-arch">
              <SkyContent />
            </div>
          </div>
        </div>
      )}

      <main>
        {/* scene: area scroll. pin: menempel di layar selama scene discroll.
            pan: langit + foto yang bergeser pelan ke atas */}
        <div className="scene" ref={sceneRef}>
          <div className="pin">
            <div className="pan" ref={panRef}>
              {/* Langit: satu layar penuh, tulisan ikut naik saat discroll */}
              <section className="sky">
                <HeroStage />
              </section>

              {/* Foto, menyambung dengan langit di atasnya */}
              <section className="car-wrap">
                <img className="car" src={car} alt="Tim Anargya bersama mobil formula" />
                {/* Tulisan #AlwaysEnergized melayang di atas foto */}
                <PhotoTagline />
              </section>
            </div>

            {/* Banner "We're competing back at FSAE-J": melayang di tengah layar,
                naik mengikuti scroll (di luar .pan supaya posisinya pas di layar) */}
            <FsaejBanner />
          </div>
        </div>

        {/* About, News, Cars, footer: halaman informasi di bawah foto */}
        <Sections />
      </main>
    </>
  )
}

/* Pengatur halaman sederhana lewat hash di alamat:
   #/about = halaman About, #/shop = halaman Shop, selain itu = halaman utama */
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === '#/about') return <AboutPage />
  if (route === '#/shop') return <ShopPage />
  if (route === '#/admin') return <AdminPage />
  return <Home />
}