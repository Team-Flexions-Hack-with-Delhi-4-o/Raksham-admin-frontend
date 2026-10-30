import { useState } from 'react'

/**
 * Shows only the last four characters until "Reveal" is pressed. In demo mode the revealed
 * value is a clearly fake placeholder, never real data, and the reveal is reported upward.
 */
function MaskedValue({ last4, revealed: sample, label, onReveal }) {
  const [shown, setShown] = useState(false)

  const reveal = () => {
    setShown(true)
    onReveal?.(label)
  }

  return (
    <div>
      <span className="tracking-wide">{shown ? sample : `••••${last4}`}</span>{' '}
      {!shown && (
        <button type="button" onClick={reveal} className="font-medium text-[#1a56db] underline">
          Reveal
        </button>
      )}
      <span className="block text-[13px] text-muted">{shown ? 'Revealed (demo value). This was logged.' : 'Revealing is logged.'}</span>
    </div>
  )
}

export default MaskedValue
