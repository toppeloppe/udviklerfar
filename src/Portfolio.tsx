import * as React from 'react';
export interface IPortfolioProps {
    onProjectSelect: (projectName: string) => void
    selectedProject: string;
}

export const Portfolio: React.FunctionComponent<IPortfolioProps> = (props: React.PropsWithChildren<IPortfolioProps>) => {
    const rejseBillede = require('./assets/travel.jpg');

    return (
        <>
            {props.selectedProject == "" &&
                <div className='Wrapper'>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <h3 className='sektionNavn' style={{ marginBottom: 0, paddingBottom: 0 }}>Portfolio</h3>
                        <p style={{ margin: 0 }}>Her får du en oversigt over de forskellige projekter som jeg har udviklet.</p>
                        <p style={{ margin: 0 }}>Alle projekter er udviklet 100% fra bunden, og bliver grupperet ud fra hvilke kodesprog der er anvendt i løsningen.</p>
                        <br />
                        <p>God fornøjelse!</p>
                    </div>
                    <h3 className='sektionNavn' style={{ marginBottom: 0, paddingBottom: 0 }}>React</h3>
                    <div className='portfolioBox' onClick={e => props.onProjectSelect('FarTravels')}>
                        <img src={rejseBillede}></img>
                        <div className='information'>

                            <h4>Rejse hjemmeside</h4>
                            <p>Et projekt hvor jeg har forsøgt at genskabe en hjemmeside hvor du kan booke dine egne rejser</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};