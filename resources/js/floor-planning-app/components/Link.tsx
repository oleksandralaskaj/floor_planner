import {Link as ReactRouterLink, To} from "react-router-dom";
import React, {PropsWithChildren} from "react";
import styles from './Link.module.scss'

type Props = PropsWithChildren<{
    to: To;
}>

export const Link = ({to, children}: Props) => {
    return <ReactRouterLink to={to} className={styles.link}>{children}</ReactRouterLink>
}
