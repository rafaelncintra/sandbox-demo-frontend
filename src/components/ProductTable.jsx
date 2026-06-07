export default function ProductTable({ products }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500">
          <th className="py-3 px-4 font-medium">Name</th>
          <th className="py-3 px-4 font-medium">Category</th>
          <th className="py-3 px-4 font-medium text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
            <td className="py-3 px-4 text-gray-500">{p.category}</td>
            <td className="py-3 px-4 text-right text-gray-800">${p.price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
