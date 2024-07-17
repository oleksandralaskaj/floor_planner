import styles from "./Form.module.scss";
import {Button} from "./Button";
import React, {ChangeEventHandler, FormEventHandler, useState} from "react";
import axios from "axios";
import {useUserContext} from "../contexts/UserContext";
import {useLocation, useNavigate} from "react-router-dom";
import {Link} from "./Link";

export const SetProjectForm = ({setProjectId}) => {
    const {user} = useUserContext()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/projects/store`, {
                user_id: user?.id,
                title: title
            });
            setTitle('')
            setProjectId(response.data.project_id)
            console.log('new projects id', response.data.project_id);
            navigate(`/planner/${response.data.project_id}`)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('error setting project title ', error)
            }
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.target.value)
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>What's the name of your new project?</h1>
        </div>
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
