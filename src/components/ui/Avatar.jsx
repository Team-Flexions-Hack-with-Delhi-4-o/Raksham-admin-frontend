import { User } from 'lucide-react'

/** Initials when given, otherwise a generic person icon. */
function Avatar({ initials, size = 44, className = '' }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full bg-[#ededef] font-bold text-ink ${className}`}
    >
      {initials ? (
        <span style={{ fontSize: size * 0.34 }}>{initials}</span>
      ) : (
        <User size={size * 0.48} strokeWidth={1.6} className="text-[#8c8c94]" />
      )}
    </span>
  )
}

export default Avatar
