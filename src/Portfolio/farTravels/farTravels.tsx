import './../../style.scss';
import * as React from 'react';
// import { CountriesStrings } from './Util/Countries';
// import useTravelInformation from './useTravelInformation';
// import { ITravelInformation } from './models/ITravelInformation';
import useCountries, { CountriesStrings } from '../../Util/useCountries';
import { GoBack } from '../../Util/goBack';


export interface IForsideProps {
  onReturn: () => void
 }

enum Steps {
  Step1,
  Step2,
  Step3,
  Step4,
}

export const FarTravels: React.FunctionComponent<IForsideProps> = (props: React.PropsWithChildren<IForsideProps>) => {
  const [steps, setSteps] = React.useState<Steps>(Steps.Step1)
  const travelBoxes = useCountries().travelBoxes;
  const [filteredDestinations, setFilteredDestinations] = React.useState<string[]>([])
  const backgroundVideo = useCountries().background;
  const onDestinationSearch = (query: string) => {
    if (query === "") {
      setFilteredDestinations([])
      return
    }

    const filtered = CountriesStrings.filter((country: string) => country.toLowerCase().indexOf(query.toLowerCase()) > -1)
    setFilteredDestinations(filtered)
  }

  // const OnTravelInformationUpdate = (area: any, value: any) => {
  //   // const travelInfo: Partial<ITravelInformation> = {
  //   //   [area]: value
  //   // }
  //   // useTravelInformation().updateTravelInformation(travelInfo)

  // }


  return (
    <div className='farTravels'>
      <GoBack return={props.onReturn} />
      <video src={`${backgroundVideo}`} style={{ width: "100%", position: "fixed" }} autoPlay={true} loop={true} muted>
      </video>

      <div style={{ background: 'rgba(255,255,255,0.8)', opacity: ".8", position: 'absolute', width: "100%", height: "100%" }}>
      </div>
      <div className='center fullHeight col gap30' style={{ width: "60%", margin: "0 auto", padding: "20px 30px", position: "relative", zIndex: 5, height: "calc(100vh - 40px)" }}>
        <h1 style={{ fontSize: 50, fontWeight: '700', textTransform: 'uppercase' }}>Find din næste rejse her!</h1>
        <div className='formWrapper' style={{ position: "relative" }}>
          <input className='' type='text' placeholder='Destination' onChange={e => onDestinationSearch(e.target.value)}></input>
          <div style={{position: "absolute"}}>
            {filteredDestinations.length != 0 && filteredDestinations.map(dest => {
              return <div>{dest}</div>
            })}
          </div>

          <input className='' type='Date' placeholder='Start'></input>
          <input className='' type='Date' placeholder='Stop'></input>

          <button style={{ fontWeight: 'bold', fontSize: "15px", padding: "10px 20px" }}>Søg efter rejse</button>
        </div>
        <div className='seperator' />
        <div className='formWrapper'>
          Vælg en af disse rejser der er på tilbud:
        </div>
        <div className='formWrapper'>
          {travelBoxes}
        </div>
      </div>

      <div style={{ display: steps == Steps.Step2 ? 'flex' : 'none' }}>

        <div className='formWrapper'>
          <div>
            <label>Fra</label>
            <input type='text'></input>
          </div>
          <div>
            <label>Til</label>
            <input type='text'></input>
          </div>
          <div>
            <label>Afrejsedato</label>
            <input type='date'></input>
          </div>
          <div>
            <label>Hjemrejsedato</label>
            <input type='date'></input>
          </div>
          <div>
            <label>Antal rejsende</label>
            <input type='text'></input>
          </div>
        </div>
        <div className='formWrapper col' style={{ alignItems: "center" }}>

          <div >
            Flyrejse 1
          </div>
          <div>
            Flyrejse 2
          </div>
          <div>
            Flyrejse 3
          </div>
          <div>
            Flyrejse 4
          </div>
          <div>
            Flyrejse 5
          </div>
        </div>

      </div>


      <div className='formWrapper col' style={{ display: steps == Steps.Step3 ? 'flex' : 'none' }}>
        Dig
        <div className='row gap'>
          <input type="text" placeholder='Fornavn'></input>
          <input type="text" placeholder='Efternavn'></input>
        </div>
        Adresse
        <div className='row gap'>

          <input type="text" placeholder='Adresse'></input>
          <input type="text" placeholder='postnr' disabled></input>
          <input type="text" placeholder='by' disabled></input>
        </div>

        Kontakt oplysninger
        <div className='row gap'>
          <input type="text" placeholder='Telefon'></input>
          <input type="text" placeholder='Email'></input>
        </div>

      </div>


    </div>
  );
};