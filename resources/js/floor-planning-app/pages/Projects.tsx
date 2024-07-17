import axios from "axios";
import React, {useEffect, useState} from "react";
import {ProjectItem} from "../components/ProjectItem";
import {useUserContext} from "../contexts/UserContext";
import styles from '../pages/Projects.module.scss'

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

    const [title, setTitle] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`api/projects/store`, {
                title: title,
                user_id: user?.id,
            });
            //load projects again with new one
            await getProjects()
            //reset input field
            setTitle('')
            console.log('new project is created', response.data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('error creating new project', error)
            }
        }
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const content = projects?.map((item, index) =>
        <div key={index}>
            <ProjectItem title={item.title} created={item.created_at} updated={item.updated_at} project_id={item.id}/>
        </div>
    )

    return <div className={styles.container}>
        <h1 className={styles.title}>My projects</h1>
        <div className={styles.existing}>
            {projects?.length !== 0? content: <p className={styles.info}>You have no projects yet, so start with creating one</p>}
        </div>

        <h2 className={styles.subtitle}>Add new project:</h2>
    </div>
}
