import * as React from 'react';
import farDesign from './farCinema.module.scss'

export interface IChairProps {
    booked: boolean;
    selected: boolean;
    onSelect: (chair: string) => void
}

export const Chair: React.FunctionComponent<IChairProps> = (props: React.PropsWithChildren<IChairProps>) => {
    return (
        <>
            {props.booked &&
                <div className={[farDesign.chair, farDesign.booked].join(' ')}>
                    <div className={[farDesign.armRest, farDesign.left].join(' ')}></div>
                    <div className={farDesign.seat}></div>
                    <div className={[farDesign.armRest, farDesign.right].join(' ')}></div>
                    <div className={farDesign.back}></div>
                </div>
            }
            {props.selected &&
                <div className={[farDesign.chair, farDesign.selected].join(' ')}>
                    <div className={[farDesign.armRest, farDesign.left].join(' ')}></div>
                    <div className={farDesign.seat}></div>
                    <div className={[farDesign.armRest, farDesign.right].join(' ')}></div>
                    <div className={farDesign.back}></div>
                </div>
            }
            {!props.booked && !props.selected &&
                <div className={farDesign.chair} onClick={e => props.onSelect}>
                    <div className={[farDesign.armRest, farDesign.left].join(' ')}></div>
                    <div className={farDesign.seat}></div>
                    <div className={[farDesign.armRest, farDesign.right].join(' ')}></div>
                    <div className={farDesign.back}></div>
                </div>
            }
        </>
    );
};