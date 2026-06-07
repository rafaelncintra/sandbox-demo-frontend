import { useState, useEffect } from 'react'
import ProductTable from './components/ProductTable.jsx'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

function useCart() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('demo-cart') ?? '[]') } catch { return [] }
  })
  function addToCart(product) {
    setCart(prev => {
      const next = [...prev, product]
      localStorage.setItem('demo-cart', JSON.stringify(next))
      return next
    })
  }
  return { cart, addToCart }
}

export default function App() {
  const [products,  setProducts]  = useState([])
  const [category,  setCategory]  = useState('')
  const [selected,  setSelected]  = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const { cart, addToCart }       = useCart()

  useEffect(() => {
    setLoading(true)
    const url = category ? `${API}/products?category=${encodeURIComponent(category)}` : `${API}/products`
    fetch(url)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [category])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-xs text-gray-400 mt-0.5">v3 — detail + cart</p>
        </div>
        <div className="text-sm text-gray-600">
          Cart: <span className="font-bold text-blue-600">{cart.length}</span> item{cart.length !== 1 ? 's' : ''}
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        {selected ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <button onClick={() => setSelected(null)} className="text-sm text-blue-600 hover:underline mb-4">
              ← Back to list
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
            <p className="text-gray-500 mt-1">{selected.category}</p>
            <p className="text-3xl font-bold text-gray-900 mt-4">${selected.price.toFixed(2)}</p>
            <p className="text-sm text-gray-400 mt-1">{selected.stock} in stock</p>
            <button
              onClick={() => { addToCart(selected); setSelected(null) }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md text-sm"
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            {loading && <p className="text-gray-400 text-sm">Loading products…</p>}
            {error   && <p className="text-red-500 text-sm">{error}</p>}
            {!loading && !error && <ProductTable products={products} onSelect={setSelected} />}
          </>
        )}
      </main>
    </div>
  )
}
