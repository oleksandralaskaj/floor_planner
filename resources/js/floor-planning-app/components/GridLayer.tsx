import React from "react";
import {Layer, Line} from "react-konva";
import {GRIDCELLSIZE} from '../pages/Planner'

export const GridLayer=()=> {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const padding = GRIDCELLSIZE;
    const vertLinesPoints :number[][] = []
    const horizLinesPoints: number[][] = []

    for (let i = 0; i < width / padding; i++) {
        vertLinesPoints.push(
            [(Math.round(i * padding) + 0.5), 0, (0.5 + Math.round(i * padding)), height])
        }
    for (let j = 0; j < height / padding; j++) {
        horizLinesPoints.push(
            [0, Math.round(j * padding), width, Math.round(j * padding)])
        }
    return <Layer>
        {
            vertLinesPoints.map((vertLinesPointsItem, i)=>
                <Line key={i} points={vertLinesPointsItem} stroke='#ddd' strokeWidth={0.5}/>
            )
        }
        {
            horizLinesPoints.map((vertLinesPointsItem,i)=>
                <Line  key={i} points={vertLinesPointsItem} stroke='#ddd' strokeWidth={0.5}/>
            )
        }
    </Layer>
}
