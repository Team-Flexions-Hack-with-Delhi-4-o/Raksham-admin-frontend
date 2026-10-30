function Card({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag className={`rounded-[18px] bg-white shadow-card ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Card
