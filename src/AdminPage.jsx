import { useEffect, useState } from 'react'
import { configured, rupiah, sb } from './shopStore'
import './ShopPage.css'

const STATUSES = ['new', 'paid', 'shipped', 'done', 'cancelled']

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error: err } = await sb.auth.signInWithPassword({ email, password })
    if (err) setError('Incorrect email or password.')
    setBusy(false)
  }

  return (
    <form className="shop-form adm-login" onSubmit={submit}>
      <h1>Admin login</h1>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {error && <p className="shop-error" role="alert">{error}</p>}
      <button className="shop-btn full" type="submit" disabled={busy}>{busy ? 'Checking...' : 'Login'}</button>
    </form>
  )
}

function Orders({ orders, reload }) {
  const [msg, setMsg] = useState('')

  const setStatus = async (id, status) => {
    const { error } = await sb.from('orders').update({ status }).eq('id', id)
    setMsg(error ? 'Failed to update status.' : '')
    reload()
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this order permanently?')) return
    const { error } = await sb.from('orders').delete().eq('id', id)
    setMsg(error ? 'Failed to delete order.' : '')
    reload()
  }

  if (!orders.length) return <p className="shop-state">No orders yet.</p>

  return (
    <>
      {msg && <p className="shop-error">{msg}</p>}
      <div className="adm-scroll">
        <table className="adm-table">
          <thead>
            <tr><th>Code</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>ANR-{String(o.id).padStart(5, '0')}</td>
                <td>{new Date(o.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>
                  <b>{o.customer_name}</b><br />
                  {o.phone}<br />{o.email}<br />
                  {o.address}, {o.city} {o.postal}
                  {o.note && <><br /><i>Note: {o.note}</i></>}
                </td>
                <td>
                  {o.order_items.map((i) => (
                    <div key={i.id}>{i.qty} × {i.name}{i.size ? ` (${i.size})` : ''}</div>
                  ))}
                </td>
                <td>{rupiah(o.total)}</td>
                <td>
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td><button type="button" className="adm-del" onClick={() => remove(o.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="shop-fine">If you cancel an order, add its items back to stock in the Products tab.</p>
    </>
  )
}

function ProductRow({ p, reload }) {
  const [price, setPrice] = useState(p.price)
  const [stock, setStock] = useState(p.stock)
  const [active, setActive] = useState(p.active)
  const [saved, setSaved] = useState('')

  const save = async () => {
    const { error } = await sb
      .from('products')
      .update({ price: Math.max(0, +price || 0), stock: Math.max(0, +stock || 0), active })
      .eq('id', p.id)
    setSaved(error ? 'Failed' : 'Saved')
    if (!error) reload()
    setTimeout(() => setSaved(''), 1800)
  }

  return (
    <tr>
      <td><b>{p.name}</b><br /><small>{p.category}</small></td>
      <td><input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
      <td><input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} /></td>
      <td><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} aria-label="Shown in shop" /></td>
      <td><button type="button" className="shop-btn small" onClick={save}>{saved || 'Save'}</button></td>
    </tr>
  )
}

function Dashboard() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const load = async () => {
    const o = await sb.from('orders').select('*, order_items(*)').order('created_at', { ascending: false })
    const p = await sb.from('products').select('*').order('sort_order')
    if (o.error || p.error) return setError('Failed to load data. Are you logged in as admin?')
    setError('')
    setOrders(o.data)
    setProducts(p.data)
  }

  useEffect(() => { load() }, [])

  const live = orders.filter((o) => o.status !== 'cancelled')
  const revenue = live.reduce((n, o) => n + o.total, 0)

  return (
    <>
      <div className="adm-head">
        <h1>Admin</h1>
        <button type="button" className="adm-ghost" onClick={() => sb.auth.signOut()}>Logout</button>
      </div>

      <div className="adm-stats">
        <div><b>{orders.length}</b><span>Orders</span></div>
        <div><b>{orders.filter((o) => o.status === 'new').length}</b><span>New</span></div>
        <div><b>{rupiah(revenue)}</b><span>Revenue (not cancelled)</span></div>
      </div>

      <div className="shop-sizes adm-tabs">
        <button type="button" className={tab === 'orders' ? 'on' : ''} onClick={() => setTab('orders')}>Orders</button>
        <button type="button" className={tab === 'products' ? 'on' : ''} onClick={() => setTab('products')}>Products</button>
        <button type="button" onClick={load}>Refresh</button>
      </div>

      {error && <p className="shop-error">{error}</p>}

      {tab === 'orders' ? (
        <Orders orders={orders} reload={load} />
      ) : (
        <div className="adm-scroll">
          <table className="adm-table">
            <thead><tr><th>Product</th><th>Price (Rp)</th><th>Stock</th><th>Shown</th><th /></tr></thead>
            <tbody>{products.map((p) => <ProductRow key={p.id} p={p} reload={load} />)}</tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default function AdminPage() {
  const [session, setSession] = useState(undefined) // undefined = masih mengecek

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!configured) return
    sb.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <div className="shop">
      <header className="shop-nav">
        <a href="#/shop" className="shop-logo">Back to shop</a>
      </header>
      <main className="adm">
        {!configured && <p className="shop-state">Add your Supabase keys to the .env file first.</p>}
        {configured && session === undefined && <p className="shop-state">Loading...</p>}
        {configured && session === null && <Login />}
        {configured && session && <Dashboard />}
      </main>
    </div>
  )
}