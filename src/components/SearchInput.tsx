import { IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export interface SearchInputProps {
    onSearch?: (text:string)=>void
}

export default function SearchInput(props:SearchInputProps) {
    const [text, setText] = useState<string>("");
    return (
        <Paper sx={{display: "flex", pl:2, flexShrink: 1}} elevation={0}>
            <InputBase 
                sx={{ minWidth: 0,flexShrink: 1}} 
                value={text} 
                onChange={(ev)=>setText(ev.target.value)}
                onKeyDown={(ev) => {
                    if (ev.key === "Enter" && text) {
                        props.onSearch?.(text)
                    }
                }}
            />
            <IconButton 
                onClick={()=>{
                    if (text) {
                        props.onSearch?.(text)
                    }
                }}
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}