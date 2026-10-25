import Header from './components/Header'
import Home from './pages/Home'
import CasePage from './pages/CasePage'
import { cases } from './cases'
import { usePath } from './router'

export default function App() {
  const path = usePath()
  const data = cases.find(c => path === `/cases/${c.slug}`)

  return (
    <>
      <Header />
      {data ? <CasePage data={data} /> : <Home />}
      <footer><p>© {new Date().getFullYear()} udviklerfar</p></footer>
    </>
  )
}
