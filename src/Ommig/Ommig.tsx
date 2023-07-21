import * as React from 'react';
import { Header } from '../Header';
import { Contact } from '../contact';
export interface IOmMigProps { }

export const OmMig: React.FunctionComponent<IOmMigProps> = (props: React.PropsWithChildren<IOmMigProps>) => {

  const sideBillede = require('./../assets/Theo_2.jpg');

  return (
    <div className='Wrapper' style={{ justifyContent: "center" }}>
      <div className="ommig">
        <div className='ommigBillede' style={{ backgroundImage: `url(${sideBillede})`}} >
          {/* <img width={"30%"} src={sideBillede} className='animate__animated animate__fadeIn'></img> */}
        </div>
        <div className='ommigtekst' >
          <h3 className='sektionNavn' style={{ marginTop: 0, marginBottom: 0, textTransform: "uppercase" }}>Hvem er udviklerfar?</h3>
          <p>Mit navn er Torben, jeg er 34 år og er bosat i Ikast sammen med min kone og min søn. </p>
          <p>Jeg bruger meget af min fritid på gaming og film og nyder også en cykeltur i ny og næ, samt spille lidt guitar når tiden er til det. </p>
          <p>Personligt er jeg er meget nede på jorden, og social smilende person, som forsøger at sprede smil hvor jeg kan.</p>
          <p></p>
          <p>Jeg startede udviklerfar, med henblik på primært at fremvise mine grafiske evner, da efter at have været Sharepoint udvikler i 5+ år, har det været svært at vise sin kreative side frem, så det håber jeg at denne hjemmeside kan hjælpe med.</p>

          <br />
          <br />
          <Contact />
        </div>

      </div>
    </div>
  );
};