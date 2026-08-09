import { useEffect } from 'react'

/* ---------------------------------------------------------------
   useDocumentTitle: per-route <title> and meta description, with
   the previous values restored on unmount.
   --------------------------------------------------------------- */

const DEFAULT_TITLE = 'Jana Jaffal / Software, Data & Art'

const setMeta = (name, content) => {
  if (!content) return
  const tag = document.querySelector(`meta[name="${name}"]`)
  if (tag) tag.setAttribute('content', content)
}

export function useDocumentTitle(title, description) {
  useEffect(() => {
    const previousTitle = document.title
    const descTag = document.querySelector('meta[name="description"]')
    const previousDesc = descTag?.getAttribute('content')

    document.title = title ? `${title} / Jana Jaffal` : DEFAULT_TITLE
    setMeta('description', description)

    return () => {
      document.title = previousTitle
      if (descTag && previousDesc) descTag.setAttribute('content', previousDesc)
    }
  }, [title, description])
}

export default useDocumentTitle
