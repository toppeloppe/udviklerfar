import { cases } from '../cases'
import Icon from '../components/Icon'
import Notice from '../components/Notice'

const facebook = 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z'
const linkedin = 'M4 9h4v11H4zM6 4a2 2 0 1 0 0 .01M10 9h4v2c1-2 6-3 6 2v7h-4v-6c0-2-2-2-2 0v6h-4z'
import { Link } from '../router'

const jobs = [
  { title: 'Portaludvikler', years: '2023 – 2026', company: 'TRIMIT', text: 'Udvikling og vedligeholdelse af portal-løsninger samt integrationer med fokus på brugeroplevelse, moderne frontend-teknologier og effektiv datastyring.' },
  { title: 'M365 & SharePoint Specialist', years: '2022 – 2023', company: 'EVOBIS', text: 'Primært SharePoint Framework (SPFx) udvikling samt grafiske opsætninger af større løsninger, som underbygges af Azure API, hvor SharePoint opbygges fra bunden.' },
  { title: 'SharePoint Udvikler & Konsulent', years: '2017 – 2022', company: 'ONEPOINT', text: 'Udvikling af webparts, vejledning & opsætning af intranet, opsætning af Power Automate, daglig dialog med kunder og konsulentrådgivning om løsningsmuligheder ud fra kundernes behov.' },
  { title: 'Designer', years: '2017', company: 'PRIMESOFT', text: 'Projektorienteret arbejde med rådgivning og opsætning af hjemmesideløsninger og grafisk design.' },
]

const skills = ['TypeScript', 'React', 'HTML5 / CSS3', 'SASS', 'JavaScript / jQuery', 'Gulp / Git', 'Adobe CC']

const education = [
  { years: '2012 – 2014', title: 'MULTIMEDIEDESIGNER', school: 'Erhvervsakademi MidtVest (EAMV)' },
  { years: '2011 – 2012', title: 'INTERNATIONAL COMMUNICATION AND MULTIMEDIA', school: 'Aarhus Universitet' },
  { years: '2008 – 2011', title: 'KOMMUNIKATION & IT', school: 'HTX Herning' },
]

const traits = ['Selvstændig & Teamworker', 'Løsningsorienteret', 'Positivt mindset', 'Udadvendt & engageret']

export default function Home() {
  return (
    <main>
        <section id="Forside" className="hero">
          <div className="container">
            <img className="avatar" src="/img/torben.png" alt="Torben – udviklerfar" width={200} height={200} />
            <p className="eyebrow">Portfolio &amp; CV</p>
            <h1>Velkommen til <span className="accent">udviklerfar!</span></h1>
            <p className="lead">Denne hjemmeside kan give dig et indblik i hvem jeg er som person og udvikler.</p>
            <div className="cta">
              <a className="btn primary" href="#Cases">Se cases</a>
              <a className="btn ghost" href="#OmMig">Mød udviklerfar</a>
            </div>
          </div>
        </section>

        <section id="CV" className="container">
          <h2 className="sektionNavn">Joberfaring</h2>
          <div className="timeline">
            {jobs.map(j => (
              <article className="card" key={j.company}>
                <div className="row"><h3>{j.title}</h3><span className="years">{j.years}</span></div>
                <p className="company">{j.company}</p>
                <p>{j.text}</p>
              </article>
            ))}
          </div>

          <h2 className="sektionNavn">Faglige evner</h2>
          <div className="tags chips skills">
            {skills.map(s => <span className="pill" key={s}>{s}</span>)}
          </div>

          <h2 className="sektionNavn">Uddannelser</h2>
          <div className="grid3">
            {education.map(e => (
              <article className="card" key={e.title}>
                <span className="years">{e.years}</span><h3>{e.title}</h3><p>{e.school}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="Cases" className="container">
          <h2 className="sektionNavn">Cases</h2>
          <p className="muted">Størstedelen af mine løsninger er udviklet til SharePoint, portaler og B2B-shops bag login og kan derfor ikke vises offentligt. I stedet viser jeg udvalgte cases, der fremviser mine evner, genskabt med fiktivt indhold og 100% fra bunden. Kildekoden til alle cases kan findes på GitHub.</p>
          <Notice>Dette er simplificerede Proof of Concepts, der genskaber udvalgte UX-mønstre og kernefunktionaliteter fra komplekse B2B-løsninger, jeg tidligere har bygget. Alt indhold, design og kildekode er lavet 100% fra bunden til denne portfolio og indeholder ingen proprietær kode, kildedata eller fortrolige forretningslogikker.</Notice>
          <p><a className="btn ghost" target="_blank" rel="noopener" href="https://github.com/toppeloppe/udviklerfar/tree/main/src">Se alle cases på GitHub</a></p>
          <div className="grid2">
            {cases.map(c => (
              <Link to={`/cases/${c.slug}`} className="card" key={c.slug}>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <div className="tags chips">{c.tags.map(t => <span className="pill" key={t}>{t}</span>)}</div>
              </Link>
            ))}
          </div>
        </section>

        <section id="OmMig" className="container">
          <h2 className="sektionNavn">Hvem er udviklerfar?</h2>
          <div className="photos">
            <figure><img src="/img/far-og-soen.png" alt="Torben med sin søn på skuldrene" loading="lazy" /></figure>
            <figure><img src="/img/familie.png" alt="Torben med sin søn og sin datter i sofaen" loading="lazy" /></figure>
          </div>
          <div className="about">
            <div className="story">
              <p className="big">Mit navn er Torben. Jeg er 38 år og bosat i Ikast med min familie.</p>
              <p>Fritiden bruges på gaming, film og en cykeltur i ny og næ. Som person er jeg nede på jorden, udadvendt og som regel smilende. Jeg gør gerne en indsats for at skabe grin og latter omkring mig, fordi humor skaber god kemi, løsner stemningen og gør det sjovere at arbejde sammen.</p>
              <p>Jeg startede udviklerfar for primært at fremvise mine grafiske evner. I 8+ år har jeg lavet løsninger, som har været låst bag logins, hvor jeg ikke har måttet genbruge eller fremvise, hvordan de blev lavet. Derfor har det været svært at vise min kreative side frem. Det håber jeg, at denne hjemmeside kan hjælpe med.</p>
            </div>
            <div className="side">
              <h3 className="mini">Egenskaber</h3>
              <div className="tags chips">
                {traits.map(t => <span className="pill" key={t}>{t}</span>)}
              </div>
              <h3 className="mini">Kontakt</h3>
              <p className="muted">Skulle du være interesseret i at høre mere så kontakt mig endelig</p>
              <div className="contact">
                <a href="mailto:torbenk88@hotmail.com">torbenk88@hotmail.com</a>
                <a href="tel:28971889">28 97 18 89</a>
              </div>
              <div className="contact social">
                <a href="https://www.facebook.com/Toppeloppe" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><Icon d={facebook} /></a>
                <a href="https://www.linkedin.com/in/toppeloppe/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><Icon d={linkedin} /></a>
              </div>
            </div>
          </div>
        </section>
    </main>
  )
}
