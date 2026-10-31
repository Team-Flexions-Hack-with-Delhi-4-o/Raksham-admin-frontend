import { ChevronLeft, ChevronRight } from 'lucide-react'

function Pagination({ page, pageCount, from, to, total, onChange }) {
  const btn = 'grid size-10 place-items-center rounded-lg border border-line bg-white font-semibold disabled:text-[#c2c2c8] disabled:cursor-not-allowed'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
      <p className="text-muted">{total ? `Showing ${from}–${to} of ${total}` : 'Showing 0 of 0'}</p>
      <nav aria-label="Pagination" className="flex items-center gap-2">
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)} className={btn}>
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`Page ${n}`}
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onChange(n)}
            className={`${btn} ${n === page ? 'border-brand bg-brand' : ''}`}
          >
            {n}
          </button>
        ))}
        <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => onChange(page + 1)} className={btn}>
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
