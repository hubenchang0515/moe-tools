import { Alert, Dialog, Typography, AlertProps, AlertTitle } from "@mui/material";

export interface MessageBoxProps {
    title: string;
    content: string;
    open: boolean;
    variant?: AlertProps['variant'];
    severity?: AlertProps['severity'];
    children?: JSX.Element;
    onClose: AlertProps['onClose'];
}

export default function MessageBox(props: MessageBoxProps) {
    return (
        <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
            <Alert variant={props.variant} severity={props.severity} onClose={props.onClose}>
                <AlertTitle sx={{fontWeight: 600}}> {props.title} </AlertTitle>
                <Typography> {props.content} </Typography>
                {
                    props.children
                }
            </Alert>
        </Dialog>
    )
}