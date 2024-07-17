import React, {MouseEventHandler, PropsWithChildren} from "react";
import styles from './Button.module.scss'

type Props = PropsWithChildren<{
    onClickHandler?: MouseEventHandler<HTMLButtonElement>,
    type?: string,
}>

export const Button = ({onClickHandler, type, children}: Props) => {
    return <button onClick={onClickHandler}
                   className={`${styles.button} ${!type ? styles.passive : styles[type]}`}>
        {children}
    </button>
}
