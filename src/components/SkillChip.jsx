import TechIcon from './TechIcon'

export default function SkillChip({ children, accent = false, icon = true }) {
  return (
    <li className={`chip chip--tech${accent ? ' chip--accent' : ''}`}>
      {icon && typeof children === 'string' && <TechIcon name={children} />}
      <span>{children}</span>
    </li>
  )
}
