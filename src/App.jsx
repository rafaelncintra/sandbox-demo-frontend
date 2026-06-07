import { useState, useEffect } from 'react'
import ProductTable from './components/ProductTable.jsx'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export default function App() {
  const [products,  setProducts]  = useState([])
  const [category,  setCategory]  = useState('')
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Product Catalog</h1>
        <p className="text-xs text-gray-400 mt-0.5">v2 — category filter</p>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-4">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        {loading && <p className="text-gray-400 text-sm">Loading products…</p>}
        {error   && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && <ProductTable products={products} />}
      </main>
    </div>
  )
}
