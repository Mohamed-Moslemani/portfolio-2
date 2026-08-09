import { useCallback, useSyncExternalStore } from 'react'

/* ---------------------------------------------------------------
   useTheme: 'dark' | 'light', persisted to localStorage.

   The initial value is resolved by the inline boot script in
   index.html (before first paint), so this hook only ever reads what
   is already on <html data-theme>. A tiny external store keeps every
   toggle instance, desktop navbar, mobile menu, in sync.
   --------------------------------------------------------------- */

const STORAGE_KEY = 'jj-theme'
const listeners = new Set()

const readTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'

let current = typeof document === 'undefined' ? 'dark' : readTheme()

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => current

const applyTheme = (theme) => {
  current = theme
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode, the theme still applies for this session */
  }
  listeners.forEach((listener) => listener())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark')

  const setTheme = useCallback((next) => applyTheme(next), [])
  const toggleTheme = useCallback(() => applyTheme(current === 'dark' ? 'light' : 'dark'), [])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}

export default useTheme
