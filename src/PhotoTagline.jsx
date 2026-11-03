import './PhotoTagline.css'

/* Tulisan putih yang melayang di atas foto tim, dengan efek parallax saat discroll.
   Dipasang di dalam <section className="car-wrap">. */
export default function PhotoTagline() {
  return (
    <div className="tagline">
      <p>
        <strong>#AlwaysEnergized</strong>
        <span className="bar" aria-hidden="true">
          |
        </span>
        Engineering Indonesia&apos;s future in Formula Student electric vehicle innovation.
      </p>
    </div>
  )
}