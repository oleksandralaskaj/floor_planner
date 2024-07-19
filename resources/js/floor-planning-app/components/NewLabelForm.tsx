import styles from "../pages/Planner.module.scss";
import {addShape} from "../functions/addShape";
import {Button} from "./Button";
import React, {useState} from "react";

export const NewLabelForm = ({setShapeArray}) => {
    const [newLabelValue, setNewLabelValue] = useState<string>('')
    const handleSubmit = (event) => {
        event.preventDefault()
        setNewLabelValue('')
        addShape({
            canvasElement: 'label',
            text: newLabelValue,
            setShapeArray: setShapeArray
        })
    }
    return <form className={styles.miniform} onSubmit={handleSubmit}>
        <input type="text" name={'text'} value={newLabelValue}
               onChange={(event) => setNewLabelValue(event.target.value)}/>
        <Button>Label</Button>
    </form>
}
