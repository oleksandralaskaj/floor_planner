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
    // const trRef: RefObject<Konva.Transformer> = createRef()
    //
    // useEffect(() => {
    //     if (isSelected() && labelRef.current) {
    //         // we need to attach transformer manually
    //         trRef.current?.nodes([labelRef.current]);
    //         trRef.current?.getLayer()?.batchDraw();
    //     }
    // }, [selectedNodeId]);

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
                <Rect
                    fill={'white'}
                    width={attrs.width}
                    height={attrs.height}
                />
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
