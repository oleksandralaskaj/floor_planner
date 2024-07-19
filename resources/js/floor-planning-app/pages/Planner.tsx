import React, {KeyboardEvent, RefObject, useEffect, useRef, useState} from "react";
import {Stage, Layer, Text} from 'react-konva';
import styles from './Planner.module.scss'
import {GridLayer} from "../components/GridLayer";
import {DownloadImage} from "../components/DownloadImage";
import Konva from "konva";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SavePlan} from "../components/SavePlan";
import {KonvaEventObject} from "konva/lib/Node";
import {SetProjectForm} from "../components/SetProjectForm";
import {Button} from "../components/Button";
import {addShape} from "../functions/addShape";
import {Room} from "../components/Room";
import {OuterWalls} from "../components/OuterWalls";

export const GRIDCELLSIZE = 10;

export type Attrs = {
    id: string,
    x: number,
    y: number,
    height: number,
    width: number,
    rotation: number,
    type: string
}

type  ProjectData = {
    id: number,
    user_id: number,
    title: string,
    data: string | null,
    created_at: string,
    updated_at: string
}

const canvasSize = {
    height: window.innerHeight - 62,
    width: window.innerWidth - 132,
}

export const Planner = () => {
    //state containing data all elements of canvas
    const [shapeArray, setShapeArray] = useState<Attrs[]>([]);

    //id of selected shape
    const [selectedId, setSelectedId] = useState<string | null>(null);

    //data for illustration of selected node
    const [selectedNodeAttrs, setSelectedNodeAttr] = useState<Attrs | null>()

    //project data
    const [projectData, setProjectData] = useState<ProjectData | null>(null)

    //working project id
    const {project_id} = useParams()
    const [projectId, setProjectId] = useState<number | string | null | undefined>(project_id)

    const getProjectData = async (): Promise<void> => {
        try {
            const res = await axios.get(`/api/projects/${projectId}`)
            setProjectData(res.data)

            if (res.data.data) {
                setShapeArray(JSON.parse(res.data.data))
            }
        } catch (error) {
            console.log('error fetching project data', error)
        }
    }

    useEffect(() => {
        if (projectId) {
            getProjectData()
        }
    }, [projectId]);


    const updateCanvasData = (newData: Attrs) => {
        const newShapeArray = shapeArray.slice();
        const indexOfShapeToBeUpdated = shapeArray.findIndex((oldData) => oldData.id === newData.id);
        newShapeArray[indexOfShapeToBeUpdated] = newData
        setShapeArray(newShapeArray)
    }

    const updateSelectedNodeAttrs = () => {
        const shape = shapeArray?.find(item => item?.id === selectedId)
        setSelectedNodeAttr(shape);
    }

    useEffect(() => {
        updateSelectedNodeAttrs()
    }, [selectedId, shapeArray]);


// deselect when clicked on empty area
    const checkDeselect = (event: KonvaEventObject<MouseEvent>) => {
        const clickedOnEmpty = event.target === event.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
            setSelectedNodeAttr(null)
        }
    };

    // delete shape
    const handleBSKeyDown = (event: KeyboardEvent) => {
        if (selectedId && (event.key === 'Backspace')) {
            const newShapeArray = shapeArray.slice();
            const indexOfShapeToBeDeleted = shapeArray.findIndex((oldData) => oldData.id === selectedId);
            newShapeArray.splice(indexOfShapeToBeDeleted, 1)
            setShapeArray(newShapeArray)
            setSelectedId(null)
        }
    }
    useEffect(() => {
        // @ts-ignore
        window.addEventListener('keydown', handleBSKeyDown);

        return () => {
            // @ts-ignore
            window.removeEventListener('keydown', handleBSKeyDown);
        };
    }, [selectedId]);

//downloading plan as picture
    const layerRef: RefObject<Konva.Layer> = useRef(null);
    const linkToDownloadImage = layerRef.current?.toDataURL()

//everything, that goes to canvas
    const content = shapeArray?.map((shapeData) => {
        switch (shapeData?.type) {
            case 'room':
                return (
                    <Room key={shapeData.id}
                          selectedNodeId={selectedId}
                          setSelectedId={setSelectedId}
                          providedAttrs={shapeData}
                          updateCanvasData={updateCanvasData}
                    />);
            case 'outerWalls' :
                return (
                    <OuterWalls key={shapeData.id}
                                selectedNodeId={selectedId}
                                setSelectedId={setSelectedId}
                                providedAttrs={shapeData}
                                updateCanvasData={updateCanvasData}
                    />);

        }
    })

    return (<>
            {!projectId ? <SetProjectForm setProjectId={setProjectId}/> :
                <div className={styles.container} id={'workspace'}>
                    <div className={styles.leftbar}>
                        <div className={styles.tools}>
                            <Button onClickHandler={() => addShape('room', setShapeArray)}>Room</Button>
                            <Button onClickHandler={() => addShape('outerWalls', setShapeArray)}>Outer Walls</Button>
                        </div>
                        <div className={styles.info}>
                            {selectedNodeAttrs ? <>
                                    <p>X: {selectedNodeAttrs.x}</p>
                                    <p>Y: {selectedNodeAttrs.y}</p>
                                    <p>H: {selectedNodeAttrs.height}</p>
                                    <p>W: {selectedNodeAttrs.width}</p></> :
                                ''
                            }
                        </div>
                        <div className={styles.save}>
                            {linkToDownloadImage && <DownloadImage href={linkToDownloadImage}/>}
                            <SavePlan project_id={project_id} data={
                                {...projectData, data: shapeArray}}/>
                        </div>
                    </div>
                    <Stage height={canvasSize.height} width={canvasSize.width} onMouseDown={checkDeselect}>
                        <Layer ref={layerRef}>
                            <Text text={projectData?.title} padding={16} fontFamily={"Lexend Deca"} fontSize={32}
                                  fill={'#333333'}/>
                            {content}
                        </Layer>
                        <GridLayer/>
                    </Stage>
                </div>

            } </>
    )
}
