import { Box, Button, Dialog, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from "react-i18next";

export interface DownloadDialogProps {
    open: boolean
    value: number
    max: number

    onCancel?: () => void
}

export default function DownloadDialog(props: DownloadDialogProps) {
    // i18n
    const { t } = useTranslation();
    
    const progress = props.value / props.max * 100;
    return (
        <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
            <DialogTitle>{t("components.progress")}</DialogTitle>
            <DialogContent sx={{minWidth: '20vw'}}>
                <Stack spacing={2}>
                    <Box alignItems="center">
                        <Box sx={{ flexGrow:1 }}>
                            <LinearProgress sx={{height:'2em', mb:'-2em'}} variant="determinate" value={progress}/>
                        </Box>
                        <Typography textAlign="center" sx={{position: 'relative', height: '2em', lineHeight: '2em', zIndex:1}}>{props.value}/{props.max}</Typography>
                    </Box>
                    <Box display='flex'>
                        <Box flexGrow={1}/>
                        <Button variant="outlined" color="warning" onClick={props.onCancel}><CancelIcon/>{t("components.cancel")}</Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}