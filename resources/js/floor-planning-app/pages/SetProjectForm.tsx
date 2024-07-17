import styles from "./Form.module.scss";
import {Button} from "../components/Button";
import React, {ChangeEventHandler, FormEventHandler, useState} from "react";
import axios from "axios";
import {useUserContext} from "../contexts/UserContext";

export const SetProjectForm = () => {
    const {user} = useUserContext()

    const [title, setTitle] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/projects/store`, {
                user_id: user?.id,
                title: title
            });
            setTitle('')
            console.log('api response after save', response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('error setting project title ', error)
            }
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.target.value)
    }

    return <div>
        <form action="/api/projects/store" method="post" onSubmit={handleSubmit}>
            <div className={styles.fieldBlock}>
                <div className={styles.item}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' name="title" value={title} onChange={handleChange}/>
                </div>
            </div>
            <Button type={'active'}>Create project</Button>
        </form>
    </div>
}
