import { useEffect } from 'react'
import { site } from '../config/site'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.fullName}` : `${site.fullName} — ${site.tagline}`
  }, [title])
}
