import { useState, useEffect } from 'react'
import ProductTable from './components/ProductTable.jsx'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Product Catalog</h1>
        <p className="text-xs text-gray-400 mt-0.5">v1 — product list</p>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        {loading && <p className="text-gray-400 text-sm">Loading products…</p>}
        {error   && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && <ProductTable products={products} />}
      </main>
    </div>
  )
}
