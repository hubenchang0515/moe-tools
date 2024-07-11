import { IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export interface SearchInputProps {

}

export default function SearchInput(props:SearchInputProps) {
    return (
        <Paper sx={{display: "flex", pl:2, flexShrink: 1}}>
            <InputBase sx={{ minWidth: 0,flexShrink: 1}} />
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}