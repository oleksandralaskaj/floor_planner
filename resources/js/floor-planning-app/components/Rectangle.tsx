import React, {createRef, LegacyRef, ReactNode, RefObject, useEffect, useRef, useState} from "react";
import {KonvaNodeComponent, Rect, Transformer} from "react-konva";
import {GRIDCELLSIZE} from '../pages/Planner'
import Konva from "konva";
import {Attrs} from "../pages/Planner";

export const Rectangle = ({providedAttrs, selectedNodeId, setSelectedId, updateCanvasData}) => {
    const [attrs, setAttrs] = useState<Attrs>({
        id: providedAttrs.id,
        x: providedAttrs.x,
        y: providedAttrs.y,
        height: providedAttrs.height,
        width: providedAttrs.width,
        rotation: providedAttrs.rotation,
    })


    const isSelected = () => {
        return selectedNodeId === attrs.id
    }

    const shapeRef: React.RefObject<Konva.Rect> = createRef()
    const trRef: React.RefObject<Konva.Transformer> = React.createRef()

    useEffect(() => {
        if (isSelected() && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [selectedNodeId]);

    useEffect(() => {
        updateCanvasData(attrs)
    }, [attrs]);


    return (
        <>
            <Rect
                onMouseDown={() => {
                    setSelectedId(attrs.id)
                    updateCanvasData(attrs)
                }}
                ref={shapeRef}
                {...attrs}
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
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // but in the memory we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;

                    if(node === null) return

                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    setAttrs({
                        ...attrs,
                        x: Math.round(e.target.x() / GRIDCELLSIZE) * GRIDCELLSIZE,
                        y: Math.round(e.target.y() / GRIDCELLSIZE) * GRIDCELLSIZE,
                        // set minimal value
                        width: Math.max(5, Math.round((node.width() * scaleX) / GRIDCELLSIZE) * GRIDCELLSIZE),
                        height: Math.max(5, Math.round((node.height() * scaleY) / GRIDCELLSIZE) * GRIDCELLSIZE),
                        rotation: Math.ceil(node.rotation() * scaleY)
                    })
                }
                }
            />
            {isSelected() && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    // centeredScaling={true}
                    rotationSnaps={[0, 90, 180, 270]}
                    boundBoxFunc={(oldBox, newBox) => {
                        // sets minimum height and width of a node
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
}
