import type { ComponentType } from 'react'
import BulkPurchase from './BulkPurchase'
import ProjectTracker from './ProjectTracker'

export type CaseData = {
  slug: string
  title: string
  summary: string
  tags: string[]
  problem: string[]
  solution: string[]
  tech: { title: string; items: string[] }[]
  source: string
  noDeviceToggle?: boolean
  note?: string
  legend?: { color: string; label: string }[]
  Demo: ComponentType
}

export const cases: CaseData[] = [
  {
    slug: 'bulk-purchase',
    title: 'Bulk Purchase (B2B)',
    summary: 'Hurtig bestilling af mange varianter ad gangen i ét overblik.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    problem: [
      'B2B-kunder bestiller typisk samme vare i mange farver og størrelser ad gangen. I en almindelig webshop skal hver variant vælges og lægges i kurven for sig, hvilket er langsomt og fejlbehæftet.',
      'Den tidligere løsning var en bred tabel, som ikke var optimeret til mobil: man skulle scrolle sidelæns, felterne var små og svære at ramme, og overblikket gik tabt. Samtidig er det netop på mobil, mange bestiller ude hos kunden eller på lageret.',
    ],
    solution: [
      'Varianterne vises i et bestillingsgrid med én vare pr. række (farve, titel og varenummer) og størrelser som kolonner. Rækker kan tømmes enkeltvis, alle celler kan tømmes samlet, og celleinfo (lager og forventet levering) kan skjules.',
      'På mobil viser vinduet én farve ad gangen med størrelserne side om side i store, nemme felter. Man swiper (eller trækker med musen) til siden for at skifte farve. Over kortene ligger en slider med alle farver, som er synkroniseret med kortene i begge retninger. Tap-mode gør det hurtigt at bestille med tryk i stedet for at skrive. Brug knapperne herunder til at skifte mellem desktop og mobil.',
      'Samme markup bruges på alle enheder, så layoutet blot tilpasser sig skærmen. Det gør løsningen langt mere anvendelig og nemmere at navigere rundt i på tablet, hvilket gør den mere attraktiv for kunderne end tidligere.',
    ],
    tech: [
      {
        title: 'HTML',
        items: [
          'Samme HTML bruges på desktop og mobil, så hver farve og størrelse kun findes én gang, og man aldrig skal opdatere to celler for det samme. Kun layoutet ændres via CSS afhængigt af enheden',
          'Hver celle er et input af typen number med min og max sat til lagerstatus',
        ],
      },
      {
        title: 'CSS',
        items: [
          'Knapper og felter er mindst 44 px høje, så de er nemme at ramme med en finger',
          'Farvetemaet styres med CSS custom properties, som demoen overskriver lokalt for at få light mode',
          'Lagerstatus vises med farvede borders (grøn, orange og rød)',
        ],
      },
      {
        title: 'JavaScript',
        items: [
          'Antal gemmes i ét objekt med nøglen "varenummer-størrelse". Totaler beregnes ud fra det hver gang og gemmes aldrig separat',
          'Værdier parses med parseInt og begrænses til mellem 0 og lagerstatus',
          'Aktiv farve findes som det kort, der ligger tættest på midten af vinduet',
          'Pointer events (pointerdown, pointermove og pointerup) lader musen trække i kort og slider, og hastigheden måles, så et hurtigt kast skifter farve',
          'Slip animeres med easing via requestAnimationFrame, og et træk undertrykker det efterfølgende klik',
          'Tap-mode skifter cellerne mellem input og knap: click giver +1, shift-klik eller contextmenu giver −1',
          'Celleinfo-knappen viser eller skjuler infoområdet, som opdateres ved klik eller fokus i en celle',
        ],
      },
    ],
    source: 'https://github.com/toppeloppe/udviklerfar/tree/main/src/cases/BulkPurchase.tsx',
    Demo: BulkPurchase,
  },
  {
    slug: 'projektstyring',
    title: 'Projektstyring (Stål)',
    summary: 'Overblik over produktionsforløb, deadlines og ansvarlige, beregnet baglæns fra montageugen.',
    tags: ['SPFx', 'PnP', 'React', 'TypeScript'],
    problem: [
      'En stålproduktionsvirksomhed kendte på forhånd den uge, hvor hvert projekt skulle monteres. Men vejen dertil varierede: levering kunne tage 1-2 uger, produktion 2 uger, og nogle projekter skulle også galvaniseres eller males.',
      'Det var svært at se, hvilke trin et projekt skulle igennem, hvilke der var udført, og om man var bagud i forhold til montageugen. Overblikket lå i hovedet på de enkelte medarbejdere.',
    ],
    solution: [
      'Hvert projekt har en montageuge og en række felter pr. trin: en streg betyder, at trinnet ikke er aktuelt (fx galvanisering), et tomt felt at det skal udføres, og et flueben at det er udført. Løsningen regner baglæns fra montageugen og viser, hvornår hvert trin senest skal starte.',
      'Hvert projekt kan kobles til en ansvarlig medarbejder. Alle projekter ligger som én linje i en tabel med overskrifter over hver kolonne, så man kan overskue dem på ét blik. Oversigten er kun en visning: for at rette noget klikker man på kuglepennen (eller dobbeltklikker på linjen), og så åbner projektets detaljer i et panel fra siden. Her kan man fx markere, at noget er galvaniseret, eller skifte ansvarlig og montageuge.',
      'Unikt ved løsningen var de separate visninger: hver medarbejder kunne se de projekter, de selv var tildelt, og brugere med rettigheder kunne oprette visninger (fx en bestemt medarbejders projekter eller kun de mest kritiske), som alle andre kunne bruge. En visning kunne også oprettes til én bestemt medarbejder, og så var den kun synlig for vedkommende (og for administratorer): fx kan Anna ikke se en visning, der er lavet til Søren. Skift bruger øverst: Mette er administrator og kan oprette nye visninger.',
      'Felterne er farvekodet efter uge: rød = skulle være startet i en tidligere uge, gul = skal starte i denne uge, grøn = senere eller udført. Projektlederne kunne sidde sammen i et møde og sortere eller filtrere på de mest kritiske projekter, altså dem med flest røde felter.',
    ],
    tech: [
      {
        title: 'Original løsning',
        items: [
          'Bygget som SharePoint Framework (SPFx) webpart med React og TypeScript',
          'Data hentet og gemt i SharePoint-lister med PnP JS',
          'Medarbejdere hentet fra SharePoint-brugere',
        ],
      },
      {
        title: 'Denne demo',
        items: [
          'Samme logik som den originale løsning, men med lokale data i stedet for SharePoint-lister',
          'Oversigten er skrivebeskyttet. Redigering sker i et slide-in panel (fixed position med CSS-animation) med samme data',
          'Datamodellen er to objekter pr. projekt: hvilke trin der skal bruges, og hvilke der er udført',
          'Starttidspunkter beregnes baglæns fra montageugen ved at trække hvert trins leveringstid fra',
          'Farve (rød, gul, grøn) og antal røde felter udledes af data og gemmes aldrig separat',
          'En visning er blot et gemt filter (ansvarlig og/eller kun bagud), og "Mine projekter" bygges ud fra den valgte bruger',
          'Rettigheder er forenklet til en liste over administratorer, som må oprette visninger',
          'Ugenummer findes som ISO-uge ud fra dags dato',
        ],
      },
    ],
    source: 'https://github.com/toppeloppe/udviklerfar/tree/main/src/cases/ProjectTracker.tsx',
    noDeviceToggle: true,
    legend: [
      { color: '#f8b4b4', label: 'Rød: skulle være startet i en tidligere uge' },
      { color: '#fbe9a0', label: 'Gul: skal starte i denne uge' },
      { color: '#c6ecc6', label: 'Grøn: starter senere, eller er udført (✓)' },
    ],
    note: 'Overskrifterne er forkortelser, og når man holder musen over dem, vises hele navnet (fx GA = Galvanisering). Tallet i et felt er den uge, trinnet senest skal udføres, ✓ betyder udført, og en streg betyder, at trinnet ikke er aktuelt. Montage (MO) er det sidste trin i forløbet, og efter montage følger dokumentation og fakturering, som blot er fluebensfelter uden uge. Oversigten kan ikke redigeres direkte: klik på kuglepennen (eller dobbeltklik på linjen) for at åbne projektets detaljer i et panel, hvor man fx kan markere, at noget er galvaniseret, eller skifte ansvarlig.',
    Demo: ProjectTracker,
  },
]
