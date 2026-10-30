const VARIANTS = {
  primary: 'bg-brand text-ink hover:brightness-95 disabled:bg-[#ececef] disabled:text-[#a3a3ab]',
  outline: 'border border-line bg-white text-ink hover:bg-canvas disabled:text-[#a3a3ab]',
  ghost: 'text-ink hover:bg-canvas',
}

function Button({ variant = 'outline', className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
