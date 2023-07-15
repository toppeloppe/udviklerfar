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

export interface IAppProps { }

export const Forside: React.FunctionComponent<IAppProps> = (props: React.PropsWithChildren<IAppProps>) => {
  // const preSelectedProject = localStorage.getItem('selectedProject')?.length ?? 0;
  const localStoragePage = localStorage.getItem('activePage')?.length ?? 0 > 0 ? localStorage.getItem('activePage') : null;
  const localStorageProject = localStorage.getItem('selectedProject')?.length ?? 0 > 0 ? localStorage.getItem('selectedProject') : null;
  // @ts-ignore
  const preSelectedPage = parseInt(localStoragePage);
  const [selectedProject, setSelectedProject] = React.useState(localStorageProject || "");
  const [activePage, setActivePage] = React.useState<Sider>(preSelectedPage || Sider.Forside)

  const onPageChange = (side: Sider) => {
    localStorage.setItem('activePage', side.toString())
    setActivePage(side)
  }
  
  const onProjectChange = (project: string) => {
    localStorage.setItem('selectedProject', project)
    setSelectedProject(project)
  }

  const onReset = () => {
    localStorage.removeItem('selectedProject')
    localStorage.removeItem('activePage')
    setSelectedProject("")
    setActivePage(Sider.Portfolio)
  }

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

  return (
    < >
      {selectedProject == "" &&
        <div className='udviklerFar'>
          <Navigation onPageChange={onPageChange} currentPage={activePage} />
          {activePage == Sider.Portfolio && <Portfolio onProjectSelect={onProjectChange} selectedProject={selectedProject} />}
          {activePage == Sider.CV && <CV></CV>}
          {activePage == Sider.Ommig && <OmMig></OmMig>}
          {activePage == Sider.Kontakt && <Kontakt></Kontakt>}
          {activePage == Sider.Forside &&
            <div className='Main'>
              {/* <Header /> */}
              <div className='animate__animated animate__fadeInUp animate__delay-1s animate__slow'>

                <h1>Velkommen til udviklerfar!</h1>
                <p style={{ justifyContent: "center", display: "flex", fontSize: 24, marginTop: 0 }}>Denne hjemmeside kan give dig et indblik i hvem jeg er som person og udvikler.</p>
              </div>
            </div>
          }
        </div>
      }
      {selectedProject == "FarTravels" && <FarTravels onReturn={onReset}/>}
    </>
  );
};