
import { Box, Fab, FabProps } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import MessageBox, { MessageBoxProps } from "./MessageBox";

export interface FabMessageProps {
    open: boolean
    title: string;
    content: string;
    severity?: MessageBoxProps['severity'];
    variant?: MessageBoxProps['variant'];
    onOpen?: FabProps['onClick'];
    onClose?: MessageBoxProps['onClose'];
    sx?: FabProps['sx'];
    children?: JSX.Element;
}

export default function FabMessage(props:FabMessageProps) {
    return (
        <Box>
            <Fab 
                color={props.severity}
                sx={props.sx}
                onClick={props.onOpen}
            >
                <MessageIcon />
            </Fab>
            <MessageBox 
                title={props.title}
                content={props.content}
                variant={props.variant}
                severity={props.severity}
                open={props.open}
                onClose={props.onClose}
            >
                <Box>
                    { props.children }
                </Box>
            </MessageBox>
        </Box>
    )
}