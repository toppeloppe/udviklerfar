import * as React from 'react';
import { MineJobs } from './Jobs';
import { MineUddannelser } from './Udannelser';
import { Header } from '../Header';
import { Sider } from '../Sider';
export interface ICVProps { }

export interface ICVState { }

export default class CV extends React.Component<ICVProps, ICVState> {
  public render(): React.ReactElement<ICVProps> {
    return (
      <div className='Wrapper'>
        <div>
          <div className='sektionNavn'>
            Joberfaring
          </div>

          <div className='jobWrapper'>
            {MineJobs.map((job, index) => {
              const delay = index * .5;
              const style = `jobBoks animate__animated animate__slideInUp animate__delay-${delay}s`;

              const jobHtml = <div className={style}>
                <div className='JobHeader'>

                  <div className='stilling'>
                    {job.Stillingsnavn}
                  </div>
                  <div>
                    {job.Virksomhed.toUpperCase()}
                  </div>
                </div>
                <div className='varighed'>{job.ÅrFra}-{job.ÅrTil}</div>
                <div className='beskrivelse'>{job.Beskrivelse}</div>
              </div>
              return jobHtml
            })}
          </div>
        </div>

        <div>
          <div className='sektionNavn'>
            Uddannelser
          </div>
          <div className='uddannelseWrapper '>
            {MineUddannelser.map((uddannelse, index) => {
              const style = `uddannelsesBoks animate__animated animate__bounceIn animate__delay-${index}s animate__slow`;
              const uddannelseHtml = <div className={style}>
                <div className='uddannelseHeader'>

                  <div className='stilling'>
                    {uddannelse.UddannelsesNavn}
                  </div>
                  <div>

                  </div>
                </div>
                <div className='varighed'>{uddannelse.ÅrFra}-{uddannelse.ÅrTil}</div>
                <div className='beskrivelse'>{uddannelse.Skole}</div>
              </div>
              return uddannelseHtml
            })}
          </div>
        </div>


      </div>
    );
  }
}
