import './FsaejBanner.css'
import logo from './assets/fsaej-logo.png' // logo Formula SAE Japan (PNG transparan)

/* "We're competing back at FSAE-J 2026" melayang di tengah langit
   (di antara langit gelap dan muda). Dipasang di dalam <section className="sky">. */
export default function FsaejBanner() {
  return (
    <div className="fsaej">
      <p className="fsaej-kicker">We&apos;re competing back at</p>
      <img className="fsaej-logo" src={logo} alt="Formula SAE Japan" />
      <p className="fsaej-year">FSAE-J 2026</p>
    </div>
  )
}