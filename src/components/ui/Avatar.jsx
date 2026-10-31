import { User } from 'lucide-react'

const TONES = {
  default: 'bg-[#ededef] text-ink',
  blue: 'bg-[#dbeafe] text-[#2563eb]',
}

/** Initials when given, otherwise a generic person icon. */
function Avatar({ initials, size = 44, tone = 'default', className = '' }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full font-bold ${TONES[tone]} ${className}`}
    >
      {initials ? (
        <span style={{ fontSize: size * 0.4 }}>{initials}</span>
      ) : (
        <User size={size * 0.48} strokeWidth={1.6} className="text-[#8c8c94]" />
      )}
    </span>
  )
}

export default Avatar
