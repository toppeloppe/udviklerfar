import * as React from 'react';
import { IPortfolio, allTags } from './Models/IPortfolio';
export interface IPortfolioProps {
    onProjectSelect: (projectName: string) => void
    selectedProject: string;
}



export const Portfolio: React.FunctionComponent<IPortfolioProps> = (props: React.PropsWithChildren<IPortfolioProps>) => {
    const rejseBillede = require('./assets/travel.jpg');

    const portFolios: IPortfolio[] = [{
        Title: "Rejse hjemmeside",
        internalProjectName: "FarTravels",
        subTitle: "Et projekt hvor jeg har forsøgt at genskabe en hjemmeside hvor du kan booke dine egne rejser",
        tags: ["React", "Mui"]
    }]

    return (
        <>
            {props.selectedProject == "" &&
                <div className='Wrapper'>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <h3 className='sektionNavn' style={{ marginBottom: 0, paddingBottom: 0 }}>Portfolio</h3>
                        <p style={{ margin: 0 }}>Her får du en oversigt over de forskellige projekter som jeg har udviklet.</p>
                        <p style={{ margin: 0 }}>Alle projekter er udviklet 100% fra bunden</p>
                        <p style={{ margin: 0 }}>Skulle du være interesseret i at finde koden, så kan den findes på min github her:</p>
                        
                        <br />
                        <p>God fornøjelse!</p>
                    </div>
                    {/* <h3 className='sektionNavn' style={{ marginBottom: 0, paddingBottom: 0 }}>React</h3> */}
                    {portFolios.map(portfolio =>
                        <div className='portfolioBox' onClick={e => props.onProjectSelect(portfolio.internalProjectName)}>
                            <img src={rejseBillede}></img>
                            <div className='information'>

                                <h4>{portfolio.Title}</h4>
                                <p>{portfolio.subTitle}</p>
                                <div className='tags'>
                                    {portfolio.tags.map(pill => {
                                        const tagSettings = allTags.find(tag => tag.name == pill);
                                        return <div className='pill' style={{background: tagSettings?.background, color: tagSettings?.color}}>{tagSettings?.name}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};