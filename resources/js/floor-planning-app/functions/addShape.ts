import {Attrs} from "../pages/Planner";
import {Dispatch, SetStateAction} from "react";
import {makeId} from "./makeId"


export const addShape = ({canvasElement, text, setShapeArray}: {
    canvasElement: string,
    text?: string,
    setShapeArray: React.Dispatch<React.SetStateAction<Attrs[]>>
}) => {
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
        case 'label':
            newElementData = {
                id: makeId(),
                x: 60,
                y: 60,
                height: 30,
                width: 100,
                rotation: 0,
                type: 'label',
                text: text
            };
    }
    setShapeArray((previous) => [...previous, newElementData])
}
