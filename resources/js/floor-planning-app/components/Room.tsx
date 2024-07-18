import React, {createRef, RefObject, useEffect, useState} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import {GRIDCELLSIZE} from '../pages/Planner'
import Konva from "konva";
import {Attrs} from "../pages/Planner";

export const Room = ({providedAttrs, selectedNodeId, setSelectedId, updateCanvasData}) => {
    const [attrs, setAttrs] = useState<Attrs>({
        ...providedAttrs
    })


    const isSelected = () => {
        return selectedNodeId === attrs.id
    }

    const shapeRef: RefObject<Konva.Group> = createRef()
    const trRef: RefObject<Konva.Transformer> = createRef()

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
            <Group
                ref={shapeRef}
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
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // but in the memory we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;

                    if (node === null) return

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
            >
                <Rect
                    strokeWidth={10}
                    stroke={'#5d5c5c'}
                    onMouseDown={() => {
                        setSelectedId(attrs.id)
                        updateCanvasData(attrs)
                    }}
                    height={attrs.height}
                    width={attrs.width}
                    fill={'white'}

                />
                {
                    attrs.height >= 80 && <Text
                        fontFamily="Lexend Deca"
                        padding={10}
                        text={attrs.height / 100 + ' m'}
                        x={5}
                        y={(attrs.height / 2) - 20}/>
                }
                {
                    attrs.width >= 80 && <Text
                        fontFamily="Lexend Deca"
                        padding={10}
                        text={attrs.width / 100 + ' m'}
                        x={(attrs.width / 2) - 20}
                        y={5}/>
                }
                {
                    (attrs.width >= 80 && attrs.height >= 80) && <Text
                        fontFamily="Lexend Deca"
                        fill={'#0089ff'}
                        padding={10}
                        text={`${Math.round(attrs.width * attrs.height) / 10000} m²`}
                        x={5}
                        y={(attrs.height) - 40}/>
                }
            </Group>
            {isSelected() && (
                <Transformer
                    anchorSize={10}
                    anchorCornerRadius={5}
                    anchorFill={'#75b6ed'}
                    anchorStroke={'#0089ff'}
                    anchorStrokeWidth={2}
                    ref={trRef}
                    flipEnabled={false}
                    padding={-5}
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
