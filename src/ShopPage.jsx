import { useCallback, useEffect, useState } from 'react'
import logo from './assets/logo.png'
import { configured, fetchProducts, loadCart, placeOrder, rupiah, saveCart } from './shopStore'
import './ShopPage.css'

/* Foto otomatis dari src/assets/shop/ (nama file = kolom "photo" di database) */
const files = import.meta.glob('./assets/shop/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const PHOTOS = Object.fromEntries(
  Object.entries(files).map(([path, src]) => [path.split('/').pop().replace(/\.\w+$/, ''), src]),
)

let toastTimer

const EMPTY_FORM = { name: '', phone: '', email: '', address: '', city: '', postal: '', note: '' }

function Img({ name, alt }) {
  const src = PHOTOS[name]
  return src ? (
    <img src={src} alt={alt} loading="lazy" />
  ) : (
    <div className="shop-ph" role="img" aria-label={alt}>
      <img src={logo} alt="" />
    </div>
  )
}

function ProductCard({ p, onAdd }) {
  const hasSizes = p.sizes.length > 0
  const [size, setSize] = useState('')
  const out = p.stock <= 0

  return (
    <article className="shop-card">
      <div className="shop-photo">
        <Img name={p.photo} alt={p.name} />
      </div>
      <div className="shop-body">
        <h3>{p.name}</h3>
        <p>{p.description}</p>

        {hasSizes && (
          <div className="shop-sizes" role="group" aria-label="Size">
            {p.sizes.map((s) => (
              <button key={s} type="button" className={s === size ? 'on' : ''} aria-pressed={s === size} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="shop-row">
          <b>{rupiah(p.price)}</b>
          <button className="shop-btn" type="button" disabled={out} onClick={() => onAdd(p, size)}>
            {out ? 'Sold out' : 'Add to cart'}
          </button>
        </div>
        {!out && p.stock <= 5 && <small className="shop-low">Only {p.stock} left</small>}
      </div>
    </article>
  )
}

function Giias({ items, onAdd }) {
  return (
    <section className="shop-giias" aria-labelledby="giias-title">
      <div className="shop-curb" aria-hidden="true" />
      <div className="shop-giias-inner">
        <div className="shop-giias-head">
          <h2 id="giias-title">GIIAS Merch</h2>
          <p>Available at our GIIAS booth and online while stocks last.</p>
        </div>

        <ul className="shop-collage">
          {items.map((g) => (
            <li key={g.id}>
              <div className="shop-tile">
                <Img name={g.photo} alt={g.name} />
              </div>
              <span>{g.name}</span>
              <b>{rupiah(g.price)}</b>
              <button className="shop-btn red small" type="button" disabled={g.stock <= 0} onClick={() => onAdd(g, '')}>
                {g.stock <= 0 ? 'Sold out' : 'Add to cart'}
              </button>
            </li>
          ))}
        </ul>

        <p className="shop-grab">Grab it Fast!</p>
      </div>
      <div className="shop-curb" aria-hidden="true" />
    </section>
  )
}

function CartDrawer({ open, lines, total, onClose, onQty, onCheckout }) {
  return (
    <>
      <div className={`shop-scrim${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`shop-drawer${open ? ' open' : ''}`} aria-label="Cart" aria-hidden={!open}>
        <div className="shop-drawer-head">
          <h3>Your cart</h3>
          <button type="button" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="shop-lines">
          {lines.length === 0 && <p className="shop-empty">Your cart is empty.</p>}
          {lines.map((l, i) => (
            <div className="shop-line" key={`${l.id}-${l.size}`}>
              <div className="shop-line-img"><Img name={l.p.photo} alt="" /></div>
              <div className="shop-line-main">
                <b>{l.p.name}</b>
                <span>{l.size ? `Size ${l.size} · ` : ''}{rupiah(l.p.price)}</span>
                <div className="shop-qty">
                  <button type="button" aria-label="Decrease" onClick={() => onQty(i, l.qty - 1)}>−</button>
                  <span>{l.qty}</span>
                  <button type="button" aria-label="Increase" disabled={l.qty >= l.p.stock} onClick={() => onQty(i, l.qty + 1)}>+</button>
                </div>
              </div>
              <div className="shop-line-end">
                <b>{rupiah(l.p.price * l.qty)}</b>
                <button type="button" onClick={() => onQty(i, 0)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="shop-drawer-foot">
          <div className="shop-sum"><span>Subtotal</span><b>{rupiah(total)}</b></div>
          <button className="shop-btn full" type="button" disabled={!lines.length} onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

function Checkout({ lines, total, onBack, onDone }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const items = lines.map((l) => ({ id: l.id, size: l.size, qty: l.qty }))
      const order = await placeOrder(form, items)
      onDone(order)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const field = (name, label, props = {}) => (
    <label>
      {label}
      <input name={name} value={form[name]} onChange={set} {...props} />
    </label>
  )

  return (
    <section className="shop-checkout">
      <button type="button" className="shop-back" onClick={onBack}>← Back to shop</button>
      <h1>Checkout</h1>

      <div className="shop-checkout-grid">
        <form onSubmit={submit} className="shop-form">
          {field('name', 'Full name', { required: true, autoComplete: 'name' })}
          {field('phone', 'WhatsApp number', { required: true, type: 'tel', autoComplete: 'tel', placeholder: '08xxxxxxxxxx' })}
          {field('email', 'Email', { required: true, type: 'email', autoComplete: 'email' })}
          {field('address', 'Address', { required: true, autoComplete: 'street-address' })}
          <div className="shop-two">
            {field('city', 'City', { required: true, autoComplete: 'address-level2' })}
            {field('postal', 'Postal code', { autoComplete: 'postal-code' })}
          </div>
          {field('note', 'Note (optional)')}
          {error && <p className="shop-error" role="alert">{error}</p>}
          <button className="shop-btn full" type="submit" disabled={busy}>
            {busy ? 'Placing order...' : `Place order · ${rupiah(total)}`}
          </button>
          <p className="shop-fine">After you order, we contact you on WhatsApp with payment and shipping details.</p>
        </form>

        <aside className="shop-summary">
          <h3>Order summary</h3>
          {lines.map((l) => (
            <div className="shop-sum" key={`${l.id}-${l.size}`}>
              <span>{l.qty} × {l.p.name}{l.size ? ` (${l.size})` : ''}</span>
              <b>{rupiah(l.p.price * l.qty)}</b>
            </div>
          ))}
          <div className="shop-sum total"><span>Total</span><b>{rupiah(total)}</b></div>
        </aside>
      </div>
    </section>
  )
}

function Thanks({ order, onBack }) {
  return (
    <section className="shop-thanks">
      <div className="shop-check" aria-hidden="true">✓</div>
      <h1>Thank you for your order!</h1>
      <p>
        Your order code is <b>{order.code}</b>. We have received it and will contact you on WhatsApp
        with payment and shipping details shortly.
      </p>
      <p className="shop-thanks-total">Total: <b>{rupiah(order.total)}</b></p>
      <button type="button" className="shop-btn" onClick={onBack}>Back to shop</button>
    </section>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState(configured ? 'loading' : 'config')
  const [cart, setCart] = useState(loadCart)
  const [drawer, setDrawer] = useState(false)
  const [view, setView] = useState('shop') // shop | checkout | thanks
  const [order, setOrder] = useState(null)
  const [toast, setToast] = useState('')

  const load = useCallback(() => {
    if (!configured) return
    fetchProducts()
      .then((d) => { setProducts(d); setStatus('ok') })
      .catch(() => setStatus('error'))
  }, [])

  useEffect(() => { load() }, [load])
  useEffect(() => { window.scrollTo(0, 0) }, [view])
  useEffect(() => { saveCart(cart) }, [cart])

  const say = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => setToast(''), 2600)
  }

  /* gabungkan keranjang dengan data produk terbaru (produk yang sudah hilang dibuang) */
  const lines = cart
    .map((c) => ({ ...c, p: products.find((p) => p.id === c.id) }))
    .filter((l) => l.p)
  const total = lines.reduce((n, l) => n + l.p.price * l.qty, 0)
  const count = lines.reduce((n, l) => n + l.qty, 0)

  const add = (p, size) => {
    if (p.sizes.length && !size) return say('Please choose a size first')
    const inCart = cart.find((c) => c.id === p.id && c.size === size)
    if ((inCart ? inCart.qty : 0) + 1 > p.stock) return say('No more stock for this item')
    setCart((c) =>
      inCart
        ? c.map((x) => (x === inCart ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { id: p.id, size, qty: 1 }],
    )
    say('Added to cart')
    setDrawer(true)
  }

  const setQty = (i, qty) =>
    setCart(() => lines.map(({ id, size, qty: q }, k) => ({ id, size, qty: k === i ? qty : q })).filter((x) => x.qty > 0))

  const finish = (o) => {
    setOrder(o)
    setCart([])
    setView('thanks')
    load() // perbarui stok
  }

  const main = products.filter((p) => p.category === 'main')
  const giias = products.filter((p) => p.category === 'giias')

  return (
    <div className="shop">
      <header className="shop-nav">
        <a href="#/" className="shop-logo" aria-label="Anargya home">
          <img src={logo} alt="Anargya" />
        </a>
        <nav>
          <a href="#/">Home</a>
          <a href="#/about">About</a>
          <a href="#/shop" aria-current="page">Shop</a>
          <button type="button" className="shop-cartbtn" onClick={() => setDrawer(true)}>
            Cart ({count})
          </button>
        </nav>
      </header>

      <main>
        {view === 'thanks' && order && <Thanks order={order} onBack={() => setView('shop')} />}

        {view === 'checkout' && (
          <Checkout lines={lines} total={total} onBack={() => setView('shop')} onDone={finish} />
        )}

        {view === 'shop' && (
          <>
            <section className="shop-hero">
              <h1>Official Shop</h1>
              <p>Gear from the team. Every purchase supports the next Anargya car.</p>
            </section>

            {status === 'loading' && <p className="shop-state">Loading products...</p>}
            {status === 'error' && <p className="shop-state">Could not load products. Please refresh the page.</p>}
            {status === 'config' && (
              <p className="shop-state">Shop is not connected yet. Add your Supabase keys to the .env file.</p>
            )}

            {status === 'ok' && (
              <>
                <section className="shop-grid" aria-label="Products">
                  {main.map((p) => <ProductCard key={p.id} p={p} onAdd={add} />)}
                </section>
                {giias.length > 0 && <Giias items={giias} onAdd={add} />}
                <div className="shop-bottom" />
              </>
            )}
          </>
        )}
      </main>

      <CartDrawer
        open={drawer}
        lines={lines}
        total={total}
        onClose={() => setDrawer(false)}
        onQty={setQty}
        onCheckout={() => { setDrawer(false); setView('checkout') }}
      />

      <div className={`shop-toast${toast ? ' show' : ''}`} role="status">{toast}</div>
    </div>
  )
}