import { Alert, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export interface MessageBoxProps {
    title: string,
    content: string,
    open: boolean,
}

export default function MessageBox(props: MessageBoxProps) {
    return (
        <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <Alert>
                    <Typography> {props.content} </Typography>
                </Alert>
            </DialogContent>
        </Dialog>
    )
}