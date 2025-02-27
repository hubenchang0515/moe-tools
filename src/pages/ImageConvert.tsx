import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import UploadButton from "../components/UploadButton";
import { ChangeEvent, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CreateIcon } from "../features/WinIcon";

export default function ImageConvert() {
    const { t } = useTranslation();
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const openImage = useCallback((ev:ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files || ev.target.files.length == 0) {
            return;
        }
        const file = ev.target.files[0];
        const url = URL.createObjectURL(file);
        const img = new Image();
        imgRef.current!.src = url;
        img.src = url;
        img.onload = () => {
            if (!canvasRef.current) {
                return;
            }
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx) {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
        }
    }, [imgRef, canvasRef])

    const makeDownload = useCallback((format:string) => {
        return () => {
            if (!canvasRef.current) {
                return;
            }

            if (format === 'ico') {
                canvasRef.current.toBlob((blob) => {
                    if (!blob) {
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        const buffer:ArrayBuffer = ev.target?.result as ArrayBuffer;
                        const ico = CreateIcon(new Uint8Array(buffer));
                        const icoBlob = new Blob([ico]);
                        const url = URL.createObjectURL(icoBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'image.ico';
                        link.click();
                    };                    
                    
                    reader.readAsArrayBuffer(blob);
                }, 'image/png', 1);
            } else {
                canvasRef.current.toBlob((blob) => {
                    if (!blob) {
                        return;
                    }
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `image.${format}`;
                    link.click();
                }, `image/${format}`, 1);
            }
        }
    }, [canvasRef]);

    return (
        <Container maxWidth='xl' sx={{height:'100%', paddingY: 1}}>
            <Box height='100%' display='flex' flexDirection='column' gap={1}>
                <Box sx={{flex:1, display:'flex', overflow:'hidden', justifyContent:'center'}}>
                    <img ref={imgRef} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}}></img>
                </Box>
                <UploadButton onChange={openImage}>
                    {t("common.open")}
                </UploadButton>
                <TableContainer component={Paper} sx={{flexShrink:0}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">PNG(.png)</TableCell>
                                <TableCell align="center">JPEG(.jpg)</TableCell>
                                <TableCell align="center">WEBP(.webp)</TableCell>
                                <TableCell align="center">ICON(.ico)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Button variant='text' onClick={makeDownload('png')}>
                                        {t("common.download")}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant='text' onClick={makeDownload('jpeg')}>
                                        {t("common.download")}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant='text' onClick={makeDownload('webp')}>
                                        {t("common.download")}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant='text' onClick={makeDownload('ico')}>
                                        {t("common.download")}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{display:'none'}}>
                    <canvas ref={canvasRef}/>
                </Box>
            </Box>
        </Container>
    )
}