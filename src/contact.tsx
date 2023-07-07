import * as React from 'react';
import { FaFacebook, FaEnvelope, FaMobileAlt } from 'react-icons/fa';

export interface IContactProps { }

export const Contact: React.FunctionComponent<IContactProps> = (props: React.PropsWithChildren<IContactProps>) => {

    const iconSize = "30px"
    return (
        <>
          <p style={{textAlign: "center"}}>Skulle du været interesseret i at høre mere så kontakt mig endelig</p>

            <div className='contactLinkWrapper'>
                <a href="https://www.facebook.com/Toppeloppe" className='contactLink' target='_blank'>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
                        <FaFacebook size={iconSize} />
                        /Toppeloppe
                    </div>
                </a>
                <a className='contactLink' href='mailto:torbenk88@hotmail.com'>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
                        <FaEnvelope size={iconSize} />
                        Torbenk88@hotmail.com
                    </div>
                </a>
                <a className='contactLink' href='tel:28971889'>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
                        <FaMobileAlt size={iconSize} />
                        28 97 18 89
                    </div>
                </a>
            </div>
        </>
    );
};