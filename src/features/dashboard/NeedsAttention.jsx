import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Card from '../../components/ui/Card'
import StatusDot from '../../components/ui/StatusDot'

function NeedsAttention({ rows }) {
  return (
    <Card className="min-w-0 p-5">
      <h2 className="text-lg font-semibold">Needs attention</h2>
      <p className="mb-3.5 mt-1 text-[13px] text-muted">Items that require action.</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-[13px]">
          <thead>
            <tr className="text-left text-muted">
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Open</th>
              <th className="p-3 font-semibold">Oldest</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.category} className="border-t border-line">
                <td className="whitespace-nowrap p-3">
                  <span className="flex items-center gap-2.5">
                    <StatusDot tone={r.tone} />
                    {r.category}
                  </span>
                </td>
                <td className="p-3">{r.open}</td>
                <td className="whitespace-nowrap p-3">{r.oldest}</td>
                <td className="p-3">
                  <Link to={r.to} className="inline-flex items-center gap-1.5 font-semibold underline">
                    View <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default NeedsAttention
