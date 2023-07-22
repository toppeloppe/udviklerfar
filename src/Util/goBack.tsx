import * as React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface IGoBackProps {
  return: () => void
}

export const GoBack: React.FunctionComponent<IGoBackProps> = (props: React.PropsWithChildren<IGoBackProps>) => {
  return (
    <>
      <Link to={'/'}>
        <div className='goBack' onClick={props.return}><FaArrowLeft /> Til Udviklerfar</div>
      </Link>
    </>
  );
};