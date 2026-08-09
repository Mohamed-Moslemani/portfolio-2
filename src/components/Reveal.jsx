import useScrollAnimation from '../hooks/useScrollAnimation'

/* Wraps children in a scroll-reveal. `delay` staggers siblings. */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Tag
      ref={ref}
      className={`reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
