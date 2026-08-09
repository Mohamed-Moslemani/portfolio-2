export default function Container({ as: Tag = 'div', size, className = '', children, ...rest }) {
  const modifier = size ? ` container--${size}` : ''
  return (
    <Tag className={`container${modifier}${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  )
}
