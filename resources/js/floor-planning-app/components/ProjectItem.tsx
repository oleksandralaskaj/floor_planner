import styles from './ProjectItem.module.scss'
import React from "react";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";
import {DateBeautifier} from "../functions/DateBeautifier";

export const ProjectItem = ({title, created, updated, project_id}) => {
    const navigate = useNavigate()

    return <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>Created: {DateBeautifier(created)}</p>
        <p className={styles.date}>Updated: {DateBeautifier(updated)}</p>
        <Button type={'active'} onClickHandler={() => {
            navigate(`../planner/${project_id}`);
        }}>Edit</Button>
    </div>
}

