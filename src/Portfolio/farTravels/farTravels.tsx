import './../../style.scss';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
// import { CountriesStrings } from './Util/Countries';
import { ITravelInformation } from './../../Models/ITravelInformation';
import useCountries, { CountriesStrings } from '../../Util/useCountries';
import { GoBack } from '../../Util/goBack';
import { Divider, Stack } from '@mui/material';
import moment from 'moment';

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
  const backgroundVideo = useCountries().background;
  const [travelInformation, setTravelInformation] = React.useState<ITravelInformation>()

  // const UpdateTravelInformation = (info: ITravelInformation) => {
  //   useTravelInformation(info);
  // }

  const onChangeDestination = (e: any) => {
    const value = e.target.textContent;
    setTravelInformation({ destination: value })
  }
  // const OnTravelInformationUpdate = (area: any, value: any) => {
  //   // const travelInfo: Partial<ITravelInformation> = {
  //   //   [area]: value
  //   // }
  //   // useTravelInformation().updateTravelInformation(travelInfo)

  // }

  const onStartDateChange = (e: any) => {
    debugger
    setTravelInformation({
      ...travelInformation,
      from: e.toDate()
    })
  }

  const isDisabled = travelInformation ? (travelInformation?.destination == "") || (travelInformation?.from == undefined) || (travelInformation.to == undefined) : true

  return (
    <div className='farTravels'>
      <GoBack return={props.onReturn} />
      <video src={`${backgroundVideo}`} style={{ width: "100%", position: "fixed" }} autoPlay={true} loop={true} muted>
      </video>

      <div style={{ background: 'rgba(255,255,255,0.8)', opacity: ".8", position: 'absolute', width: "100%", height: "100%" }}>
      </div>
      <div className='center fullHeight col gap30' style={{ width: "60%", margin: "0 auto", padding: "20px 30px", position: "relative", zIndex: 5, height: "calc(100vh - 40px)", display: steps >= Steps.Step1 ? 'flex' : 'none' }}>
        <h1 style={{ fontSize: 50, fontWeight: '700', textTransform: 'uppercase' }}>Find din næste rejse her!</h1>
        <div className='formWrapper' style={{ position: "relative" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={CountriesStrings}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Destination" />}
            onChange={(e: any) => {
              const value = e.target.textContent;
              setTravelInformation({ ...travelInformation, destination: value })
            }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker label="Afrejsedato" onChange={(e: any) => {
              setTravelInformation({
                ...travelInformation,
                from: e.toDate()
              })
            }} />
            <DatePicker label="Hjemrejsedato" onChange={(e: any) => {
              setTravelInformation({
                ...travelInformation,
                to: e.toDate()
              })
            }} />
          </LocalizationProvider>
          {/* <input className='' type='Date' placeholder='Start'></input> */}
          {/* <input className='' type='Date' placeholder='Stop'></input> */}

          <Button variant="contained" disabled={isDisabled} onClick={e => setSteps(Steps.Step2)}>Søg efter rejse</Button>
        </div>
        <Divider style={{ width: '100%' }}>ELLER</Divider>
        <div className='formWrapper'>
          Vælg en af disse rejser der er på tilbud:
        </div>
        <div className='formWrapper'>
          {travelBoxes}
        </div>
      </div>

      <div id="step2" className='center fullHeight col gap30' style={{ width: "60%", margin: "0 auto", padding: "20px 30px", position: "relative", zIndex: 5, height: "calc(100vh - 40px)",display: steps == Steps.Step2 ? 'flex' : 'none' }}>

        <Stack direction={"row"} justifyContent={'center'} alignItems={'center'} width={"100%"} gap={"2rem"}>
          <TextField label="Fra" variant="outlined" value={"Billund"}/>
          <TextField label="Til" variant="outlined" value={travelInformation?.destination}/>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker label="Afrejsedato" value={moment(travelInformation?.from)}/>
            <DatePicker label="Hjemrejsedato" value={moment(travelInformation?.to)}/>
          </LocalizationProvider>
          <TextField type="number" label="Antal rejsende" variant="outlined" value={1}/>
          {/* <div>
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
          </div> */}
        </Stack>
        <Stack alignItems={'center'}>

          <Stack >
            Flyrejse 1
          </Stack>
          <Stack>
            Flyrejse 2
          </Stack>
          <Stack>
            Flyrejse 3
          </Stack>
          <Stack>
            Flyrejse 4
          </Stack>
          <Stack>
            Flyrejse 5
          </Stack>
        </Stack>

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