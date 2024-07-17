import React, {ChangeEventHandler, FormEventHandler, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useUserContext} from "../contexts/UserContext";
import styles from "../components/Form.module.scss"
import {Link} from "../components/Link";
import {Button} from "../components/Button";

export function Login() {
    const {user, fetchUser} = useUserContext();
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/login', values);
            fetchUser();
            navigate('/')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('login error ', error)
            }
        }
    }

    const handleChange:ChangeEventHandler<HTMLInputElement> = (event) => {
        setValues(previous_values => {
            return ({
                ...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }

    if (user) {
        return <>
            <p>You are already logged in, return home'</p>
            <button onClick={() => navigate('/')}>home</button>
        </>
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>Sign in, if you know it here</h1>
            <h2 className={styles.subtitle}>If you don't have an account jet, <Link to={'/register'}> register →</Link>
            </h2>
        </div>
        <form action="/login" method="post" onSubmit={handleSubmit}>
            <div className={styles.fieldBlock}>
                <div className={styles.item}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name="email" value={values.email} onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name="password" value={values.password}
                           onChange={handleChange}/>
                </div>
            </div>
            <Button type={'active'}>Login</Button>
        </form>
    </div>
}
