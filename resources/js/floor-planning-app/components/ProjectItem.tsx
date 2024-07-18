import styles from './ProjectItem.module.scss'
import React from "react";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";
import {dateBeautifier} from "../functions/dateBeautifier";
import axios from "axios";

export const ProjectItem = ({title, created, updated, project_id, getProjects}) => {
    const navigate = useNavigate()

    return <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>Created: {dateBeautifier(created)}</p>
        <p className={styles.date}>Updated: {dateBeautifier(updated)}</p>
        <div className={styles.btns}>
            <Button type={'active'} onClickHandler={() => {
                navigate(`../planner/${project_id}`);
            }}>Edit</Button>
            <Button type={'passive'} onClickHandler={async () => {
                try {
                    await axios.delete(`/api/projects/delete/${project_id}`)
                } catch (error) {
                    console.log('error deleting project', error)
                } finally {
                    getProjects()
                }
            }}>Delete</Button>
        </div>
    </div>
}

