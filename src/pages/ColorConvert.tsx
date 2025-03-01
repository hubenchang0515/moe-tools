import { Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Colors, { HEX2RGB, HSL2RGB, HSV2RGB, RGB2HEX, RGB2HSL, RGB2HSV, RGB2YUV } from "../features/Colors";
import Debounce from "../features/Debounce";

export default function ColorConvert() {
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.color-convert")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.color-convert"));
    }, [t]);

    const [_, setFocusRGB] = useState(false);
    const [RGB_R, setRGB_R] = useState(0);
    const [RGB_G, setRGB_G] = useState(0);
    const [RGB_B, setRGB_B] = useState(0);

    const [focusHSL, setFocusHSL] = useState(false);
    const [HSL_H, setHSL_H] = useState(0);
    const [HSL_S, setHSL_S] = useState(0);
    const [HSL_L, setHSL_L] = useState(0);

    const [focusHSV, setFocusHSV] = useState(false);
    const [HSV_H, setHSV_H] = useState(0);
    const [HSV_S, setHSV_S] = useState(0);
    const [HSV_V, setHSV_V] = useState(0);

    const [focusYUV, setFocusYUV] = useState(false);
    const [YUV_Y, setYUV_Y] = useState(0);
    const [YUV_U, setYUV_U] = useState(0);
    const [YUV_V, setYUV_V] = useState(0);

    const [focusHEX, setFocusHEX] = useState(false);
    const [HEX, setHEX] = useState("#000000");

    useEffect(() => {
        if (!focusHEX) {
            const HEX = RGB2HEX([RGB_R, RGB_G, RGB_B]);
            setHEX(HEX);
        }

        if (!focusHSL) {
            const HSL = RGB2HSL([RGB_R, RGB_G, RGB_B]);
            setHSL_H(HSL[0]);
            setHSL_S(HSL[1]);
            setHSL_L(HSL[2]);
        }

        if (!focusHSV) {
            const HSV = RGB2HSV([RGB_R, RGB_G, RGB_B]);
            setHSV_H(HSV[0]);
            setHSV_S(HSV[1]);
            setHSV_V(HSV[2]);
        }

        if (!focusYUV) {
            const YUV = RGB2YUV([RGB_R, RGB_G, RGB_B]);
            setYUV_Y(YUV[0]);
            setYUV_U(YUV[1]);
            setYUV_V(YUV[2]);
        }
    }, [RGB_R, RGB_G, RGB_B]);

    useEffect(() => {
        if (!focusHSL) {
            return;
        }
        const RGB = HSL2RGB([HSL_H, HSL_S, HSL_L]);
        setRGB_R(RGB[0]);
        setRGB_G(RGB[1]);
        setRGB_B(RGB[2]);
    }, [HSL_H, HSL_S, HSL_L]);

    useEffect(() => {
        if (!focusHSV) {
            return;
        }
        const RGB = HSV2RGB([HSV_H, HSV_S, HSV_V]);
        setRGB_R(RGB[0]);
        setRGB_G(RGB[1]);
        setRGB_B(RGB[2]);
    }, [HSV_H, HSV_S, HSV_V]);

    useEffect(() => {
        if (!focusYUV) {
            return;
        }
        const RGB = HSV2RGB([YUV_Y, YUV_U, YUV_V]);
        setRGB_R(RGB[0]);
        setRGB_G(RGB[1]);
        setRGB_B(RGB[2]);
    }, [YUV_Y, YUV_U, YUV_V]);

    useEffect(() => {
        if (!focusHEX) {
            return;
        }
        const RGB = HEX2RGB(HEX);
        setRGB_R(RGB[0]);
        setRGB_G(RGB[1]);
        setRGB_B(RGB[2]);
    }, [HEX]);

    const setHEX2 = Debounce(setHEX);

    const copyRGB = useCallback(() => {
        navigator.clipboard.writeText(`rgb(${RGB_R}, ${RGB_G}, ${RGB_B})`);
    }, [RGB_R, RGB_G, RGB_B]);

    const copyHSL = useCallback(() => {
        navigator.clipboard.writeText(`hsl(${HSL_H}, ${HSL_S}, ${HSL_L})`);
    }, [HSL_H, HSL_S, HSL_L]);

    const copyHSV = useCallback(() => {
        navigator.clipboard.writeText(`hsv(${HSV_H}, ${HSV_S}, ${HSV_V})`);
    }, [HSV_H, HSV_S, HSV_V]);

    const copyYUV = useCallback(() => {
        navigator.clipboard.writeText(`yuv(${YUV_Y}, ${YUV_U}, ${YUV_V})`);
    }, [YUV_Y, YUV_U, YUV_V]);

    const copyHEX = useCallback(() => {
        navigator.clipboard.writeText(HEX);
    }, [HEX]);
    
    return (
        <Container maxWidth="xl" sx={{paddingY:2}}>
            <Stack spacing={1}>
                <Stack spacing={1} alignItems='center' justifyContent='center'>
                    <input type="color" style={{width:128, height:128}} value={HEX} onChange={(ev)=>{setHEX2(ev.target.value)}} onFocus={()=>setFocusHEX(true)} onBlur={()=>setFocusHEX(false)}/>
                    <Typography>{t("color-convert.hint")}</Typography>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>RGB:</Typography>
                    <TextField label="R" fullWidth value={Math.round(RGB_R)} onChange={(ev)=>setRGB_R(Number(ev.target.value)||0)} onFocus={()=>setFocusRGB(true)} onBlur={()=>setFocusRGB(false)}/>
                    <TextField label="G" fullWidth value={Math.round(RGB_G)} onChange={(ev)=>setRGB_G(Number(ev.target.value)||0)} onFocus={()=>setFocusRGB(true)} onBlur={()=>setFocusRGB(false)}/>
                    <TextField label="B" fullWidth value={Math.round(RGB_B)} onChange={(ev)=>setRGB_B(Number(ev.target.value)||0)} onFocus={()=>setFocusRGB(true)} onBlur={()=>setFocusRGB(false)}/>
                    <Button variant="contained" onClick={copyRGB}>{t("common.copy")}</Button>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>HSL:</Typography>
                    <TextField label="H" fullWidth value={Math.round(HSL_H)} onChange={(ev)=>setHSL_H(Number(ev.target.value)||0)} onFocus={()=>setFocusHSL(true)} onBlur={()=>setFocusHSL(false)}/>
                    <TextField label="S" fullWidth value={Math.round(HSL_S)} onChange={(ev)=>setHSL_S(Number(ev.target.value)||0)} onFocus={()=>setFocusHSL(true)} onBlur={()=>setFocusHSL(false)}/>
                    <TextField label="L" fullWidth value={Math.round(HSL_L)} onChange={(ev)=>setHSL_L(Number(ev.target.value)||0)} onFocus={()=>setFocusHSL(true)} onBlur={()=>setFocusHSL(false)}/>
                    <Button variant="contained" onClick={copyHSL}>{t("common.copy")}</Button>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>HSV:</Typography>
                    <TextField label="H" fullWidth value={Math.round(HSV_H)} onChange={(ev)=>setHSV_H(Number(ev.target.value)||0)} onFocus={()=>setFocusHSV(true)} onBlur={()=>setFocusHSV(false)}/>
                    <TextField label="S" fullWidth value={Math.round(HSV_S)} onChange={(ev)=>setHSV_S(Number(ev.target.value)||0)} onFocus={()=>setFocusHSV(true)} onBlur={()=>setFocusHSV(false)}/>
                    <TextField label="V" fullWidth value={Math.round(HSV_V)} onChange={(ev)=>setHSV_V(Number(ev.target.value)||0)} onFocus={()=>setFocusHSV(true)} onBlur={()=>setFocusHSV(false)}/>
                    <Button variant="contained" onClick={copyHSV}>{t("common.copy")}</Button>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>YUV:</Typography>
                    <TextField label="Y" fullWidth value={Math.round(YUV_Y)} onChange={(ev)=>setYUV_Y(Number(ev.target.value)||0)} onFocus={()=>setFocusYUV(true)} onBlur={()=>setFocusYUV(false)}/>
                    <TextField label="U" fullWidth value={Math.round(YUV_U)} onChange={(ev)=>setYUV_U(Number(ev.target.value)||0)} onFocus={()=>setFocusYUV(true)} onBlur={()=>setFocusYUV(false)}/>
                    <TextField label="V" fullWidth value={Math.round(YUV_V)} onChange={(ev)=>setYUV_V(Number(ev.target.value)||0)} onFocus={()=>setFocusYUV(true)} onBlur={()=>setFocusYUV(false)}/>
                    <Button variant="contained" onClick={copyYUV}>{t("common.copy")}</Button>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>HEX:</Typography>
                    <TextField label="#HEX" fullWidth value={HEX} onChange={(ev)=>setHEX(ev.target.value)} onFocus={()=>setFocusHEX(true)} onBlur={()=>setFocusHEX(false)}/>
                    <Button variant="contained" onClick={copyHEX}>{t("common.copy")}</Button>
                </Stack>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>{t("color-convert.preview")}</strong></TableCell>
                                <TableCell align="center"><strong>{t("color-convert.name")}</strong></TableCell>
                                <TableCell align="center"><strong>{t("color-convert.rgb")}</strong></TableCell>
                                <TableCell align="center"><strong>{t("color-convert.hex")}</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Colors.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{backgroundColor:`rgb(${item.rgb.join(',')})`}}></TableCell>
                                            <TableCell align="center">{item.name}</TableCell>
                                            <TableCell align="center">{item.rgb.join(',')}</TableCell>
                                            <TableCell align="center">{RGB2HEX(item.rgb)}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    )
}