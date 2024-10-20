import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from "react-i18next";

export interface ProgressDialogProps {
    open: boolean
    value: number
    max: number
    message?: string

    onCancel?: () => void
}

export default function ProgressDialog(props: ProgressDialogProps) {
    // i18n
    const { t } = useTranslation();
    
    const progress = props.value / props.max * 100;

    return (
        <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
            <DialogTitle>{t("components.progress")}</DialogTitle>
            <DialogContent sx={{minWidth: '20vw'}}>
                <Stack spacing={2}>
                    <Box alignItems="center">
                        <Typography textAlign="center" sx={{position: 'relative', height: '2em', lineHeight: '2em'}}>{props.value}/{props.max}</Typography>
                        <Box sx={{ flexGrow:1 }}>
                            <LinearProgress variant="determinate" value={progress}/>
                        </Box>
                    </Box>
                    {props.message && (<Alert severity="info" sx={{pt:0, pb:0, mr:2}}>{props.message}</Alert>)}
                    <Box display='flex' alignItems='center'>
                        <Box flexGrow={1}/>
                        <Button variant="contained" color="warning" onClick={props.onCancel} sx={{minWidth:'4em', whiteSpace:'nowrap'}} startIcon={<CancelIcon/>}>{t("components.cancel")}</Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}