import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Card from '../../components/ui/Card'
import StatusDot from '../../components/ui/StatusDot'

function RecentActivity({ rows }) {
  return (
    <Card className="min-w-0 p-5">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <Link to="/activity" className="inline-flex items-center gap-1.5 font-semibold underline">
          View all <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-3.5 overflow-x-auto">
        <table className="w-full min-w-[440px] text-[13px]">
          <thead>
            <tr className="text-left text-muted">
              <th className="p-3 font-semibold">Time</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Reference ID</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ref} className="border-t border-line">
                <td className="whitespace-nowrap p-3">{r.time}</td>
                <td className="whitespace-nowrap p-3">{r.type}</td>
                <td className="whitespace-nowrap p-3">{r.ref}</td>
                <td className="whitespace-nowrap p-3">
                  <span className="flex items-center gap-2.5">
                    <StatusDot tone={r.tone} />
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RecentActivity
