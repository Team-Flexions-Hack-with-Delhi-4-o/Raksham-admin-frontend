import { Info } from 'lucide-react'

function DemoNotice() {
  return (
    <div
      role="note"
      className="my-[18px] flex items-center gap-3 rounded-[14px] border border-[#f4e28a] bg-[#fffbe6] px-4 py-3.5"
    >
      <Info size={20} strokeWidth={1.7} className="shrink-0" />
      <p>Demo environment. All numbers, IDs, and records shown here are sample data.</p>
    </div>
  )
}

export default DemoNotice
