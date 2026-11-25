import { useEffect } from 'react'

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
    const set = (sel, attr, value) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[name="twitter:title"]', 'content', title)
    set('meta[name="twitter:description"]', 'content', description)
  }, [title, description])
}

export function useJsonLd(obj) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.dynamic = '1'
    script.textContent = JSON.stringify(obj)
    document.head.appendChild(script)
    return () => script.remove()
  }, [obj])
}
