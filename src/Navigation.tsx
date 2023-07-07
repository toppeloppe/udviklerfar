import * as React from 'react';
import { Sider } from './Sider';
import { MitLogo } from './MitLogo';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegTimesCircle } from 'react-icons/fa';


export interface INavigationProps {
    onPageChange: (side: Sider) => void;
    currentPage: Sider;
}

export const Navigation: React.FunctionComponent<INavigationProps> = (props: React.PropsWithChildren<INavigationProps>) => {
    const [mobileMenu, setMobileMenu] = React.useState<boolean>(false)

    const HamburgerMenuClass = mobileMenu ? "HamburgerMenu Visible" : "HamburgerMenu";

    const onMobileNavChange = (side: Sider) => {
        props.onPageChange(side);
        setMobileMenu(false);
    }
    return (
        <>
            <div className='Navigation'>
                <div className='Logo' onClick={e => {
                    props.onPageChange(Sider.Forside)
                }}>
                    <MitLogo />
                </div>
                <div className='navItems'>
                    <a className={props.currentPage == Sider.Forside ? 'active' : ''} onClick={e => props.onPageChange(Sider.Forside)}>Forside</a>
                    <a className={props.currentPage == Sider.CV ? 'active' : ''} onClick={e => props.onPageChange(Sider.CV)}>CV</a>
                    <a className={props.currentPage == Sider.Portfolio ? 'active' : ''} onClick={e => props.onPageChange(Sider.Portfolio)}>Portfolio</a>
                    <a className={props.currentPage == Sider.Ommig ? 'active' : ''} onClick={e => props.onPageChange(Sider.Ommig)}>Om mig</a>
                    <a className='Highlight' onClick={e => props.onPageChange(Sider.Kontakt)}>Kontakt</a>
                </div>
                <div className='navItemsMobile'>
                    <a className='Highlight' onClick={e => {
                        setMobileMenu(true)
                    }}><GiHamburgerMenu /></a>
                </div>
                <div className={HamburgerMenuClass}>
                    <div className='closeHamburgerMenu'>
                        <FaRegTimesCircle style={{ fontSize: 30 }} onClick={e => {
                            setMobileMenu(false)
                        }} />
                    </div>
                    <div className='hamburgerItems'>
                        <a className={props.currentPage == Sider.Forside ? 'active' : ''} onClick={e => onMobileNavChange(Sider.Forside)}>Forside</a>
                        <a className={props.currentPage == Sider.CV ? 'active' : ''} onClick={e => onMobileNavChange(Sider.CV)}>CV</a>
                        <a className={props.currentPage == Sider.Portfolio ? 'active' : ''} onClick={e => onMobileNavChange(Sider.Portfolio)}>Portfolio</a>
                        <a className={props.currentPage == Sider.Ommig ? 'active' : ''} onClick={e => onMobileNavChange(Sider.Ommig)}>Om mig</a>
                    </div>
                </div>
            </div>
        </>
    );
};