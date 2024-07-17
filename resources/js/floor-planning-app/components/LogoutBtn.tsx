import React from 'react';
import axios from "axios";
import {useUserContext} from "../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button";

export const LogoutBtn = () => {
    const {getUser} = useUserContext()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.post('/logout')
            getUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return <Button onClickHandler={handleLogout} type='passive'>Logout</Button>
}

