import { IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
    return (
        <Paper sx={{display: "flex", pl:2, flexShrink: 1}} elevation={0}>
            <InputBase sx={{ minWidth: 0,flexShrink: 1}} />
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}