import type { ComponentType } from 'react'
import BulkPurchase from './BulkPurchase'

export type CaseData = {
  slug: string
  title: string
  summary: string
  tags: string[]
  problem: string[]
  solution: string[]
  tech: { title: string; items: string[] }[]
  source: string
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
]
