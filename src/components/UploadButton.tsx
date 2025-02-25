import { Button } from "@mui/material";
import React, { ChangeEvent } from "react";

export interface UploadButtonProps {
    children?: React.ReactNode;
    onChange?: (ev:ChangeEvent<HTMLInputElement>)=>void;
}

export default function UploadButton(props:UploadButtonProps) {
    return (
        <Button variant="contained" component="label">
            {props.children}
            <input 
                type="file"
                style={{
                    clip: 'rect(0 0 0 0)',
                    clipPath: 'inset(50%)',
                    height: 1,
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    whiteSpace: 'nowrap',
                    width: 1,
                }}
                onChange={props.onChange}
            />
        </Button>
    )
}