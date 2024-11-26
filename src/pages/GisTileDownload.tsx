import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Graticule from 'ol/layer/Graticule.js';
import Stroke from 'ol/style/Stroke.js';
import {fromLonLat, toLonLat, transformExtent} from 'ol/proj.js';
import "ol/ol.css";
import { Alert, Box, Button, Grid2 as Grid, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Slide, Slider, Snackbar, Stack, TextField, Tooltip, Typography } from '@mui/material';
import streamSaver from 'streamsaver';
import Draw, { createBox } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Polygon, { fromExtent } from 'ol/geom/Polygon';
import { Coordinate } from 'ol/coordinate';
import ProgressDialog from '../components/ProgressDialog';
import { Feature } from 'ol';
import { useTranslation } from 'react-i18next';
import { CreateTarDataBlock, CreateTarEndBlock, CreateTarHeaderBlock } from '../features/Tar';
import * as mime from 'mime-types'


type DownloadHandler = (x:number, y:number, z:number, response:Response)=>Promise<void>;
type ErrorHandler = (x:number, y:number, z:number, error:any)=>Promise<void>;
class XYZDownloader {
    url: string;
    max: number;
    current: number;

    constructor(url:string, max: number) {
        this.url = url;
        this.max = max;
        this.current = 0;
    }

    // Promise 表示全部下载完毕
    done(): Promise<void> {
        return new Promise(resolve => {
            const check = () => {
                if (this.current === 0) {
                    resolve();
                } else {
                    setTimeout(check, 0);
                }
            }

            check();
        })
    }

    // Promise 表示下载器可用，即可以添加任务
    available(): Promise<void> {
        return new Promise(resolve => {
            const check = () => {
                if (this.current < this.max ) {
                    resolve();
                } else {
                    setTimeout(check, 0);
                }
            }

            check();
        })
    }

    // Promise 表示任务添加成功，而不是下载完毕
    addTask(x:number, y:number, z:number, callback:DownloadHandler, error:ErrorHandler, retry:boolean=false): Promise<void> {
        return new Promise(async resolve => {
            if (!retry) {
                await this.available();
                this.current++;
            }
            resolve();

            const url = this.url.replace('{z}', `${z}`).replace('{x}', `${x}`).replace('{y}', `${y}`);
            try {
                const response = await fetch(url);
                await callback(x, y, z, response);
            } catch (err) {
                await error(x, y, z, err);
            }

            if (!retry) {
                this.current--;
            }
        });
    }
}

interface TileServerProps {
    name: string,
    url: string,
    filter: string,
}

// WGS84(EPSG:3857)
const Proj = {
    radians: (degrees:number) => {
        return degrees * (Math.PI/180);
    },

    longitudeToX: (v:number, zoom:number) => {
        const x = Math.floor(256 / (2 * Math.PI) *  Math.pow(2, zoom) * (Proj.radians(v) + Math.PI)/256);
        return x < Math.pow(2, zoom) ? x : Math.pow(2, zoom) - 1;
    },

    latitudeToY: (v:number, zoom:number) => {
        const y = Math.floor(256 / (2 * Math.PI) * Math.pow(2, zoom) * (Math.PI - Math.log(Math.tan(Math.PI/4 + Proj.radians(v)/2)))/256);
        return y < Math.pow(2, zoom) ? y : Math.pow(2, zoom) - 1;
    }
}

// 判断是否是 GTS URL
const isGisUrl = (text:string) => {
    if (!text.includes("{x}") || !text.includes("{y}") || !text.includes("{z}")) {
        return false;
    }

    try {
        const url = new URL(text);
        if (url.origin === 'null') {
            return false;
        }
    } catch {
        return false;
    }

    return true;
}

export default function GisTileDownload() {
    // i18n
    const { t } = useTranslation();

    // SEO
    useEffect(() => {
        document.title = `${t("title")} - ${t("pages.gis-tile-download")}`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t("description.gis-tile-download"));
    }, [t]);
    
    const servers = useMemo<TileServerProps[]>(() => [
        {
            name: t("gis-tile-download.google-map"),
            url: "https://mt1.google.com/vt/x={x}&y={y}&z={z}",
            filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
        },

        {
            name: t("gis-tile-download.auto-navi"),
            url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
        },

        {
            name: t("gis-tile-download.auto-navi-no-label"),
            url: "https://webst02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&ltype=3&x={x}&y={y}&z={z}",
            filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
        },

        {
            name: t("gis-tile-download.arc-gis"),
            url: "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png",
            filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
        },

        {
            name: t("gis-tile-download.osm"),
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            filter: 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)',
        },

        {
            name: t("gis-tile-download.google-satellite"),
            url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
            filter: 'none',
        },

        {
            name: t("gis-tile-download.auto-navi-satellite"),
            url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            filter: 'none',
        },

        {
            name: t("gis-tile-download.arc-gis-satellite"),
            url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
            filter: 'none',
        },
    ], [t]);

    // 选择哪个地图
    const [choice, setChoice] = useState(0);
    const [customUrl, setCustomUrl] = useState("");

    // 风格
    const theme = useTheme();

    const mapStyle = {
        height: "100%",
        width: "100%",
    };

    // 获取用户定位并将地图中心移动到该处
    const locate = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                mapRef.current?.getView().setCenter(fromLonLat([pos.coords.longitude, pos.coords.latitude]));
            })
        }
    }

    // 显示错误信息
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const closeSnakebar = (_:any, reason:string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    }

    // 选取范围
    const area = useRef<[Coordinate, Coordinate]>([[NaN, NaN],[NaN,NaN]]);
    const [zoomRange, setZoomRange] = useState<number[]>([0, 16]);

    // 下载图块
    const [progressValue, setProgressValue] = useState(0);
    const [progressMax, setProgressMax] = useState(1);
    const [showProgress, setShowProgress] = useState(false);
    const [concurrency, setConcurrency] = useState(10);
    const downloading = useRef(false);
    const download = async () => {
        const url = choice < servers.length ? servers[choice].url : customUrl;
        const FOLDER_NAME = "maps";
        if (isNaN(area.current[0][0])) {
            setAlertMessage(t("gis-tile-download.message.please-select"));
            setShowAlert(true);
            return;
        }
        downloading.current = true;
        setProgressValue(0);
        setShowProgress(true);

        let total = 0;
        for (let z = zoomRange[0]; z <= zoomRange[1]; z++) {
            total += (Proj.longitudeToX(area.current[1][0], z) - Proj.longitudeToX(area.current[0][0], z) + 1) * (Proj.latitudeToY(area.current[0][1], z) - Proj.latitudeToY(area.current[1][1], z) + 1);
        }
        setProgressMax(total);

        const fileStream = streamSaver.createWriteStream('gis-tiles.tar');
        const writer = fileStream.getWriter();

        let downloader = new XYZDownloader(url, concurrency);
        let done = 0;

        const downloadHandler: DownloadHandler = async (x, y, z, response) => {
            const data = await response.body?.getReader().read();
            const value = data?.value;

            if (value) {
                const ext = mime.extension(response.headers.get("content-type") || "image/png") || "png";
                const path = `${FOLDER_NAME}/${z}/${x}/${y}.${ext}`;
                const header = CreateTarHeaderBlock(path, value.length || 0);
                const content = CreateTarDataBlock(value);
                const entry = new Uint8Array(header.length + content.length); // 合并头部块和数据块，避免并发乱序
                entry.set(header);
                entry.set(content, header.length);
                await writer.write(entry);
                done++;
                setProgressValue(done);
            }
        }

        const errorHandler: ErrorHandler = async (x, y, z, err) => {
            if (err) {
                setAlertMessage(`${err}`);
                setShowAlert(true);
            } else {
                setAlertMessage(t("gis-tile-download.message.unknown-error"));
                setShowAlert(true);
            }

            // 失败重试
            if (downloading.current) {
                await downloader.addTask(x, y, z, downloadHandler, errorHandler, true); 
            }
        }

        for (let z = zoomRange[0]; z <= zoomRange[1]; z++) {
            for (let x = Proj.longitudeToX(area.current[0][0], z); x <= Proj.longitudeToX(area.current[1][0], z); x++) {
                for (let y = Proj.latitudeToY(area.current[1][1], z); y <= Proj.latitudeToY(area.current[0][1], z); y++) {

                    // 取消下载
                    if (!downloading.current) {
                        writer.abort(t("common.cancel"));
                        setShowProgress(false);
                        return;
                    }
                    
                    await downloader.addTask(x, y, z, downloadHandler, errorHandler);
                }
            }
        }

        await downloader.done();
        await writer.write(CreateTarEndBlock());
        await writer.close();
        setShowProgress(false);
        downloading.current = false;
    }

    const mapDivRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map|null>(null);
    const tileLayer = useRef<TileLayer<XYZ>|null>(null);
    const vectorSource = useRef<VectorSource|null>(null);
    const vectorLayer = useRef<VectorLayer|null>(null);
    const filter = useRef('none');

    // 切换明暗模式
    useEffect(() => {
        if (choice < servers.length) {
            filter.current = theme.palette.mode === 'dark' ? servers[choice].filter : 'none';
            mapRef.current?.render();
        }
    }, [theme.palette.mode, servers, choice]);

    // 切换地图服务器选项
    const loading = useRef(0);
    useEffect(() => {
        if (!mapDivRef.current) {
            return;
        }

        const url = choice < servers.length ? servers[choice].url : customUrl;
        const center = mapRef.current?.getView().getCenter() ?? fromLonLat([0, 0]);

        if (mapRef.current) {
            if (loading.current > 0) {
                mapRef.current.dispose();
                loading.current = 0;
            } else {
                tileLayer.current?.getSource()?.setUrl(url);
                return;
            }
        }
        
        // 地图块图层
        tileLayer.current = new TileLayer({
            source: new XYZ({  
                url: url,       
                wrapX: true,
            }),
        });

        // 渲染前设置黑暗滤镜
        tileLayer.current?.on('prerender', (ev) => {
            if (ev.context) {
                const ctx = ev.context as CanvasRenderingContext2D;
                ctx.filter = filter.current;
            }
        });

        // 渲染后删除滤镜，避免影响其他图层
        tileLayer.current?.on('postrender', (ev) => {
            if (ev.context) {
                const ctx = ev.context as CanvasRenderingContext2D;
                ctx.filter = 'none';
            }
        });

        // loading 计数
        tileLayer.current?.getSource()?.on('tileloadstart', () => {
            loading.current += 1;
        });

        tileLayer.current?.getSource()?.on('tileloadend', () => {
            loading.current -= 1;
        });

        // 矢量源-用于绘图
        vectorSource.current = new VectorSource();

        // 矢量图层-用于显示矢量源
        vectorLayer.current = new VectorLayer({
            source: vectorSource.current,
        });

        let map = new Map({
            target: mapDivRef.current,

            layers: [
                // 地图图块
                tileLayer.current,

                // 经纬度网格
                new Graticule({
                    strokeStyle: new Stroke({
                        color: 'gray',
                        width: 2,
                        lineDash: [0.5, 4],
                    }),
                    showLabels: true,
                    wrapX: true,
                }),

                // 绘图矢量图层
                vectorLayer.current,
            ],

            view: new View({
                center: center,
                zoom: 4,
            }),
        });

        let draw = new Draw({
            source: vectorSource.current,
            type: "Circle", 
            geometryFunction: createBox(),
            condition: (e) => e.originalEvent.buttons === 1,
        });

        // 清除绘制的图形
        draw.on('drawstart', () => {
            cleanDraw();
        });

        draw.on('drawabort', () => {
            cleanDraw();
        });

        draw.on('drawend', (ev) => {
            const geometry = ev.feature.getGeometry() as Polygon;
            const extent = geometry.getExtent();
            area.current = [toLonLat([extent[0], extent[1]]), toLonLat([extent[2], extent[3]])];
        });

        map.addInteraction(draw);

        // 右键取消绘图选取
        map.getViewport().addEventListener('contextmenu', function (evt) {
            evt.preventDefault(); // 阻止浏览器的默认右键菜单
            draw.abortDrawing();  // 取消当前的绘图
        });

        mapRef.current = map;
    }, [servers, choice, customUrl]);

    // 清除框选
    const cleanDraw = () => {
            vectorLayer.current?.getSource()?.clear();
            area.current = [[NaN, NaN],[NaN,NaN]];
    }

    // 框选全部
    const selectAll = () => {
        cleanDraw();
        const extent = transformExtent([-180, -85, 180, 85], 'EPSG:4326', "EPSG:3857")
        const box = new Feature({
            geometry: fromExtent(extent)
        })

        vectorLayer.current?.getSource()?.addFeature(box);
        area.current = [toLonLat([extent[0], extent[1]]), toLonLat([extent[2], extent[3]])];
    }

    return (
        <Box ref={mapDivRef} style={mapStyle}>
            <Box sx={{
                    position:"fixed", 
                    bottom:20, 
                    right:20,
                    zIndex:1, 
                }}
            >
                <Stack spacing={1}>
                    <Paper sx={{pt:1, pb:1, pl:1, pr:1, width:320}}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <Select fullWidth variant="standard" value={`${choice}`} onChange={(ev:SelectChangeEvent) => {setChoice(Number(ev.target.value));}}>
                                    {
                                        servers.map((server, index) => (
                                            <MenuItem key={index} value={index}>{server.name}</MenuItem>
                                        ))
                                    }
                                    <MenuItem key={servers.length} value={servers.length}>{t("common.custom")}</MenuItem>
                                </Select>

                                {
                                    choice === servers.length && 
                                    <TextField 
                                        fullWidth
                                        autoComplete='off'
                                        variant="standard"
                                        placeholder="http(s)://example.link/{z}/{x}/{y}.png" 
                                        helperText={t("gis-tile-download.message.enter-to-confirm")}
                                        defaultValue={customUrl} 
                                        onKeyDown={(ev) => {
                                            if (ev.key === "Enter") {
                                                setCustomUrl((ev.target as HTMLTextAreaElement).value);
                                            }
                                        }}
                                        onPaste={(ev) => {
                                            const text = ev.clipboardData.getData("text");
                                            if (isGisUrl(text)) {
                                                ev.preventDefault();
                                                (ev.target as HTMLTextAreaElement).value = text;
                                                setCustomUrl(text);
                                            }
                                        }}
                                    />
                                }
                            </Grid>
                            <Grid size={4} sx={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                                <Typography whiteSpace='nowrap' mr={2}>{t("gis-tile-download.z-range")}</Typography>
                            </Grid>
                            <Grid size={8} sx={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                                <Slider valueLabelDisplay="auto" value={zoomRange} step={1} marks min={0} max={23} onChange={(_, v) => {setZoomRange(v as number[]);}}/>
                            </Grid>
                            <Grid size={4} sx={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                                <Typography whiteSpace='nowrap' mr={2}>{t("gis-tile-download.concurrency")}</Typography>
                            </Grid>
                            <Grid size={8} sx={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                                <Slider valueLabelDisplay="auto" value={concurrency} step={1} marks min={1} max={20} onChange={(_, v) => {setConcurrency(v as number);}}/>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box display="flex" gap={1}>
                        <Tooltip title={t("gis-tile-download.locate")} arrow>
                            <Paper sx={{width: "fit-content", display: "inline-block"}} >
                                <IconButton onClick={locate}>
                                    <MyLocationIcon/>
                                </IconButton>
                            </Paper>
                        </Tooltip>

                        
                        <Tooltip title={t("gis-tile-download.select-all")} arrow>
                            <Paper sx={{width: "fit-content", display: "inline-block"}} >
                                <IconButton onClick={selectAll}>
                                    <FullscreenIcon/>
                                </IconButton>
                            </Paper>
                        </Tooltip>
                        
                        <Tooltip title={t("gis-tile-download.clear")}  arrow>
                            <Paper sx={{width: "fit-content", display: "inline-block"}} >
                                <IconButton onClick={cleanDraw}>
                                    <CleaningServicesIcon/>
                                </IconButton>
                            </Paper>
                        </Tooltip>
                        <Box flexGrow={1}/>
                        <Button variant='contained' onClick={download}>{t("gis-tile-download.download")}</Button>
                    </Box>
                </Stack>
            </Box>

            <ProgressDialog open={showProgress} value={progressValue} max={progressMax} message={t('gis-tile-download.message.please-keep')} onCancel={() => {downloading.current=false;}}/>
            
            <Slide in={showAlert} direction="up">
                <Snackbar open={showAlert}  autoHideDuration={2000} onClose={closeSnakebar}>
                    <Alert
                        severity="warning"
                        sx={{ width: '100%' }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Slide>
        </Box>
    );
}