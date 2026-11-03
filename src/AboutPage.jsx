import { useEffect, useRef } from 'react'
import logo from './assets/logo.png'
import { ABOUT, LINKS, STATS } from './data'
import './about-page.css'

const FACTS = [
  ['Founded', '2018'],
  ['Home', 'ITS Surabaya'],
  ['Tagline', '#AlwaysEnergized'],
]

const HISTORY = [
  {
    year: '2018',
    tag: 'Founded',
    title: 'The team is founded',
    text: 'Anargya starts as a student research team at Institut Teknologi Sepuluh Nopember (ITS) Surabaya, under PUI-SKO, the Center of Excellence for Automotive Control Systems, with one goal: to design, build, and race electric formula cars.',
  },
  {
    year: '2019',
    tag: 'Mark 1.0',
    title: 'The first car and the first race',
    text: 'The first Anargya Formula EV, Mark 1.0, was launched at the ITS Rectorate with a 72 kW motor and a control system from ITS research. It then went to Student Formula Japan and finished 10th best EV at FSAE Japan 2019.',
  },
  {
    year: '2021',
    tag: 'Mark 2.0',
    title: 'A second generation',
    text: 'In November 2021 ITS grand-launched Mark 2.0 at Graha Sepuluh Nopember, aimed at FSAE Japan 2022 with a tubular frame, better motor and battery efficiency, and a more aerodynamic body.',
  },
  {
    year: '2023',
    tag: 'Mark 3.0',
    title: 'On the podium in Japan',
    text: 'Racing Mark 3.0 with a battery raised to 7.46 kWh, the team came home from FSAE Japan 2023 with 3rd place in the Presentation Event and 3rd for Best Vehicle Drawing.',
  },
  {
    year: '2024',
    tag: 'Mark 4.0',
    title: 'The breakthrough year',
    hl: true,
    text: 'Mark 4.0 was launched in Surabaya on 20 August 2024. The team then ranked 1st among South East Asian teams at FSAE Japan 2024, took 2nd in the EV class among overseas teams and 3rd in the Presentation Event, and won Overall at Formula Bharat Pi-EV 2024.',
  },
  {
    year: '2025',
    tag: 'Mark 5.0',
    title: 'Going international',
    text: 'At FSAE Japan 2025 the team won the PR Awards and placed 2nd in the Presentation Event. On 28 November 2025 it launched Mark 5.0, with an upgraded powertrain, to race at Calder Park Raceway in Australia.',
  },
  {
    year: '2026',
    tag: 'Mark 6.0',
    title: 'Three titles in Aichi',
    hl: true,
    text: 'Mark 6.0 had its grand launch on 26 June 2026 and debuted at FSAE Japan 2026 at Aichi Sky Expo, winning 1st in Three-View Drawing (EV), 2nd in MathWorks Modelling (EV), and 2nd in the PR Awards.',
  },
]

/* Halaman About sendiri, dibuka lewat #/about (tombol di home dan navbar About) */
export default function AboutPage() {
  const root = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const prevTitle = document.title
    document.title = 'About | Anargya ITS EV Team'

    /* elemen .reveal memudar masuk saat discroll, sama seperti di home */
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { threshold: 0.12 },
    )
    root.current.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      document.title = prevTitle
    }
  }, [])

  const toContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sections apage" ref={root}>
      <header className="nav show">
        <a className="nav-logo" href="#/" aria-label="Back to home">
          <img src={logo} alt="Anargya" />
        </a>
        <nav>
          <a href="#/">Home</a>
          <a href="#/about" aria-current="page">
            About
          </a>
          <a className="nav-cta" href="#/about" onClick={toContact}>
            Contact
          </a>
        </nav>
      </header>

      {/* ---------- pembuka ---------- */}
      <section className="wrap apage-hero">
        <div className="heading reveal">
          <span className="eyebrow">About</span>
          <h2>
            {ABOUT.title[0]} <em>{ABOUT.title[1]}</em>
          </h2>
        </div>
        <p className="apage-lead reveal">
          #AlwaysEnergized | Engineering Indonesia&apos;s future in Formula Student electric vehicle innovation.
        </p>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- siapa kami ---------- */}
      <section className="wrap apage-who">
        <div className="heading reveal">
          <span className="eyebrow">Who we are</span>
          <h2>
            Who we <em>are.</em>
          </h2>
        </div>
        <div>
          <p className="lead reveal">
            Anargya is a student research team at Institut Teknologi Sepuluh Nopember (ITS) Surabaya, under PUI-SKO,
            the Center of Excellence for Automotive Control Systems. The team designs and builds electric formula race
            cars and competes with them internationally.
          </p>
          <p className="lead reveal">
            Members come from many ITS departments, working across mechanical, electrical, and non-technical divisions
            to turn a design into a race car.
          </p>
          <dl className="facts">
            {FACTS.map(([k, v]) => (
              <div className="reveal" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- sejarah ---------- */}
      <section className="wrap apage-history">
        <div className="heading reveal">
          <span className="eyebrow">Our history</span>
          <h2>
            One car at a <em>time.</em>
          </h2>
        </div>
        <p className="lead reveal">
          Since 2018, Anargya has grown from a small student research team at ITS into a regular competitor at FSAE
          Japan, FSAE Australasia, and Formula Bharat.
        </p>
        <div className="hist">
          {HISTORY.map((h) => (
            <article className={`hist-row ${h.hl ? 'hl' : ''} reveal`} key={h.year}>
              <span className="hist-year">{h.year}</span>
              <div className="hist-body">
                <span className="tag">{h.tag}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="btn reveal" href="#/">
          ← Back to home
        </a>
      </section>

      {/* ---------- footer / kontak ---------- */}
      <footer id="contact" className="footer">
        <div className="wrap">
          <div className="footer-top reveal">
            <p className="footer-tag">
              We level up electric vehicles
              <br />
              to infinity and beyond.
            </p>
            <nav className="footer-links">
              <a href="#/">Home</a>
              <a href="#/about">About</a>
              <a href="mailto:anargya.its@gmail.com">anargya.its@gmail.com</a>
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
    </div>
  )
}