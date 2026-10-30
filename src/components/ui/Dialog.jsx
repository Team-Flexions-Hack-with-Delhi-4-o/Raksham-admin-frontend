import { useEffect, useRef } from 'react'

/** Modal built on the native <dialog>; render it only while open. */
function Dialog({ title, onClose, children, footer }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el && !el.open) el.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="dialog-title"
      className="m-auto w-[min(520px,calc(100vw-32px))] rounded-[18px] bg-white p-0 text-ink shadow-pop backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 id="dialog-title" className="text-lg font-semibold">
          {title}
        </h2>
        <div className="mt-3">{children}</div>
      </div>
      <div className="flex flex-wrap justify-end gap-2 border-t border-line px-6 py-4">{footer}</div>
    </dialog>
  )
}

export default Dialog
