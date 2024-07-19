import {Group, Rect, Text, Transformer} from "react-konva";
import React, {createRef, RefObject, useEffect, useState} from "react";
import Konva from "konva";
import {Attrs, GRIDCELLSIZE} from "../pages/Planner";

export const Label = ({selectedNodeId, providedAttrs, updateCanvasData, setSelectedId}) => {
    const [attrs, setAttrs] = useState<Attrs>({
        ...providedAttrs
    })
    const isSelected = () => {
        return selectedNodeId === attrs.id
    }
    const labelRef: RefObject<Konva.Group> = createRef()

    useEffect(() => {
        updateCanvasData(attrs)
    }, [attrs]);


    return (<>
            <Group
                ref={labelRef}
                width={attrs.width}
                height={attrs.height}
                x={attrs.x}
                y={attrs.y}
                draggable
                onDragEnd={(e) => {
                    e.target.to({
                        x: Math.round(e.target.x() / GRIDCELLSIZE) * GRIDCELLSIZE,
                        y: Math.round(e.target.y() / GRIDCELLSIZE) * GRIDCELLSIZE,
                    })
                    setAttrs({
                        ...attrs,
                        x: Math.round(e.target.x() / GRIDCELLSIZE) * GRIDCELLSIZE,
                        y: Math.round(e.target.y() / GRIDCELLSIZE) * GRIDCELLSIZE,
                    })
                }}
            >
                <Text
                    fontSize={16}
                    fontFamily={"Lexend Deca"}
                    fill={"#0089ff"}
                    align={'center'}
                    verticalAlign={'middle'}
                    text={attrs.text}
                    onMouseDown={() => {
                        setSelectedId(attrs.id)
                        updateCanvasData(attrs)
                    }}
                    height={attrs.height}
                    width={attrs.width}
                />

            </Group>
        </>
    )
}
