import React from 'react';
import {useUserContext} from "../contexts/UserContext";
import {LogoutBtn} from "./LogoutBtn";
import {Link} from "./Link";
import styles from './Navigation.module.scss'
import {PencilRuler} from "lucide-react";
import {Button} from "./Button";

export const Navigation = () => {
    const {user} = useUserContext()

    return <div className={styles.container}>
        <div className={styles.content}>
            <Link to={'/'}>
                <div className={styles.logo}>
                    <PencilRuler/>
                    <p>FloorPlanner</p>
                </div>
            </Link>
            {!user ?
                <div className={styles.login}>
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/login'}><Button type={'active'}>Sign in</Button></Link>
                </div> :
                <>
                    <div className={styles.links}>
                        <Link to={'/planner'}>Start drawing</Link>
                        <Link to={'/projects'}>My projects</Link>
                    </div>
                    <div className={styles.login}>
                        <p>Hello, {user.first_name}</p>
                        <LogoutBtn/>
                    </div>
                </>
            }
        </div>
    </div>
}
