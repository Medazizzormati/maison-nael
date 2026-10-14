import { useEffect } from 'react'
export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} | Maison Naël, pâtisserie à Sousse` : 'Maison Naël | Pâtisserie fine, salon de thé et brunch à Sousse'
  }, [title])
  return <div className="page">{children}</div>
}
