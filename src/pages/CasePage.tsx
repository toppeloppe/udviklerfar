import { useState } from 'react'
import type { CaseData } from '../cases'
import Icon from '../components/Icon'
import Notice from '../components/Notice'

const desktop = 'M3 4h18v12H3zM8 20h8M12 16v4'
const mobile = 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2'

export default function CasePage({ data }: { data: CaseData }) {
  const { title, tags, problem, solution, tech, source, Demo } = data
  const [isMobile, setIsMobile] = useState(false)

  return (
    <main className="case-page">
      <section className="band intro-band">
        <div className="container">
          <a href="/#Cases" className="back">← Alle cases</a>
          <h1>{title}</h1>
          <div className="tags chips">{tags.map(t => <span className="pill" key={t}>{t}</span>)}</div>
          <Notice>Simplificeret Proof of Concept, lavet 100% fra bunden til denne portfolio. Indeholder ingen proprietær kode, kildedata eller fortrolig forretningslogik.</Notice>
          <p><a className="btn ghost" target="_blank" rel="noopener" href={source}>Se kildekode på GitHub</a></p>
        </div>
      </section>

      <section className="band problem">
        <div className="container">
          <span className="step">01</span>
          <h2>Problemstilling</h2>
          {problem.map(p => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="band solution">
        <div className="container">
          <span className="step">02</span>
          <h2>Løsning</h2>
          {solution.map(p => <p key={p}>{p}</p>)}
          <div className="device-toggle">
            <button className={`btn ghost${!isMobile ? ' on' : ''}`} onClick={() => setIsMobile(false)}><Icon d={desktop} />Desktop</button>
            <button className={`btn ghost${isMobile ? ' on' : ''}`} onClick={() => setIsMobile(true)}><Icon d={mobile} />Mobil</button>
          </div>
          <div className={`case-demo${isMobile ? ' mobile' : ''}`}><Demo /></div>
        </div>
      </section>

      <section className="band tech">
        <div className="container">
          <span className="step">03</span>
          <h2>Teknisk forklaring</h2>
          {tech.map(g => (
            <div className="tech-group" key={g.title}>
              <h3>{g.title}</h3>
              <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
