import * as React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export interface IGoBackProps {
    return: () => void
}

export const GoBack: React.FunctionComponent<IGoBackProps> = (props: React.PropsWithChildren<IGoBackProps>) => {
  return (
    <>
        <div className='goBack' onClick={props.return}><FaArrowLeft /> Gå tilbage</div>
    </>
  );
};