import type { ReactNode } from 'react'
import Icon from './Icon'

const warning = 'M12 3l10 18H2zM12 10v5M12 18v.01'

export default function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice" role="note">
      <Icon d={warning} />
      <p>{children}</p>
    </div>
  )
}
