function Chip({ children, className = '' }) {
  return (
    <span className={`whitespace-nowrap rounded-full bg-chip px-3 py-1 text-[13px] ${className}`}>
      {children}
    </span>
  )
}

export default Chip
