import Icon from './Icon'
import useTheme from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className={`theme-toggle${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle__glyph" data-visible={isDark}>
        <Icon name="moon" size={16} />
      </span>
      <span className="theme-toggle__glyph" data-visible={!isDark}>
        <Icon name="sun" size={16} />
      </span>
    </button>
  )
}
