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
import { CountriesStrings } from '../../Util/Countries';
import { GoBack } from '../../Util/goBack';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import useTopImage from '../../Util/useTopImage';
import useTravelBoxes, { randomIntFromInterval } from '../../Util/useTravelboxes';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import 'moment/locale/da';
export interface IForsideProps {
  onReturn: () => void;
}

enum Steps {
  Step1,
  Step2,
  Step3,
  Step4,
}


export const FarTravels: React.FunctionComponent<IForsideProps> = (props: React.PropsWithChildren<IForsideProps>) => {
  const [steps, setSteps] = React.useState<Steps>(Steps.Step1)
  const [topImage, imageLoading] = useTopImage("Travel")
  const [travelBoxes, boxesLoading] = useTravelBoxes([])
  const [travelInformation, setTravelInformation] = React.useState<ITravelInformation>({ flyingFrom: "Billund", travelers: 1 })
  const [flightChoices, setFlightChoices] = React.useState<any[]>([]);

  // const UpdateTravelInformation = (info: ITravelInformation) => {
  //   useTravelInformation(info);
  // }

  // const onChangeDestination = (e: any) => {
  //   const value = e.target.textContent;
  //   setTravelInformation({ flyingDestination: value })
  // }
  // const OnTravelInformationUpdate = (area: any, value: any) => {
  //   // const travelInfo: Partial<ITravelInformation> = {
  //   //   [area]: value
  //   // }
  //   // useTravelInformation().updateTravelInformation(travelInfo)

  // }

  React.useEffect(() => {

    const step = document.querySelector(`#Step${steps + 1}`)
    if (steps != Steps.Step1) {
      step?.scrollIntoView({ behavior: "smooth" })
    }

  }, [steps])

  React.useEffect(() => {
    if (travelInformation.from && travelInformation.to) {
      const choices: React.SetStateAction<any[]> = []
      for (let index = 0; index < 3; index++) {
        const dateFrom = randomDate(travelInformation.from)
        const dateTo = randomDate(travelInformation.to)
        const price = randomIntFromInterval(8000, 25000);
        const totalPrice = travelInformation.travelers ? travelInformation.travelers > 0 ? travelInformation.travelers * price : price : price;
        const flightChoice = <Stack className={`flightChoice animate__animated animate__fadeInUp animate__delay-${index}s animate__fast`}>
          <div className='flightInformation'>
            <div>
              <Typography variant='h6'>
                {travelInformation.flyingFrom}
              </Typography>
              <Typography>
                {dateFrom?.toLocaleTimeString('da-DK')}
              </Typography>
            </div>
            <div>
              <FaArrowRight />
            </div>
            <div>
              <Typography variant='h6'>
                {travelInformation.flyingDestination}
              </Typography>
              <Typography>
                {dateTo?.toLocaleTimeString('da-DK')}
              </Typography>
            </div>
          </div>
          <Stack direction={'row'} gap={"1rem"}>
            <div>
              <Typography variant='h6'>
                Pris:
              </Typography>
              <Typography>
                {totalPrice.toLocaleString('da-DK') + " DKK"}
              </Typography>
            </div>
            <Button onClick={e => setSteps(Steps.Step3)}>Vælg rejse</Button>
          </Stack>
        </Stack>
        choices.push(flightChoice)
      }
      setTimeout(() => {
        setFlightChoices(choices);
      }, 3000);
    }

    if (travelInformation.flyingDestination != undefined && travelInformation.from == undefined) {
      // @ts-ignore
      document.querySelector('.Afrejsedato button').click();
    }
    if (travelInformation.from != undefined && travelInformation.to == undefined) {
      // @ts-ignore
      document.querySelector('.Hjemrejsedato button').click();
    }
    if (travelInformation.flyingDestination != undefined && travelInformation.from != undefined && travelInformation.to != undefined) {
      // @ts-ignore
      document.querySelector('.searchTravelDestination')?.classList.add('animate__tada');
    }
  }, [travelInformation])

  const randomDate = (start: Date) => {
    const sampleDateStart = new Date(start)
    const random = {
      hour: Math.round(Math.random() * 24),
      minutes: Math.round(Math.random() * 24)
    };

    sampleDateStart.setHours(random.hour)
    sampleDateStart.setMinutes(random.minutes)
    return sampleDateStart;
  }



  const step2IsDisabled = travelInformation ? (travelInformation?.flyingDestination == "") || (travelInformation?.from == undefined) || (travelInformation.to == undefined) : true
  const step3IsDisabled = travelInformation ? (travelInformation?.firstName == undefined) || (travelInformation?.lastName == undefined) || (travelInformation.Address == undefined) || (travelInformation.zipcode == undefined) || (travelInformation.email == undefined) || (travelInformation.city == undefined) || (travelInformation.phone == undefined) : true

  const today = new Date();
  const nextDay = moment(travelInformation.from).add('day', '1')
  return (
    <>
      <div className='farTravels'>
        <GoBack return={props.onReturn} />

        {/* <div style={{ background: 'rgba(255,255,255,0.8)', opacity: ".8", position: 'absolute', width: "100%", height: "100%" }}>
      </div> */}
        <div id='Step1'>

          <div className='topImage' style={{ backgroundImage: `url('${topImage}')` }}>
            <div className='center col gap30' style={{ width: "100%", padding: "20px 30px", }}>

              <Typography variant='h2' fontWeight={"bold"} letterSpacing={"-1px"} fontFamily={"Lato"}>
                FIND DIN NÆSTE REJSE HER
              </Typography>
              <div className='formWrapper' style={{ position: "relative" }}>
                <Autocomplete
                  disablePortal
                  id="combo-box"
                  options={CountriesStrings}
                  sx={{ minWidth: 300, maxWidth: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Destination" className='destination' />}
                  onChange={(e: any) => {
                    const value = e.target.textContent;
                    setTravelInformation({ ...travelInformation, flyingDestination: value });
                    
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='da'>
                  <DatePicker label="Afrejsedato" onChange={(e: any) => {
                    setTravelInformation({
                      ...travelInformation,
                      from: e.toDate()
                    });
                    // @ts-ignore
                    // document.querySelector('.Hjemrejsedato button').click();
                  }} minDate={moment(today)} className='Afrejsedato' />
                  <DatePicker label="Hjemrejsedato" onChange={(e: any) => {
                    setTravelInformation({
                      ...travelInformation,
                      to: e.toDate()
                    })
                  }} minDate={nextDay || moment(today)} className='Hjemrejsedato' />
                </LocalizationProvider>
                {/* <input className='' type='Date' placeholder='Start'></input> */}
                {/* <input className='' type='Date' placeholder='Stop'></input> */}

                <Button className='searchTravelDestination animate__animated' variant="contained" disabled={step2IsDisabled} onClick={e => {
                  setSteps(Steps.Step2)
                }}>Søg efter rejse</Button>
              </div>
            </div>
          </div>
          <div className='travelBoxes'>

            <Divider className='divider' style={{ width: '100%' }}>ELLER</Divider>
            <div>
              Vælg en af disse rejser der er på tilbud:
            </div>
            <div className='formWrapper'>
              {boxesLoading == "true" ? <CircularProgress /> : travelBoxes}
            </div>
          </div>
        </div>

        <div id="Step2" style={{ display: steps >= Steps.Step2 ? 'flex' : 'none' }}>
          <div className='Wrapper'>
            <Typography variant='h2' color={"black"} fontWeight={"bold"} letterSpacing={"-1px"} fontFamily={"Lato"}>
              VÆLG REJSE
            </Typography>
            <Stack className='center' direction={"row"} justifyContent={'center'} alignItems={'center'} width={"100%"} gap={"2rem"}>
              <TextField label="Fra" variant="outlined" value={travelInformation.flyingFrom} />
              <TextField label="Til" variant="outlined" value={travelInformation?.flyingDestination} />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker label="Afrejsedato" value={moment(travelInformation?.from)} />
                <DatePicker label="Hjemrejsedato" value={moment(travelInformation?.to)} />
              </LocalizationProvider>
              <TextField type="number" label="Antal rejsende" variant="outlined" value={travelInformation.travelers} onChange={e => {
                setTravelInformation({ ...travelInformation, travelers: parseInt(e.target.value) })
              }} />
            </Stack>
            <Stack alignItems={'center'} style={{ width: "100%", gap: 20 }}>
              {flightChoices.length == 0 ? <CircularProgress /> : flightChoices}
              {/* <Stack className='flightChoice'>
            <div className='flightInformation'>
              <div>
                <Typography variant='h6'>
                  {travelInformation.flyingFrom}
                </Typography>
                <Typography>
                  {travelInformation.from?.toLocaleTimeString('da-DK')}
                </Typography>
              </div>
              <div>
                <FaArrowRight />
              </div>
              <div>
                <Typography variant='h6'>
                  {travelInformation.flyingDestination}
                </Typography>
                <Typography>
                  {travelInformation.to?.toLocaleTimeString('da-DK')}
                </Typography>
              </div>
              <Typography>
                PRICE
              </Typography>
            </div>
            <Button>Vælg rejse</Button>
          </Stack>
          <Stack className='flightChoice'>
            Flyrejse 2
          </Stack>
          <Stack className='flightChoice'>
            Flyrejse 3
          </Stack>
          <Stack className='flightChoice'>
            Flyrejse 4
          </Stack>
          <Stack className='flightChoice'>
            Flyrejse 5
          </Stack> */}
            </Stack>
          </div>

        </div>



        <div id="Step3" style={{ display: steps >= Steps.Step3 ? 'flex' : 'none' }}>
          <div className='Wrapper'>

            <Typography variant='h2' color={"black"} fontWeight={"bold"} letterSpacing={"-1px"} fontFamily={"Lato"} textTransform={"uppercase"}>
              Indtast oplysninger
            </Typography>
            <div className='row gap' style={{ padding: "0px 10px" }}>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, firstName: e.target.value })} name='Firstname' label='Fornavn'></TextField>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, lastName: e.target.value })} name='Lastname' label='Efternavn'></TextField>
            </div>

            <div className='row gap' style={{ padding: "0px 10px" }}>

              <TextField onChange={e => setTravelInformation({ ...travelInformation, Address: e.target.value })} label='Adresse'></TextField>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, zipcode: e.target.value })} name='Zip' label='Postnr'></TextField>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, city: e.target.value })} name='City' label='By'></TextField>
            </div>


            <div className='row gap' style={{ padding: "0px 10px" }}>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, phone: e.target.value })} label='Telefon'></TextField>
              <TextField onChange={e => setTravelInformation({ ...travelInformation, email: e.target.value })} label='Email'></TextField>
            </div>
            <Button disabled={step3IsDisabled} variant='contained' size='large' fullWidth onClick={e => setSteps(Steps.Step4)}>RESERVÉR REJSE</Button>
          </div>

        </div>
        <Stack id="Step4" className='fullHeight col gap30 center z' style={{ zIndex: 5, position: "relative", display: steps >= Steps.Step4 ? 'flex' : 'none' }}>
          <div className='col gap30 center'>
            <FaCheckCircle color='black' size={"5rem"} />
            <div className='col center'>

              <Typography variant='h2' color={"black"} fontWeight={"bold"} textTransform={"uppercase"} fontFamily={"Lato"}>
                Tak for din bestilling
              </Typography>
              <Typography variant='subtitle1' color={"black"} fontFamily={"Lato"} fontSize={"20px"}>
                Din fiktive rejse er blevet bestilt!
              </Typography>
            </div>
          </div>
        </Stack>


      </div>
    </>

  );
};