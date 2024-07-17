import axios from "axios";
import {Button} from "./Button";
import React from "react";
import {useUserContext} from "../contexts/UserContext";

export const SavePlan = ({project_id, data}) => {
    const {user} = useUserContext()
    const saveProjectData = async () => {
        try {
            const response = await axios.post(`/api/projects/store/${project_id}`, {
                data: JSON.stringify(data.data),
                user_id: user?.id,
                title: data.title
            });
            console.log('api response after save', response.data);
        } catch (error) {
            console.log('error trying to save project data', error)
        }
    }
    return <Button onClickHandler={saveProjectData} type='active'>Save</Button>
}
