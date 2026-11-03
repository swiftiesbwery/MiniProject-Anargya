import './Sponsors.css'

/* Ambil semua logo di src/assets/sponsors/ otomatis, urut sesuai nama file */
const files = import.meta.glob('./assets/sponsors/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const logos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop().replace(/^\d+-/, '').replace(/\.\w+$/, ''),
  }))

/* Jumlah logo per tier (total 26). Ubah angkanya kalau mau. */
const TIERS = [6, 9, 11]

function splitTiers(list) {
  let i = 0
  return TIERS.map((n) => {
    const row = list.slice(i, i + n)
    i += n
    return row
  }).filter((row) => row.length)
}

export default function Sponsors() {
  const tiers = splitTiers(logos)

  return (
    <section className="sponsors" id="sponsors">
      <h2 className="sponsors-title reveal">Our Sponsors</h2>
      <p className="sponsors-sub reveal">
        Thank you for powering our journey. Always energize.
      </p>

      {tiers.map((row, t) => (
        <div className={`sponsor-tier tier-${t + 1} reveal`} key={t}>
          {row.map((logo) => (
            <div className="sponsor-item" key={logo.src}>
              <img src={logo.src} alt={logo.name} loading="lazy" />
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}