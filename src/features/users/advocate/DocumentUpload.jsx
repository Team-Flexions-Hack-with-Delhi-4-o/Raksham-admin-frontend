import { useRef } from 'react'
import { File, X } from 'lucide-react'
import Button from '../../../components/ui/Button'
import { DOC_RULES } from './advocateOptions'

/** Upload tile. Files stay in the browser: nothing is uploaded anywhere in the demo. */
function DocumentUpload({ label, required, optionalNote, file, error, onPick, onRemove }) {
  const input = useRef(null)
  const rule = DOC_RULES.doc

  return (
    <div className={`rounded-xl border bg-[#fafaf8] p-4 ${error ? 'border-bad' : 'border-line'}`}>
      <div className="flex items-start gap-3.5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#ededef]">
          <File size={22} strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="font-medium">
            {label}
            {required && <span className="text-bad"> *</span>}
            {optionalNote && <span className="font-normal text-muted"> {optionalNote}</span>}
          </p>
          <p className="text-[13px] text-muted">{rule.hint}</p>
        </div>
      </div>
      <input
        ref={input}
        type="file"
        accept={rule.accept}
        aria-label={`Upload ${label}`}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files[0]) onPick(e.target.files[0])
          e.target.value = ''
        }}
      />
      {file ? (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-3 py-2">
          <span className="truncate text-[13px]">{file.name}</span>
          <button type="button" aria-label={`Remove ${file.name}`} onClick={onRemove} className="rounded-full p-1 hover:bg-canvas">
            <X size={16} />
          </button>
        </div>
      ) : (
        <Button onClick={() => input.current.click()} className="mx-auto mt-3 w-full max-w-[200px] bg-white">
          Upload file
        </Button>
      )}
      {error && (
        <p role="alert" className="mt-2 text-[13px] text-bad">
          {error}
        </p>
      )}
    </div>
  )
}

export default DocumentUpload
