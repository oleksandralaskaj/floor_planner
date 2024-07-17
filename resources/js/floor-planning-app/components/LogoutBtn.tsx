import React from 'react';
import axios from "axios";
import {useUserContext} from "../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button";

export const LogoutBtn = () => {
    const {fetchUser} = useUserContext()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.post('/logout')
            fetchUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return <Button onClickHandler={handleLogout} type='passive'>Logout</Button>
}

