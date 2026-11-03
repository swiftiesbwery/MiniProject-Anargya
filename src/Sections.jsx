import { useEffect, useMemo, useRef, useState } from 'react'
import logo from './assets/logo.png'
import { ABOUT, CARS, HOF, HOF_PHOTO, LEGACY, LINKS, NEWS, SLIDER_INTERVAL, SLIDES, STATS } from './data'
import mark6 from './assets/mark6.png'
import mark5 from './assets/mark5.png'
import './sections.css'
import './carstage.css'
import Sponsors from './Sponsors'
import PhotoGallery from './PhotoGallery'

/* ---------- bagian kecil yang dipakai bersama ---------- */

/* Semua elemen .reveal memudar masuk saat discroll dan memudar lagi saat keluar */
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting))
      },
      { threshold: 0.12 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

/* Foto dari ITS News. Kalau gagal dimuat, tampil kotak pengganti bergambar logo. */
function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`photo photo-fallback ${className}`} role="img" aria-label={alt}>
        <img src={logo} alt="" />
      </div>
    )
  }
  return (
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

function Heading({ eyebrow, children }) {
  return (
    <div className="heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  )
}

/* ---------- navigasi: muncul setelah halaman langit ---------- */

function NavBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${show ? 'show' : ''}`}>
      <a className="nav-logo" href="#top" aria-label="Back to top">
        <img src={logo} alt="Anargya" />
      </a>
      <nav>
        <a href="#/about">About</a>
        <a href="#news">News</a>
        <a href="#cars">Cars</a>
        <a href="#/shop">Shop</a>
        <a className="nav-cta" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  )
}

/* ---------- ABOUT ---------- */

function About() {
  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <div>
          <Heading eyebrow="About">
            {ABOUT.title[0]} <em>{ABOUT.title[1]}</em>
          </Heading>
          {ABOUT.paragraphs.map((p) => (
            <p className="lead reveal" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat reveal" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <a className="btn reveal" href="#/about">
            More about us →
          </a>
        </div>
        <figure className="about-fig reveal">
          <Photo src={ABOUT.photo.src} alt={ABOUT.photo.alt} />
          <figcaption>{ABOUT.photo.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ---------- SLIDER: Formula Student Japan, GIIAS, PLN-ICE ---------- */

function Fsj() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  /* geser otomatis tiap beberapa detik; berhenti saat kursor di atas slider */
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), SLIDER_INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused])

  return (
    <section
      id="fsj"
      className="fsj"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="fsj-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {SLIDES.map((s) => (
          <div className="fsj-slide" key={s.title}>
            <img className="fsj-bg" src={s.photo} alt={s.alt} />
            <div className="wrap fsj-inner">
              <div className="fsj-text">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
              {s.logos.length > 0 && (
                <div className="fsj-logos">
                  {s.logos.map((l, k) => (
                    <img key={k} src={l} alt="" />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="fsj-dots">
        {SLIDES.map((s, k) => (
          <button
            key={s.title}
            type="button"
            className={k === i ? 'on' : ''}
            aria-label={`Slide ${k + 1}: ${s.title}`}
            onClick={() => setI(k)}
          />
        ))}
      </div>
    </section>
  )
}

/* ---------- NEWS ---------- */

function News() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const k = q.trim().toLowerCase()
    if (!k) return NEWS
    return NEWS.filter((n) => `${n.title} ${n.excerpt} ${n.tag} ${n.date}`.toLowerCase().includes(k))
  }, [q])

  return (
    <section id="news" className="news">
      <div className="wrap">
        <div className="news-head">
          <Heading eyebrow="Latest news">
            News from the <em>track.</em>
          </Heading>
          <label className="search reveal">
            <span className="sr">Search news</span>
            <input
              type="search"
              placeholder="Search news, e.g. Japan"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        {list.length === 0 ? (
          <p className="empty reveal">No race results for that search. Try another word!</p>
        ) : (
          <div className="news-grid">
            {list.map((n) => (
              <a className="card news-card reveal" key={n.url} href={n.url} target="_blank" rel="noreferrer">
                <div className="thumb">
                  <Photo src={n.image} alt={n.title} />
                </div>
                <div className="card-body">
                  <div className="meta">
                    <span className="tag">{n.tag}</span>
                    <time>{n.date}</time>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.excerpt}</p>
                  <span className="more">Read on ITS News ↗</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <a className="btn reveal" href={LINKS.news} target="_blank" rel="noreferrer">
          More on ITS News ↗
        </a>
      </div>
    </section>
  )
}

/* ---------- CARS ---------- */

/* Mobil yang tampil sebagai gambar melayang di atas blob (kunci = car.id, w = lebar gambar dalam %) */
const FLOATING = {
  mark6: { src: mark6, w: 112 },
  mark5: { src: mark5, w: 100 },
}

function CarFeature({ car, flip }) {
  const [main, ...rest] = car.photos
  const floating = FLOATING[car.id]
  return (
    <article className={`car-feature ${flip ? 'flip' : ''}`}>
      {floating ? (
        <div className="car-photos car-stage reveal" style={{ '--cs-w': `${floating.w}%` }}>
          <div className="cs-blob" aria-hidden="true" />
          <img className="cs-car" src={floating.src} alt={`${car.name} race car`} />
        </div>
      ) : (
        <div className="car-photos reveal">
          <Photo className="main-photo" src={main.src} alt={main.alt} />
          {rest.length > 0 && (
            <div className="thumbs">
              {rest.map((p) => (
                <Photo key={p.src} src={p.src} alt={p.alt} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="car-info reveal">
        <span className="tag">{car.badge}</span>
        <h3>{car.name}</h3>
        <p>{car.blurb}</p>
        <dl className="specs">
          {car.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="highlights">
          {car.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <a className="more" href={car.source} target="_blank" rel="noreferrer">
          Source: ITS News ↗
        </a>
      </div>
    </article>
  )
}

function Cars() {
  return (
    <section id="cars" className="cars">
      <div className="wrap">
        <Heading eyebrow="Cars">
          The <em>machines.</em>
        </Heading>
        {CARS.map((car, i) => (
          <CarFeature key={car.id} car={car} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="legacy">
        <div className="wrap">
          <Heading eyebrow="Earlier generations">
            Where it <em>started.</em>
          </Heading>
          <div className="legacy-grid">
            {LEGACY.map((m) => (
              <article className="stall reveal" key={m.name}>
                <div className="stall-head">
                  <h3>{m.name}</h3>
                  <span>{m.year}</span>
                </div>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- HALL OF FAME ---------- */

/* Bentuk daun salam persis dari kode asli: [cx, cy, rx, ry, rotasi] */
const LEAVES = [
  [78.5, 180.2, 4.4, 12.0, 133.0],
  [81.1, 170.5, 4.4, 12.0, 77.0],
  [60.5, 172.8, 4.3, 11.7, 146.5],
  [65.1, 164.3, 4.3, 11.7, 90.5],
  [44.7, 161.4, 4.2, 11.3, 160.0],
  [50.9, 154.5, 4.2, 11.3, 104.0],
  [32.0, 146.7, 4.0, 10.9, 173.5],
  [39.4, 141.6, 4.0, 10.9, 117.5],
  [23.2, 129.5, 3.9, 10.6, 187.0],
  [31.2, 126.4, 3.9, 10.6, 131.0],
  [18.6, 110.7, 3.8, 10.2, 200.5],
  [26.8, 109.6, 3.8, 10.2, 144.5],
  [18.5, 91.4, 3.7, 9.9, 214.0],
  [26.4, 92.3, 3.7, 9.9, 158.0],
  [22.9, 72.7, 3.6, 9.6, 227.5],
  [30.0, 75.2, 3.6, 9.6, 171.5],
  [31.6, 55.6, 3.4, 9.2, 241.0],
  [37.6, 59.5, 3.4, 9.2, 185.0],
  [44.0, 40.9, 3.3, 8.9, 254.5],
  [48.7, 45.9, 3.3, 8.9, 198.5],
  [59.4, 29.6, 3.2, 8.5, 268.0],
  [62.6, 35.3, 3.2, 8.5, 212.0],
]

/* satu cabang daun salam (cabang kiri) */
function Branch() {
  return (
    <g>
      <g fill="currentColor">
        {LEAVES.map(([cx, cy, rx, ry, r]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${r} ${cx} ${cy})`} />
        ))}
      </g>
      <path d="M80 176A78 78 0 0 1 61 34" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </g>
  )
}

/* karangan penuh untuk lencana: cabang kiri + cabang kanan (cermin) */
function Wreath() {
  return (
    <svg className="wreath" viewBox="0 0 200 200" aria-hidden="true">
      <Branch />
      <g transform="translate(200 0) scale(-1 1)">
        <Branch />
      </g>
    </svg>
  )
}

function HallOfFame() {
  return (
    <>
      <section id="podium" className="podium">
        <img className="podium-bg" src={HOF_PHOTO} alt="" />
        <div className="podium-inner">
          <svg className="podium-laurel" viewBox="4 20 92 175" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <Branch />
          </svg>
          <div className="podium-text reveal">
            <span className="podium-eyebrow">Home of the</span>
            <h2>
              Podium
              <br />
              Finishers
            </h2>
            <span className="podium-eyebrow">ITS Team Anargya</span>
          </div>
          <svg className="podium-laurel r" viewBox="4 20 92 175" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <Branch />
          </svg>
        </div>
        <a className="podium-cta" href="#hall-of-fame">
          Hall of Fame
        </a>
      </section>

      <section id="hall-of-fame" className="hof">
        <div className="badges">
          {HOF.map((h) => (
            <div className={`badge ${h.tone === 'gold' ? 'hl' : ''} reveal`} key={`${h.place}${h.title}${h.event}`}>
              <Wreath />
              <div className="badge-txt">
                <b className={h.place === 'Winner' ? 'w' : ''}>{h.place}</b>
                <strong>{h.title}</strong>
                <em>{h.event}</em>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="wrap">
        <div className="footer-top reveal">
          <p className="footer-tag">
            We level up electric vehicles
            <br />
            to infinity and beyond.
          </p>
          <nav className="footer-links">
            <a href="#/about">About</a>
            <a href="#news">News</a>
            <a href="#cars">Cars</a>
            <a href="#/shop">Shop</a>
            <a href={LINKS.site} target="_blank" rel="noreferrer">
              Official site ↗
            </a>
          </nav>
        </div>
        <div className="footer-meta reveal">
          <span>Copyright 2026 © Anargya ITS EV Team</span>
          <span>{LINKS.address}</span>
        </div>
        <div className="big-word reveal" aria-label="Anargya">
          <span className="slant">A</span>NARGY<span className="slant">A</span>
        </div>
      </div>
    </footer>
  )
}

/* ---------- semua bagian di bawah foto ---------- */

export default function Sections() {
  const root = useRef(null)
  useReveal(root)

  return (
    <div className="sections" ref={root}>
      <NavBar />
      <PhotoGallery />
      <About />
      <Fsj />
      <News />
      <Cars />
      <HallOfFame />
      <Sponsors />
      <Footer />
    </div>
  )
}