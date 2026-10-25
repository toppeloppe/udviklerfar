import { useRef, useState, type MouseEvent, type PointerEvent, type UIEvent } from 'react'
import Icon from '../components/Icon'

const eye = 'M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
const eyeOff = 'M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c7 0 11 7 11 7a17 17 0 0 1-3.2 3.9M6.5 6.5C3.6 8.2 1 12 1 12s4 7 11 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 0 0 4.2 4.2'
const tap = 'M9 11V5a2 2 0 1 1 4 0v6m0 0V9a2 2 0 1 1 4 0v5a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-3l-2-4a2 2 0 0 1 3-2l2 2V11z'
const trash = 'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6'
const cart = 'M3 4h2l2.5 11h10L20 7H6M9 20a1 1 0 1 0 0 .01M17 20a1 1 0 1 0 0 .01'

type Row = { id: string; title: string; color: string }

const initialRows: Row[] = [
  { id: 'WJ-1001', title: 'Arbejdsjakke Sort', color: '#1f2230' },
  { id: 'WJ-1002', title: 'Arbejdsjakke Hvid', color: '#f1f1f1' },
  { id: 'WJ-1003', title: 'Arbejdsjakke Navy', color: '#1d3557' },
  { id: 'WJ-1004', title: 'Arbejdsjakke Grøn', color: '#2d6a4f' },
]
const sizes = ['S', 'M', 'L', 'XL', 'XXL']

// Deterministisk lagerstatus pr. celle, så demoen er stabil
const seed = (id: string, size: string) => id.charCodeAt(id.length - 1) * 7 + size.charCodeAt(0) * 13
const stock = (id: string, size: string) => Math.max(0, seed(id, size) % 40 - 4)
const incoming = (id: string, size: string) => (seed(id, size) % 3 === 0 ? seed(id, size) % 25 + 10 : 0)
const eta = (id: string, size: string) => {
  const d = new Date()
  d.setDate(d.getDate() + 3 + (seed(id, size) % 18))
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })
}
const status = (id: string, size: string) => {
  const n = stock(id, size)
  return n === 0 ? 'out' : n < 10 ? 'low' : 'ok'
}
const key = (id: string, s: string) => `${id}-${s}`

export default function BulkPurchase() {
  const [rows] = useState(initialRows)
  const [qty, setQty] = useState<Record<string, number>>({})
  const [showInfo, setShowInfo] = useState(true)
  const [tapMode, setTapMode] = useState(false)
  const [sel, setSel] = useState<{ id: string; size: string } | null>(null)
  const anim = useRef(0)
  const ignore = useRef<HTMLElement | null>(null)
  const followTimer = useRef(0)
  const tabsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLTableSectionElement>(null)
  const [active, setActive] = useState(0)
  const drag = useRef({ x: 0, left: 0, lastX: 0, lastT: 0, v: 0, active: false, moved: false })

  const get = (id: string, s: string) => qty[key(id, s)] ?? 0
  const rowTotal = (id: string) => sizes.reduce((n, s) => n + get(id, s), 0)
  const colTotal = (s: string) => rows.reduce((n, r) => n + get(r.id, s), 0)
  const total = rows.reduce((n, r) => n + rowTotal(r.id), 0)

  const set = (id: string, s: string, v: number) =>
    setQty({ ...qty, [key(id, s)]: Math.min(stock(id, s), Math.max(0, v)) })

  // Mus kan ikke swipe, så rækkerne kan trækkes med musen i mobilvisningen
  const dragStart = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (e.pointerType !== 'mouse' || e.button !== 0 || el.scrollWidth <= el.clientWidth) return
    cancelAnimationFrame(anim.current)
    drag.current = { x: e.clientX, left: el.scrollLeft, lastX: e.clientX, lastT: e.timeStamp, v: 0, active: true, moved: false }
  }
  const dragMove = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current
    const el = e.currentTarget
    if (!d.active) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 3) {
      d.moved = true
      el.classList.add('dragging')
      el.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lastT)
    d.v = 0.8 * d.v + 0.2 * ((d.lastX - e.clientX) / dt)
    d.lastX = e.clientX
    d.lastT = e.timeStamp
    el.scrollLeft = d.left - dx
  }
  const dragEnd = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const d = drag.current
    d.active = false
    if (!d.moved) return
    if (el === tabsRef.current) {
      // Slideren ruller frit videre med fart og stopper blødt
      const max = el.scrollWidth - el.clientWidth
      animateTo(el, Math.min(max, Math.max(0, el.scrollLeft + d.v * 250)))
      setTimeout(() => { d.moved = false })
      return
    }
    // Et hurtigt kast skifter til næste farve, selv om man ikke har trukket halvvejs
    animateTo(el, scrollTarget(el, nearest(el, el.scrollLeft + d.v * 180)))
    setTimeout(() => { d.moved = false })
  }

  // Kortene snapper i midten, men det første ligger til venstre og det sidste til højre, så man ser naboerne
  const scrollTarget = (el: HTMLElement, i: number) => {
    const card = el.children[i] as HTMLElement
    const max = el.scrollWidth - el.clientWidth
    return Math.min(max, Math.max(0, card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2))
  }
  const nearest = (el: HTMLElement, left: number) => {
    const mid = left + el.clientWidth / 2
    let best = 0
    Array.from(el.children).forEach((c, i) => {
      const card = c as HTMLElement
      const bestCard = el.children[best] as HTMLElement
      if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) < Math.abs(bestCard.offsetLeft + bestCard.offsetWidth / 2 - mid)) best = i
    })
    return best
  }
  const suppressClick = (e: MouseEvent) => {
    if (drag.current.moved) { e.stopPropagation(); e.preventDefault() }
  }

  const animateTo = (el: HTMLElement, to: number) => {
    cancelAnimationFrame(anim.current)
    el.classList.add('dragging')
    const from = el.scrollLeft
    const start = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 380)
      el.scrollLeft = from + (to - from) * (1 - Math.pow(1 - k, 4))
      if (k < 1) anim.current = requestAnimationFrame(step)
      else el.classList.remove('dragging')
    }
    anim.current = requestAnimationFrame(step)
  }

  // Tabs og kort holder samme relative scrollposition. "ignore" forhindrer, at de udløser hinanden i en løkke
  const follow = (from: HTMLElement, to: HTMLElement | null) => {
    if (ignore.current === from) { ignore.current = null; return }
    if (!to) return
    const fromMax = from.scrollWidth - from.clientWidth
    const toMax = to.scrollWidth - to.clientWidth
    if (fromMax <= 0 || toMax <= 0) return
    const target = (from.scrollLeft / fromMax) * toMax
    if (Math.abs(target - to.scrollLeft) < 0.5) return
    ignore.current = to
    to.scrollLeft = target
  }
  const onCardsScroll = (e: UIEvent<HTMLTableSectionElement>) => {
    const el = e.currentTarget
    setActive(nearest(el, el.scrollLeft))
    follow(el, tabsRef.current)
  }
  const onTabsScroll = (e: UIEvent<HTMLDivElement>) => {
    const cards = cardsRef.current
    if (cards && ignore.current !== e.currentTarget) {
      cards.classList.add('follow')
      clearTimeout(followTimer.current)
      followTimer.current = window.setTimeout(() => cards.classList.remove('follow'), 150)
    }
    follow(e.currentTarget, cards)
  }

  const clearRow = (id: string) =>
    setQty(Object.fromEntries(Object.entries(qty).filter(([k]) => !k.startsWith(`${id}-`))))

  return (
    <div className="bulk">
      <div className="bulk-toolbar">
        <button className={`btn ghost${showInfo ? ' on' : ''}`} onClick={() => setShowInfo(!showInfo)}>
          <Icon d={showInfo ? eye : eyeOff} />Celleinfo
        </button>
        <button className={`btn ghost${tapMode ? ' on' : ''}`} onClick={() => setTapMode(!tapMode)}>
          <Icon d={tap} />Tap-mode
        </button>
        <button className="btn ghost" onClick={() => setQty({})} disabled={!total}><Icon d={trash} />Slet alt</button>
      </div>
      <div className="legend">
        <span className="ok">På lager</span>
        <span className="low">Lavt lager</span>
        <span className="out">Udsolgt</span>
      </div>
      {showInfo && (
        <div className="cell-panel">
          {sel && rows.some(r => r.id === sel.id) ? (
            <>
              <strong>{rows.find(r => r.id === sel.id)!.title} · {sel.size}</strong>
              <span className={`pill ${status(sel.id, sel.size)}`}>{stock(sel.id, sel.size)} på lager</span>
              {incoming(sel.id, sel.size) > 0 && <span className="pill inc">{`+${incoming(sel.id, sel.size)} på vej · ventes ${eta(sel.id, sel.size)}`}</span>}
            </>
          ) : <span className="muted">Tryk på en celle for at se lager og forventet levering</span>}
        </div>
      )}
      {tapMode && <p className="muted bulk-hint">Tryk på en celle for +1. Shift-klik eller højreklik for −1.</p>}

      {rows.length > 1 && (
        <div className="tabs" ref={tabsRef} onScroll={onTabsScroll} onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd} onClickCapture={suppressClick}>
          {rows.map((r, i) => (
            <button
              key={r.id}
              className={`tab${i === Math.min(active, rows.length - 1) ? ' on' : ''}`}
              onClick={() => cardsRef.current && animateTo(cardsRef.current, scrollTarget(cardsRef.current, i))}
            >
              <span className="swatch sm" style={{ background: r.color }} />{r.title}
            </button>
          ))}
        </div>
      )}
      <div className="bulk-scroll">
        <table>
          <thead>
            <tr>
              <th>Vare</th>
              {sizes.map(s => <th key={s}>{s}</th>)}
              <th>I alt</th>
            </tr>
          </thead>
          <tbody ref={cardsRef} onScroll={onCardsScroll} onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd} onClickCapture={suppressClick}>
            {rows.map(r => (
              <tr key={r.id}>
                <th>
                  <div className="item">
                    <span className="swatch" style={{ background: r.color }} />
                    <span><strong>{r.title}</strong><small>{r.id}</small></span>
                    <button className="del" tabIndex={-1} aria-label={`Tøm ${r.title}`} title="Tøm række" onClick={() => clearRow(r.id)}><Icon d={trash} /></button>
                  </div>
                </th>
                {sizes.map(s => (
                  <td key={s} data-s={status(r.id, s)} data-sel={sel?.id === r.id && sel.size === s ? '' : undefined} onClick={() => setSel({ id: r.id, size: s })} onFocus={() => setSel({ id: r.id, size: s })}>
                    <span className="size-label">{s}</span>
                    {tapMode ? (
                      <button
                        className={`tap${get(r.id, s) ? ' has' : ''}`}
                        onClick={e => set(r.id, s, get(r.id, s) + (e.shiftKey ? -1 : 1))}
                        onContextMenu={e => { e.preventDefault(); set(r.id, s, get(r.id, s) - 1) }}
                      >
                        {get(r.id, s)}
                      </button>
                    ) : (
                      <input
                        type="number" min={0} max={stock(r.id, s)} aria-label={`${r.title} ${s}`}
                        value={get(r.id, s) || ''} placeholder="0"
                        onChange={e => set(r.id, s, parseInt(e.target.value) || 0)}
                      />
                    )}
                    <small className="cell-info">{stock(r.id, s)}</small>
                  </td>
                ))}
                <td className="row-total">{rowTotal(r.id)}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={sizes.length + 2} className="muted">Ingen varer. Genindlæs siden for at starte forfra.</td></tr>}
          </tbody>
          <tfoot>
            <tr>
              <th><span className="foot-label">I alt</span></th>
              {sizes.map(s => <td key={s} className="sum col-sum">{colTotal(s)}</td>)}
              <td className="sum grand">{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bulk-footer">
        <button className="btn primary" disabled={!total} onClick={() => setQty({})}><Icon d={cart} />Læg {total} stk. i kurv</button>
      </div>
    </div>
  )
}
