import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import Card from '../../components/ui/Card'

function AdvocateHistoryCard({ events }) {
  const [open, setOpen] = useState(true)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">History ({events.length})</h2>
        <button
          type="button"
          aria-label={open ? 'Collapse history' : 'Expand history'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-1 hover:bg-canvas"
        >
          <ChevronUp size={22} className={open ? '' : 'rotate-180'} />
        </button>
      </div>
      {open && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-[#fafaf8] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Date and time</th>
                <th className="px-4 py-3 font-semibold">Actor</th>
                <th className="px-4 py-3 font-semibold">Event</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3">{e.at}</td>
                  <td className="whitespace-nowrap px-4 py-3">{e.actor}</td>
                  <td className="px-4 py-3">{e.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export default AdvocateHistoryCard
