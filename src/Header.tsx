import * as React from 'react';
import * as ReactDOM from 'react-dom'
import './App.css';
import { Sider } from './Sider';

export interface IHeaderProps {

}

export const Header: React.FunctionComponent<IHeaderProps> = (props: React.PropsWithChildren<IHeaderProps>) => {

    const profilBillede = require('././profil_fritlagt.png');
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div className='Header' style={{ justifyContent: "start" }}>
                    <img src={profilBillede} className='headerImage' />
                    <div className='personligt'>
                        <div className='name'>Torben Kristensen</div>
                        <div className='jobTitle'>Sharepoint & Frontendudvikler</div>
                    </div>
                </div>
            </div>
        </>
    );
};