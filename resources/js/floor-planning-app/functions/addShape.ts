import {Attrs} from "../pages/Planner";
import {Dispatch, SetStateAction} from "react";
import {makeId} from "./makeId"


export const addShape = (canvasElement: string, setShapeArray: Dispatch<SetStateAction<Attrs[]>>) => {
    let newElementData: Attrs
    switch (canvasElement) {
        case 'room':
            newElementData = {
                id: makeId(),
                x: 60,
                y: 60,
                height: 300,
                width: 300,
                rotation: 0,
                type: 'room'
            };
            break;
        case 'outerWalls':
            newElementData = {
                id: makeId(),
                x: 60,
                y: 60,
                height: 600,
                width: 600,
                rotation: 0,
                type: 'outerWalls'
            };
            break;
    }
    setShapeArray((previous) => [...previous, newElementData])
}
