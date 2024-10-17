import { Alert, Dialog, Typography, AlertProps } from "@mui/material";

export interface MessageBoxProps {
    title: string,
    content: string,
    severity?: AlertProps['severity'],
    element?: JSX.Element,
    open: boolean,

}

export default function MessageBox(props: MessageBoxProps) {
    return (
        <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
                <Alert variant="filled" severity={props.severity}>
                    <Typography> {props.content} </Typography>
                    <br/>
                    {
                        props.element
                    }
                </Alert>
        </Dialog>
    )
}