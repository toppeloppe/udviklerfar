import * as React from 'react';
import { Contact } from './contact';

export interface IKontaktProps {}

export const Kontakt: React.FunctionComponent<IKontaktProps> = (props: React.PropsWithChildren<IKontaktProps>) => {
  return (
    <div className='Wrapper' >
        <Contact />
    </div>
  );
};