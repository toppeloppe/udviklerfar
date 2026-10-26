import { useState } from 'react'
import Icon from '../components/Icon'

const pen = 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'
type Step = { id: string; label: string; abbr: string; weeks: number; optional?: boolean }
type Project = { id: string; name: string; offset: number; owner: string; need: Record<string, boolean>; done: Record<string, boolean> }

// Rækkefølgen er produktionsforløbet. Hvert trin har en tid i uger (0 = skal blot være afkrydset i tide).
// Overskrifterne vises som 2 bogstaver, forklaringen står i title
const steps: Step[] = [
  { id: 'tegn', label: 'Tegninger godkendt', abbr: 'TG', weeks: 0 },
  { id: 'mat', label: 'Materiale bestilt', abbr: 'MB', weeks: 0 },
  { id: 'skaer', label: 'Skæring / savning', abbr: 'SK', weeks: 1 },
  { id: 'svejs', label: 'Svejsning', abbr: 'SV', weeks: 1 },
  { id: 'sand', label: 'Sandblæsning', abbr: 'SB', weeks: 0, optional: true },
  { id: 'galv', label: 'Galvanisering', abbr: 'GA', weeks: 1, optional: true },
  { id: 'mal', label: 'Maling', abbr: 'MA', weeks: 1, optional: true },
  { id: 'ek', label: 'Egenkontrol', abbr: 'EK', weeks: 0 },
  { id: 'pak', label: 'Pakning / mærkning', abbr: 'PM', weeks: 0, optional: true },
  { id: 'lev', label: 'Levering', abbr: 'LE', weeks: 2 },
]
const owners = ['Anna', 'Jens', 'Mette', 'Søren']
// Efterbehandling efter montage er bare fluebensfelter
const after = [
  { id: 'dok', label: 'Dokumentation', abbr: 'DO' },
  { id: 'fak', label: 'Fakturering', abbr: 'FA' },
]
// Kun brugere med rettigheder kan oprette visninger til de andre
const admins = ['Mette']
type View = { id: string; name: string; owner: string; minRed: number; visibleTo: string }

const week = (d: Date) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7))
  return Math.ceil(((+t - +new Date(Date.UTC(t.getUTCFullYear(), 0, 1))) / 864e5 + 1) / 7)
}
const now = week(new Date())
const wk = (n: number) => ((n - 1) % 52 + 52) % 52 + 1

// Montageuge angives som afstand fra denne uge, så demoen altid ser realistisk ud
// Valgfrie trin er kun aktive, hvis de er angivet i "on"
const mk = (id: string, name: string, offset: number, owner: string, on: string[], done: string[]): Project => ({
  id, name, offset, owner,
  need: Object.fromEntries(steps.map(s => [s.id, !s.optional || on.includes(s.id)])),
  done: Object.fromEntries(done.map(d => [d, true])),
})
const initial: Project[] = [
  mk('P-2401', 'Stålhal, Horsens', 3, 'Anna', ['sand', 'galv', 'pak'], ['tegn', 'mat', 'skaer', 'svejs', 'sand']),
  mk('P-2402', 'Trappetårn, Aarhus', 3, 'Jens', ['mal'], ['tegn']),
  mk('P-2403', 'Facadebeslag, Vejle', 5, 'Mette', ['sand', 'galv', 'mal', 'pak'], ['tegn', 'mat', 'skaer']),
  mk('P-2404', 'Rækværk, Silkeborg', 10, 'Søren', [], ['tegn']),
  mk('P-2405', 'Lagerreol, Odense', 4, 'Jens', ['galv'], ['tegn', 'mat', 'skaer', 'svejs']),
  mk('P-2406', 'Gelænder, Kolding', 1, 'Jens', ['sand', 'galv', 'mal', 'pak'], ['tegn', 'mat', 'skaer', 'svejs', 'sand', 'galv']),
  mk('P-2407', 'Altankonstruktion, Randers', 7, 'Anna', ['mal'], ['tegn', 'mat']),
  mk('P-2408', 'Maskinramme, Herning', 0, 'Mette', [], ['tegn', 'mat', 'skaer', 'svejs', 'ek', 'lev', 'mon', 'dok']),
  mk('P-2409', 'Gelænder, Esbjerg', 12, 'Søren', ['galv', 'mal'], []),
]

// Planlægger baglæns fra montageugen: hvert trin skal senest starte, når alle senere trin har fået deres tid
const plan = (p: Project) => {
  let end = now + p.offset
  const out: Record<string, number> = {}
  for (const s of [...steps].reverse()) {
    if (!p.need[s.id]) continue
    end -= s.weeks
    out[s.id] = end
  }
  return out
}

const status = (p: Project) => {
  const mw = now + p.offset
  const start: Record<string, number> = { ...plan(p), mon: mw }
  const ids = [...steps.filter(s => p.need[s.id]).map(s => s.id), 'mon']
  return { start, reds: ids.filter(id => !p.done[id] && start[id] < now).length }
}

const color = (w: number, done?: boolean) => (done ? ' ok' : w < now ? ' red' : w === now ? ' yellow' : ' green')

export default function ProjectTracker() {
  const [projects, setProjects] = useState(initial)
  const [user, setUser] = useState('Jens')
  const [editId, setEditId] = useState<string | null>(null)
  const editing = projects.find(p => p.id === editId)
  const [views, setViews] = useState<View[]>([
    { id: 'all', name: 'Alle projekter', owner: '', minRed: 0, visibleTo: '' },
    { id: 'late', name: 'Kritiske (2+ røde)', owner: '', minRed: 2, visibleTo: '' },
  ])
  const [viewId, setViewId] = useState('mine')
  const [draft, setDraft] =   useState({ name: '', owner: '', minRed: 0, visibleTo: '' })
    const [byRed, setByRed] = useState(true)
    const canEdit = admins.includes(user)
  const mine: View = { id: 'mine', name: 'Mine projekter', owner: user, minRed: 0, visibleTo: user }
  // Visninger er kun synlige for den bruger, de er oprettet til (og for administratorer)
  const all = [mine, ...views.filter(v => !v.visibleTo || v.visibleTo === user || canEdit)]
  const view = all.find(v => v.id === viewId) ?? mine
  const shown = projects
    .filter(p => (!view.owner || p.owner === view.owner) && status(p).reds >= view.minRed)
    .sort((a, b) => (byRed ? status(b).reds - status(a).reds : 0))
  const save = () => {
    if (!draft.name.trim()) return
    const id = 'v' + Date.now()
    setViews(vs => [...vs, { id, ...draft, name: draft.name.trim() }])
    setViewId(id)
    setDraft({ name: '', owner: '', minRed: 0, visibleTo: '' })
  }

  const update = (id: string, fn: (p: Project) => Project) => setProjects(ps => ps.map(p => (p.id === id ? fn(p) : p)))
  const toggle = (id: string, key: 'need' | 'done', step: string) =>
    update(id, p => ({ ...p, [key]: { ...p[key], [step]: !p[key][step] } }))

  return (
    <div className="pt">
      <div className="pt-bar">
        <label>Logget ind som <select value={user} onChange={e => { setUser(e.target.value); setViewId('mine') }}>{owners.map(o => <option key={o} value={o}>{o}{admins.includes(o) ? ' (administrator)' : ''}</option>)}</select></label>
        <label><input type="checkbox" checked={byRed} onChange={e => setByRed(e.target.checked)} /> Mest kritiske øverst</label>
        <span className="pt-views">Visning: {all.map(v => <button key={v.id} className={v.id === view.id ? 'on' : ''} onClick={() => setViewId(v.id)}>{v.name}{v.visibleTo && v.id !== 'mine' ? ` (${v.visibleTo})` : ''}</button>)}</span>
      </div>
      {canEdit && (
        <div className="pt-bar">
          <strong>Opret visning:</strong>
          <input placeholder="Navn" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          <label>Projekter for <select value={draft.owner} onChange={e => setDraft({ ...draft, owner: e.target.value })}><option value="">Alle ansvarlige</option>{owners.map(o => <option key={o}>{o}</option>)}</select></label>
          <label>Min. røde felter <select value={draft.minRed} onChange={e => setDraft({ ...draft, minRed: +e.target.value })}>{[0, 1, 2, 3].map(n => <option key={n}>{n}</option>)}</select></label>
          <label>Synlig for <select value={draft.visibleTo} onChange={e => setDraft({ ...draft, visibleTo: e.target.value })}><option value="">Alle brugere</option>{owners.map(o => <option key={o}>{o}</option>)}</select></label>
          <button onClick={save}>Gem visning</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Projekt</th>
            <th>Ansvarlig</th>
            {steps.map(st => <th key={st.id} className="grp" title={st.label}>{st.abbr}</th>)}
            <th className="grp sep" title="Montage">MO</th>
            {after.map(a => <th key={a.id} className="grp" title={a.label}>{a.abbr}</th>)}
            <th className="grp"></th>
          </tr>
        </thead>
        <tbody>
          {shown.map(p => {
            const s = status(p)
            return (
              <tr key={p.id} onDoubleClick={() => setEditId(p.id)}>
                <td><strong>{p.name}</strong><small>{p.id}</small></td>
                <td>{p.owner}</td>
                {steps.map(st => {
                  const needed = p.need[st.id]
                  const w = s.start[st.id]
                  return (
                    <td key={st.id} className={`chk${needed ? color(w, p.done[st.id]) : ''}`} title={needed ? `${st.label}: ${st.weeks ? `${st.weeks} uge(r), start` : ''} senest uge ${wk(w)}` : `${st.label}: ikke aktuel`}>
                      {!needed ? '–' : p.done[st.id] ? <span className="tick">✓</span> : <small>{wk(w)}</small>}
                    </td>
                  )
                })}
                <td className={`chk sep${color(s.start.mon, p.done.mon)}`}>
                  {p.done.mon ? <span className="tick">✓</span> : <small>{wk(s.start.mon)}</small>}
                </td>
                {after.map(a => <td key={a.id} className="chk">{p.done[a.id] && <span className="tick">✓</span>}</td>)}
                <td className="chk"><button className="pen" aria-label={`Redigér ${p.name}`} title="Redigér (eller dobbeltklik på linjen)" onClick={() => setEditId(p.id)}><Icon d={pen} /></button></td>
              </tr>
            )
          })}
          {!shown.length && <tr><td colSpan={15}>Ingen projekter i denne visning.</td></tr>}
        </tbody>
      </table>
      {editing && (
        <>
          <div className="pt-backdrop" onClick={() => setEditId(null)} />
          <aside className="pt-panel" aria-label="Projektdetaljer">
            <button className="pt-close" aria-label="Luk" onClick={() => setEditId(null)}>×</button>
            <h3>{editing.name}</h3>
            <p className="pt-id">{editing.id}</p>
            <label>Ansvarlig
              <select value={editing.owner} onChange={e => update(editing.id, q => ({ ...q, owner: e.target.value }))}>
                {owners.map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>Montageuge
              <select value={editing.offset} onChange={e => update(editing.id, q => ({ ...q, offset: +e.target.value }))}>
                {Array.from({ length: 14 }, (_, i) => <option key={i} value={i}>Uge {wk(now + i)}</option>)}
              </select>
            </label>
            <table className="pt-steps">
              <thead><tr><th></th><th>Skal</th><th>Udført</th></tr></thead>
              <tbody>
                {steps.map(st => (
                  <tr key={st.id}>
                    <td>{st.label}</td>
                    <td><input type="checkbox" checked={editing.need[st.id]} disabled={!st.optional} onChange={() => toggle(editing.id, 'need', st.id)} /></td>
                    <td><input type="checkbox" checked={!!editing.done[st.id]} disabled={!editing.need[st.id]} onChange={() => toggle(editing.id, 'done', st.id)} /></td>
                  </tr>
                ))}
                <tr><td>Montage</td><td></td><td><input type="checkbox" checked={!!editing.done.mon} onChange={() => toggle(editing.id, 'done', 'mon')} /></td></tr>
                {after.map(a => (
                  <tr key={a.id}><td>{a.label}</td><td></td><td><input type="checkbox" checked={!!editing.done[a.id]} onChange={() => toggle(editing.id, 'done', a.id)} /></td></tr>
                ))}
              </tbody>
            </table>
          </aside>
        </>
      )}
    </div>
  )
}