import { useEffect, useState, type ReactNode } from 'react'

export function Link({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={to}
      className={className}
      onClick={e => {
        e.preventDefault()
        history.pushState(null, '', to)
        dispatchEvent(new PopStateEvent('popstate'))
        scrollTo(0, 0)
      }}
    >
      {children}
    </a>
  )
}

export function usePath() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const update = () => setPath(location.pathname)
    addEventListener('popstate', update)
    return () => removeEventListener('popstate', update)
  }, [])
  return path
}
