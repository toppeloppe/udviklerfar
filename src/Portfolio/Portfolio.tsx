import * as React from 'react';
import { IPortfolio, allTags } from '../Models/IPortfolio';
import { FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
export interface IPortfolioProps {
    // onProjectSelect: (projectName: string) => void
    // selectedProject: string;
}



export const Portfolio: React.FunctionComponent<IPortfolioProps> = (props: React.PropsWithChildren<IPortfolioProps>) => {
    const rejseBillede = require('./../assets/travel.jpg');
    const biografBillede = require('./../assets/cinema.jpg')
    // const navigate = useNavigate();
    const portFolios: IPortfolio[] = [{
        Title: "Rejse hjemmeside",
        internalProjectName: "farTravels",
        subTitle: "Et projekt hvor jeg har forsøgt at genskabe en hjemmeside hvor du kan booke dine egne rejser",
        githubLink: "https://github.com/toppeloppe/udviklerfar/tree/main/src/Portfolio/farTravels",
        tags: ["React", "Mui"],
        image: rejseBillede,
        inDevelopment: false
    },
    {
        Title: "Biograf hjemmeside",
        internalProjectName: "farCinema",
        subTitle: "Har forsøgt at genskabe en biograf oplevelse, hvor sædevælgeren skulle være udfordringen",
        githubLink: "https://github.com/toppeloppe/udviklerfar/tree/main/src/Portfolio/farCinema",
        tags: ["React", "Mui"],
        image: biografBillede,
        inDevelopment: true
    }
]

    return (
        <>
            {/* {props.selectedProject == "" && */}
            <div className='Wrapper'>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h3 className='sektionNavn' style={{ paddingBottom: 0, margin: 0 }}>Portfolio</h3>
                    <p style={{ margin: 0 }}>Her får du en oversigt over de forskellige projekter som jeg har udviklet. Alle projekter er udviklet 100% fra bunden.</p>
                    {/* <p style={{ margin: 0 }}>Alle projekter er udviklet 100% fra bunden</p> */}
                    <p style={{ margin: 0 }}>Skulle du være interesseret i selve kodens opbygning, så kan den findes på min github her:</p>
                    <a target='_blank' className='github' href='https://github.com/toppeloppe/udviklerfar'><FaGithub />Github</a>
                    <br />
                    <p>God fornøjelse!</p>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: 20}}>
                {portFolios.map(portfolio =>
                    <div className='portfolioBox'>
                        {/* <img height={150} src={portfolio.image}></img> */}
                        <div className={`portfolioImage ${portfolio.inDevelopment ? 'inDevelopment' : ''}`} style={{background: `url(${portfolio.image})`}} ></div>
                        <div className='information'>

                            <h4>{portfolio.Title}</h4>
                            <div className='tags'>
                                {portfolio.tags.map(pill => {
                                    const tagSettings = allTags.find(tag => tag.name == pill);
                                    return <div className='pill' style={{ background: tagSettings?.background, color: tagSettings?.color }}>{tagSettings?.name}</div>
                                })}
                            </div>


                            <p>{portfolio.subTitle}</p>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Link to={`/${portfolio.internalProjectName}`}>
                                    <button >Læs mere</button>
                                </Link>
                                <button onClick={e => window.location.href = portfolio.githubLink}><FaGithub /></button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};