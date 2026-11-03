import mark6 from './assets/mark6.png'
import './mark6.css'

/* MARK 6.0 section. Place in Sections.jsx, after <NavBar /> and before <PhotoGallery /> */

const DOCK = [
  {
    href: '#cars',
    title: 'Our Car',
    sub: 'Mark 1 – 6.0',
    icon: 'M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11h1a1 1 0 0 1 1 1v5h-2.1a2.5 2.5 0 0 1-4.8 0H9a2.5 2.5 0 0 1-4.8 0H3v-5a1 1 0 0 1 1-1h1Zm2.2 0h9.6l-1.1-3H8.3L7.2 11ZM6.5 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm11 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  },
  {
    href: '#podium',
    title: 'Achievements',
    sub: 'View all',
    icon: 'M6 3h12v2h3v3a4 4 0 0 1-4 4h-.4A6 6 0 0 1 13 15.9V18h3v3H8v-3h3v-2.1A6 6 0 0 1 7.4 12H7a4 4 0 0 1-4-4V5h3V3Zm0 4H5v1a2 2 0 0 0 1 1.7V7Zm12 0v2.7A2 2 0 0 0 19 8V7h-1Z',
  },
  {
    href: '#news',
    title: 'News',
    sub: 'Latest updates',
    icon: 'M4 4h13a1 1 0 0 1 1 1v3h2a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1Zm2 3v10a1 1 0 0 0 1 1h9V6H6Zm2 2h6v2H8V9Zm0 4h6v2H8v-2Zm10-3v7a.5.5 0 0 0 1 0v-7h-1Z',
  },
]

export default function Mark6() {
  return (
    <section id="mark6" className="m6">
      <div className="m6-copy">
        <h2 className="m6-title">MARK 6.0</h2>
        <p>
          MARK 6.0 is the sixth generation of our race car. Redesigned from the body to the
          powertrain to be lighter, faster, and more efficient on the competition track.
        </p>
        <a className="m6-btn" href="#cars">
          <span aria-hidden="true">→</span>
          <b>Explore</b>
        </a>
      </div>

      <div className="m6-stage">
        <div className="m6-blob" />
        <img className="m6-car" src={mark6} alt="MARK 6.0 race car" />
      </div>

      <div className="m6-dock">
        {DOCK.map((d) => (
          <a key={d.title} href={d.href}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={d.icon} />
            </svg>
            <strong>{d.title}</strong>
            <small>{d.sub}</small>
          </a>
        ))}
      </div>
    </section>
  )
}