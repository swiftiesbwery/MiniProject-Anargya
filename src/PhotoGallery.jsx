import { useState } from 'react'
import './PhotoGallery.css'

/* Judul yang melayang di tengah galeri. Ubah di sini. */
const GALLERY_TITLE = 'Always Energized'

/* Ambil semua foto di src/assets/gallery/ otomatis, urut sesuai nama file
   (1.jpg, 2.jpg, ... 10.jpg). Jumlah foto bebas, disarankan ganjil (5, 7, 9). */
const files = import.meta.glob('./assets/gallery/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const FOUND = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src)

/* Kalau folder masih kosong, tampil kotak abu sebagai pengganti */
const PHOTOS = FOUND.length >= 2 ? FOUND : Array.from({ length: 7 }, () => null)
const FALLBACK = 'linear-gradient(160deg, #9ca3af, #374151)'

const MAX_Z = 9 // harus sama dengan --max-z di PhotoGallery.css

export default function PhotoGallery() {
  const [p, setP] = useState(0) // foto yang di-hover (mulai 1), 0 = tidak ada
  const [z, setZ] = useState(1) // zona di dalam foto (1..MAX_Z)
  const [pressed, setPressed] = useState(false)

  const track = (clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY)?.closest('[data-index]')
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = (clientX - rect.left) / rect.width
    setP(Number(el.dataset.index) + 1)
    setZ(Math.min(MAX_Z, Math.max(1, Math.floor(ratio * MAX_Z) + 1)))
  }

  const reset = () => {
    setP(0)
    setPressed(false)
  }

  const style = { '--max-p': PHOTOS.length }
  if (p > 0) {
    style['--p'] = p
    style['--z'] = pressed ? (MAX_Z + 1) / 2 : z
  }

  return (
    <section className="pgal-section" id="gallery">
      <div className="pgal-wrap reveal">
        <div
          className={`pgal${pressed ? ' pressed' : ''}`}
          style={style}
          onPointerMove={(e) => track(e.clientX, e.clientY)}
          onPointerDown={(e) => {
            setPressed(true)
            track(e.clientX, e.clientY)
          }}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={reset}
          onPointerLeave={reset}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              data-index={i}
              className={`pgal-item${p === i + 1 ? ' hot' : ''}`}
              style={{ '--i': i }}
            >
              <div
                className="pgal-img"
                style={{ '--img': src ? `url('${src}')` : FALLBACK }}
              />
            </div>
          ))}
        </div>

        {/* di luar .pgal supaya tidak ikut efek 3D */}
        <h2 className="pgal-title">{GALLERY_TITLE}</h2>
      </div>
    </section>
  )
}