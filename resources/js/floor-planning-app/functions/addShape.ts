import {Attrs} from "../pages/Planner";
import {Dispatch, SetStateAction} from "react";
import {makeId} from "./makeId"


export const addShape = (canvasElement: string, setShapeArray: Dispatch<SetStateAction<Attrs[]>>) => {
    let newElementData: Attrs
    switch (canvasElement) {
        case 'outerWall':
            newElementData = {
                id: makeId(),
                x: 50,
                y: 50,
                height: 300,
                width: 300,
                rotation: 0,
            };
            break;
        default:
            newElementData = {
                id: makeId(),
                x: 50,
                y: 50,
                height: 550,
                width: 50,
                rotation: 0,
            };
            break;
    }
    setShapeArray((previous) => [...previous, newElementData])
}
