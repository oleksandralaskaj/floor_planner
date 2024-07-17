import axios from "axios";
import React, {useEffect, useState} from "react";
import {ProjectItem} from "../components/ProjectItem";
import {useUserContext} from "../contexts/UserContext";
import styles from '../pages/Projects.module.scss'
import {SetProjectForm} from "../components/SetProjectForm";

type ProjectData = {
    id: number,
    user_id: number,
    title: string,
    data: JSON,
    created_at: string,
    updated_at: string | null,
}
export const Projects = () => {
    const [projects, setProjects] = useState<ProjectData[] | null>(null)
    const getProjects = async (): Promise<void> => {
        try {
            const res = await axios.get('api/projects')
            setProjects(res.data)
        } catch (error) {
            console.log('error fetching projects', error)
        }
    }
    useEffect(() => {
        getProjects()
    }, []);

    const {user} = useUserContext();

    const content = projects?.map((item, index) =>
        <div key={index}>
            <ProjectItem title={item.title} created={item.created_at} updated={item.updated_at} project_id={item.id} getProjects={getProjects}/>
        </div>
    )

    return <div className={styles.container}>
        <h1 className={styles.title}>My projects</h1>
        <div className={styles.existing}>
            {projects?.length !== 0 ? content :
                <p className={styles.info}>You have no projects yet, so start with creating one</p>}
        </div>
    </div>
}
