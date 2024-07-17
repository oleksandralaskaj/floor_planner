import axios from 'axios';
import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from "../contexts/UserContext";
import styles from "./RegisterLogin.module.scss";
import {Link} from "../components/Link";
import {Button} from "../components/Button";

export function Register() {
    const {user, fetchUser} = useUserContext();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        first_name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange:ChangeEventHandler<HTMLInputElement> = (event) => {
        setValues(previous_values => {
            return ({
                ...previous_values,
                [event.target.name]: event.target.value
            });
        });
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/register', values);
            fetchUser();
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('register error ', error)
            }
        }
    }

    useEffect(() => {
        console.log(values)
    }, [values])

    if (user) {
        return <>
            <p>You are already logged in, return home'</p>
            <button onClick={() => navigate('/')}>home</button>
        </>
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>Register, dear newbie</h1>
            <h2 className={styles.subtitle}>You've got your account already? Then, <Link to={'/login'}> sign in →</Link>
            </h2>
        </div>
        <form action="/register" method="post" onSubmit={handleSubmit}>
            <div className={styles.fieldBlock}>
                <div className={styles.item}>
                    <label htmlFor="username">User name</label>
                    <input type="text" id='username' name="username" value={values.username} onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="first_name">First name</label>
                    <input type="text" id='first_name' name="first_name" value={values.first_name}
                           onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id='surname' name="surname" value={values.surname} onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name="email" value={values.email} onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name="password" value={values.password}
                           onChange={handleChange}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="password_confirmation">Password confirmation</label>
                    <input type="password" id='password_confirmation' name="password_confirmation"
                           value={values.password_confirmation}
                           onChange={handleChange}/>
                </div>
            </div>
            <Button type={'active'}>Register</Button>
        </form>
    </div>
}
