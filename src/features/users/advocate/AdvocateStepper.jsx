import { Check } from 'lucide-react'
import Card from '../../../components/ui/Card'

const STEPS = [
  { title: 'Basic details', note: 'Personal and contact information', target: 'section-basic' },
  { title: 'Professional details', note: 'Bar details and practice information', target: 'section-professional' },
  { title: 'Documents', note: 'Upload required documents', target: 'section-documents' },
  { title: 'Review and verify', note: 'Check details and submit for verification', target: null },
]

/** `current` is 0-3. On the review step (3) the first three show as complete. */
function AdvocateStepper({ current, onSelect }) {
  return (
    <Card as="nav" aria-label="Progress" className="p-3.5">
      <ol>
        {STEPS.map((s, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={s.title} className="relative">
              {i < STEPS.length - 1 && <span aria-hidden="true" className="absolute left-[34px] top-12 h-[calc(100%-32px)] w-px bg-line" />}
              <button
                type="button"
                aria-current={active ? 'step' : undefined}
                onClick={() => onSelect(i, s.target)}
                className={`flex w-full items-center gap-4 rounded-lg p-3 text-left ${active ? 'bg-[#eaf1ff]' : 'hover:bg-canvas'}`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full font-semibold ${
                    active ? 'bg-[#2f6fed] text-white' : 'bg-[#ededef] text-ink'
                  }`}
                >
                  {done ? <Check size={18} className="text-[#2f6fed]" /> : i + 1}
                </span>
                <span className="leading-tight">
                  <span className={`block font-medium ${active ? 'text-[#1e50c4]' : ''}`}>{s.title}</span>
                  <span className={`mt-0.5 block text-[13px] ${active ? 'text-[#2f6fed]' : 'text-muted'}`}>{s.note}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}

export default AdvocateStepper
