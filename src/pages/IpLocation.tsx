import { Button, CircularProgress, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DataRow {
    ip: string;
    country: string;
    city: string;
    lonlat: string;
    isp: string;
}

const makeDataRow = ():DataRow => {
    return {
        ip: "-",
        country: "-",
        city: "-",
        lonlat: "-",
        isp: "-",
    }
}

const lonlat = (lon:number, lat:number) => {
    return `${lon >= 0 ? lon : -lon}${lon >= 0 ? 'E' : 'W'}, ${lat >= 0 ? lat : -lat}${lat >= 0 ? 'N' : 'S'}`
}

type ApiStatus = "success" | "failed" | "loading";

abstract class IpLocationApi {
    protected m_status: ApiStatus;
    protected m_data: DataRow;

    constructor() {
        this.m_status = "loading";
        this.m_data = makeDataRow();
    }

    abstract api(): string;

    status(): ApiStatus {
        return this.m_status;
    }

    data(): DataRow {
        return this.m_data;
    }

    abstract fetchData(id:string): Promise<void>;
};

class Api1 extends IpLocationApi {
    api(): string {
        return "api.vore.top";
    }

    async fetchData(ip:string): Promise<void> {
        try {
            this.m_status = "loading";
            const response = await fetch(`https://api.vore.top/api/IPdata?ip=${ip}`);
            const data = await response.json();
            this.m_data = {
                ...makeDataRow(),
                ip: data.ipinfo.text,
                city: data.ipdata.info2,
                isp: data.ipdata.isp,
            }
            this.m_status = "success";
        } catch {
            this.m_status = "failed";
            this.m_data = makeDataRow();
        }
    }
}

class Api2 extends IpLocationApi {
    api(): string {
        return "api.ip.sb";
    }

    async fetchData(ip:string): Promise<void> {
        try {
            this.m_status = "loading";
            const response = await fetch(`https://api.ip.sb/geoip/${ip}`);
            const data = await response.json();
            this.m_data = {
                ...makeDataRow(),
                ip: data.ip,
                country: data.country,
                isp: data.isp,
            }
            this.m_status = "success";
        } catch {
            this.m_status = "failed";
            this.m_data = makeDataRow();
        }
    }
}

class Api3 extends IpLocationApi {
    api(): string {
        return "api.iplocation.net";
    }

    async fetchData(ip:string): Promise<void> {
        try {
            this.m_status = "loading";
            if (!ip) {
                ip = (await (await fetch("https://api.iplocation.net/?cmd=get-ip")).json()).ip;
            }
            const response = await fetch(`https://api.iplocation.net/?ip=${ip}`);
            const data = await response.json();
            this.m_data =  {
                ...makeDataRow(),
                ip: data.ip,
                country: data.country_name,
                isp: data.isp,
            }
            this.m_status = "success";
        } catch {
            this.m_status = "failed";
            this.m_data = makeDataRow();
        }
    }
}

class Api4 extends IpLocationApi {
    api(): string {
        return "ip-api.com";
    }

    async fetchData(ip:string): Promise<void> {
        try {
            this.m_status = "loading";
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            const data = await response.json();
            this.m_data = {
                ...makeDataRow(),
                ip: data.query,
                country: data.country,
                city: data.city,
                isp: data.isp,
                lonlat: lonlat(data.lon, data.lat),
            }
            this.m_status = "success";
        } catch {
            this.m_status = "failed";
            this.m_data = makeDataRow();
        }
    }
}

const API_LIST = [new Api1, new Api2, new Api3, new Api4];

export default function IpLocation() {
    const { t } = useTranslation();
    const [input, setInput] = useState<string>("");
    const [ip, setIp] = useState<string>("");
    const [rows, setRows] = useState<IpLocationApi[]>(API_LIST);

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.ip-location")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.ip-location"));
    }, [t]);

    useEffect(() => {
        for (const row of rows) {
            row.fetchData(ip).then(() => {
                setRows([...API_LIST]);
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
                                            <TableCell><Typography color={row.status() === "success" ? "success" : row.status() === "failed" ? "error" : "inherit"}>{row.api()}</Typography></TableCell>
                                            <TableCell>{row.status() === 'loading' ? <CircularProgress size="1em"/> : row.data().ip}</TableCell>
                                            <TableCell>{row.status() === 'loading' ? <CircularProgress size="1em"/> : row.data().country}</TableCell>
                                            <TableCell>{row.status() === 'loading' ? <CircularProgress size="1em"/> : row.data().city}</TableCell>
                                            <TableCell>{row.status() === 'loading' ? <CircularProgress size="1em"/> : row.data().lonlat}</TableCell>
                                            <TableCell>{row.status() === 'loading' ? <CircularProgress size="1em"/> : row.data().isp}</TableCell>
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