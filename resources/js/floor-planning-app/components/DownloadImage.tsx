import {Button} from "./Button";
import React from "react";

export const DownloadImage = ({href}: {href: string}) => {
    return <Button onClickHandler={() => {
        const a = document.createElement("a");
        a.href = href;
        a.download = "image.png";
        a.click()
    }} type='passive'>.png</Button>
}
