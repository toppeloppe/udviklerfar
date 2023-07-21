import * as React from 'react';
import './style.scss';
// import './App.css';
import 'animate.css';
import CV from './cv/cv';
import { Portfolio } from './Portfolio';
import { Sider } from './Sider';
import { Navigation } from './Navigation';
import { OmMig } from './Ommig/Ommig';
import { Kontakt } from './Kontakt';
import { FarTravels } from './Portfolio/farTravels/farTravels';
// import useCountries from './Util/useCountries';
import useTopImage from './Util/useTopImage';

export interface IAppProps { }

export const Forside: React.FunctionComponent<IAppProps> = (props: React.PropsWithChildren<IAppProps>) => {
  // const preSelectedProject = localStorage.getItem('selectedProject')?.length ?? 0;
  const localStoragePage = localStorage.getItem('activePage')?.length ?? 0 > 0 ? localStorage.getItem('activePage') : null;
  const localStorageProject = localStorage.getItem('selectedProject')?.length ?? 0 > 0 ? localStorage.getItem('selectedProject') : null;
  // @ts-ignore
  const preSelectedPage = parseInt(localStoragePage);
  const [selectedProject, setSelectedProject] = React.useState(localStorageProject || "");
  const [activePage, setActivePage] = React.useState<Sider>(preSelectedPage || Sider.Forside)
  // let travelBoxes: any[] = [];
  // let backgroundVideo: any[] = [];
  // const backgroundVideo = useCountries().background;
  // const travelBoxes = useCountries().travelBoxes;
  // const [backgroundVideo, loading] = useBackgroundVideo("Travel")
  // const onPageChange = (side: Sider) => {
  //   localStorage.setItem('activePage', side.toString())
  //   setActivePage(side)
  // }

  // const onProjectChange = (project: string) => {
  //   localStorage.setItem('selectedProject', project)

  //   setSelectedProject(project)
  // }

  // const onReset = () => {
  //   localStorage.removeItem('selectedProject')
  //   localStorage.removeItem('activePage')
  //   setSelectedProject("")
  //   setActivePage(Sider.Portfolio)
  // }

  // const clearLocalStorage = () => {
  //   localStorage.removeItem('selectedProject')
  //   localStorage.removeItem('activePage')
  // };

  // React.useEffect(() => {
  //   window.addEventListener("beforeunload", clearLocalStorage);
  //   return () => {
  //     window.removeEventListener("beforeunload", clearLocalStorage);
  //   };
  // }, []);
  React.useEffect(() => {
    const handleScroll = (event: any) => {

      const scrollTop = event.target.scrollTop;
      const navItems = Array.from(document.querySelectorAll('.Navigation li'));
      navItems.map((navItem: any) => {
        const cID = navItem.querySelector('a').getAttribute('href');
        const container = document.querySelector(cID).offsetTop;
        if (scrollTop >= container) {
          const activeItems = Array.from(document.querySelectorAll('.Navigation li.active'));
          activeItems.map(item => item.classList.remove('active'))
          navItem.classList.add('active')
        }
      })
    };

    document.querySelector('.udviklerFar')?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    < >
      {/* {selectedProject == "" && */}
      <div className='udviklerFar' onScroll={e => {
      }}>
        <ul className='Navigation'>
          <li className='active'>
            <a href='#Forside'>FORSIDE</a>
          </li>
          <li>
            <a href='#CV'>CV</a>
          </li>
          <li>
            <a href='#Portfolio'>Portfolio</a>
          </li>
          <li>
            <a href='#OmMig'>OmMig</a>
          </li>
        </ul>
        {/* <Navigation onPageChange={onPageChange} currentPage={activePage} />
          {activePage == Sider.Portfolio && <Portfolio onProjectSelect={onProjectChange} selectedProject={selectedProject} />}
          {activePage == Sider.CV && <CV></CV>}
          {activePage == Sider.Ommig && <OmMig></OmMig>}
          {activePage == Sider.Kontakt && <Kontakt></Kontakt>}
          {activePage == Sider.Forside && */}
        {/* <div style={{ height: "100%" }}> */}
        {/* <div style={{ height: "100%" }}> */}
        {/* </div> */}
        {/* <Header /> */}

        {/* </div> */}
        <div id="Forside" className='Main' >

          <div className='animate__animated animate__fadeInUp animate__delay-1s animate__slow'>
            <h1>Velkommen til udviklerfar!</h1>
            <p style={{ justifyContent: "center", display: "flex", fontSize: 24, marginTop: 0 }}>Denne hjemmeside kan give dig et indblik i hvem jeg er som person og udvikler.</p>
          </div>
        </div>
        <div id="CV" className='center col' >
          <CV></CV>
        </div>
        <div id="Portfolio" className='center col' >
          <Portfolio onProjectSelect={() => { }} selectedProject={selectedProject} />
        </div>
        <div id="OmMig" className='center col' >
          <OmMig></OmMig>
        </div>

      </div>
      {/* } */}
      {/* {selectedProject == "FarTravels" && <FarTravels onReturn={onReset} />} */}
    </>
  );
};