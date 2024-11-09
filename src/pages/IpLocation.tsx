import { Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataRow {
    api: string;
    ip: string;
    country: string;
    city: string;
    lonlat: string;
    isp: string;
    success: boolean;
}

const makeDataRow = ():DataRow => {
    return {
        api: "-",
        ip: "-",
        country: "-",
        city: "-",
        lonlat: "-",
        isp: "-",
        success: false,
    }
}

const lonlat = (lon:number, lat:number) => {
    return `${lon >= 0 ? lon : -lon}${lon >= 0 ? 'E' : 'W'}, ${lat >= 0 ? lat : -lat}${lat >= 0 ? 'N' : 'S'}`
}

const fetchApi1 = async (ip:string):Promise<DataRow> => {
    try {
        const response = await fetch(`https://api.vore.top/api/IPdata?ip=${ip}`);
        const data = await response.json();
        return {
            ...makeDataRow(),
            api: "api.vore.top",
            ip: data.ipinfo.text,
            city: data.ipdata.info2,
            isp: data.ipdata.isp,
            success: true,
        }
    } catch {
        return {
            ...makeDataRow(),
            api: "api.vore.top",
        }
    }
}

const fetchApi2 = async (ip:string):Promise<DataRow> => {
    try {
        const response = await fetch(`https://api.ip.sb/geoip/${ip}`);
        const data = await response.json();
        return {
            ...makeDataRow(),
            api: "api.ip.sb",
            ip: data.ip,
            country: data.country,
            isp: data.isp,
            success: true,
        }
    } catch {
        return {
            ...makeDataRow(),
            api: "api.ip.sb",
        }
    }
}

const fetchApi3 = async (ip:string):Promise<DataRow> => {
    try {
        if (!ip) {
            ip = (await (await fetch("https://api.iplocation.net/?cmd=get-ip")).json()).ip;
        }
        const response = await fetch(`https://api.iplocation.net/?ip=${ip}`);
        const data = await response.json();
        return {
            ...makeDataRow(),
            api: "api.iplocation.net",
            ip: data.ip,
            country: data.country_name,
            isp: data.isp,
            success: true,
        }
    } catch {
        return {
            ...makeDataRow(),
            api: "api.iplocation.net",
        }
    }
}

const fetchApi4 = async (ip:string):Promise<DataRow> => {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return {
            ...makeDataRow(),
            api: "ip-api.com",
            ip: data.query,
            country: data.country,
            city: data.city,
            isp: data.isp,
            lonlat: lonlat(data.lon, data.lat),
            success: true,
        }
    } catch {
        return {
            ...makeDataRow(),
            api: "ip-api.com",
        }
    }
}

const fetchApis = [fetchApi1, fetchApi2, fetchApi3, fetchApi4];

export default function IpLocation() {
    const { t } = useTranslation();
    const [input, setInput] = useState<string>("");
    const [ip, setIp] = useState<string>("");
    const [rows, setRows] = useState<DataRow[]>([]);
    
    useEffect(() => {
        let newRows:DataRow[] = [];
        for (const fetchApi of fetchApis) {
            fetchApi(ip).then((data) => {
                newRows = [...newRows, data];
                setRows(newRows);
            });
        }
    }, [ip]);

    return (
        <Container maxWidth="xl" sx={{my:2}}>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <TextField 
                        label="IP" 
                        value={input} 
                        onChange={(ev)=>setInput(ev.target.value)} 
                        onKeyDown={(ev) => {
                            if (ev.key === "Enter" && input) {
                                setIp(input);
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={()=>setIp(input)}
                    >
                        {t("ip-location.query")}
                    </Button>
                </Stack>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.api")}</strong></TableCell>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.ip")}</strong></TableCell>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.country")}</strong></TableCell>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.city")}</strong></TableCell>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.lonlat")}</strong></TableCell>
                                <TableCell sx={{whiteSpace:'nowrap'}}><strong>{t("ip-location.isp")}</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell><Typography color={row.success ? "success" : "error"}>{row.api}</Typography></TableCell>
                                            <TableCell>{row.ip}</TableCell>
                                            <TableCell>{row.country}</TableCell>
                                            <TableCell>{row.city}</TableCell>
                                            <TableCell>{row.lonlat}</TableCell>
                                            <TableCell>{row.isp}</TableCell>
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