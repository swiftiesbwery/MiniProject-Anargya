import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const configured = Boolean(URL && KEY)
export const sb = configured ? createClient(URL, KEY) : null

export const rupiah = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

/* ---- keranjang (disimpan di browser) ---- */
const CART_KEY = 'anargya_cart'

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    /* abaikan */
  }
}

/* ---- database ---- */
export async function fetchProducts() {
  const { data, error } = await sb.from('products').select('*').eq('active', true).order('sort_order')
  if (error) throw new Error(error.message)
  return data
}

/* harga & stok dicek ulang di server (fungsi place_order di supabase.sql) */
export async function placeOrder(customer, items) {
  const { data, error } = await sb.rpc('place_order', { p_customer: customer, p_items: items })
  if (error) throw new Error(error.message)
  return data
}