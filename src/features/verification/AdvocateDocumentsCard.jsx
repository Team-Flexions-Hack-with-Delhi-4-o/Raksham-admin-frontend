import { File, Lock } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { formatDate } from './format'

function AdvocateDocumentsCard({ documents, submittedAt, onOpen }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">Documents</h2>
      <p className="mb-4 mt-2 flex items-center gap-2 text-muted">
        <Lock size={18} strokeWidth={1.6} className="shrink-0" />
        Documents open in a secure viewer. Each time you open one, it is logged.
      </p>
      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
        {documents.map((d) => (
          <li key={d} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
            <File size={24} strokeWidth={1.4} className="shrink-0" />
            <span className="min-w-[160px] flex-1">{d}</span>
            <span className="text-muted">Submitted {formatDate(submittedAt)}</span>
            <Button onClick={() => onOpen(d)} className="px-6 py-2" aria-label={`Open ${d}`}>
              Open
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default AdvocateDocumentsCard
