import React from "react";
import GeoIcon from "./assets/icons/GeoIcon";
import QtIcon from "./assets/icons/QtIcon";
import MonitorIcon from '@mui/icons-material/Monitor';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TodoIcon from "./assets/icons/TodoIcon";
import MarkdownIcon from "./assets/icons/MarkdownIcon";
import CodeIcon from "./assets/icons/CodeIcon";
import CalculatorIcon from "./assets/icons/CalculatorIcon";
import IpIcon from "./assets/icons/IpIcon";
import SpeedIcon from "./assets/icons/SpeedIcon";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import MathIcon from "./assets/icons/MathIcon";
import ProgrammingIcon from "./assets/icons/ProgrammingIcon";
import RunIcon from "./assets/icons/RunIcon";
import ImageIcon from "./assets/icons/ImageIcon";
import ExchangeIcon from "./assets/icons/ExchangeIcon";
import PaletteIcon from "./assets/icons/PaletteIcon";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TestIcon from '@mui/icons-material/Speed';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import SchoolIcon from '@mui/icons-material/School';
import CompressIcon from '@mui/icons-material/Compress';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LayersIcon from '@mui/icons-material/Layers';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';

const FramePage = React.lazy(()=>import("./pages/FramePage"));
const GisTileDownload = React.lazy(()=>import("./pages/GisTileDownload"));
// const MarkdownEditor = React.lazy(()=>import("./pages/MarkdownEditor"));
const CodeEditor = React.lazy(()=>import("./pages/CodeEditor"));
const IpLocation = React.lazy(()=>import("./pages/IpLocation"));
const BadPixelDetection = React.lazy(()=>import("./pages/BadPixelDetection"));
const FrameRateDetection = React.lazy(()=>import("./pages/FrameRateDetection"));
const Calculator = React.lazy(()=>import("./pages/Calculator"));
const ImageConvert = React.lazy(()=>import("./pages/ImageConvert"));
const ColorConvert = React.lazy(()=>import("./pages/ColorConvert"));

interface AppItem {
    icon: JSX.Element;
    name: string;
    desc: string;
    url: string;
    element: JSX.Element;
    keywords?: string[];
}

interface CategoryItem {
    name: string;
    icon?: JSX.Element;
    apps: AppItem[];
}

const ROUTES: CategoryItem[] = [
    {
        name: "menu.apps",
        apps: [
            {
                icon: <TodoIcon/>,
                name: 'pages.todo',
                desc: 'description.todo',
                url: '/todo',
                element: <FramePage url="https://hubenchang0515.github.io/todo/" title="pages.todo" description="description.todo"/>,
                keywords: ["todo", "to-do", "待办", "计划"],
            },
            
            {
                icon: <MarkdownIcon/>,
                name: 'pages.markdown-editor',
                desc: 'description.markdown-editor',
                url: '/markdown-editor',
                element: <FramePage url="https://hubenchang0515.github.io/markdown-editor/" title="pages.markdown-editor" description="description.markdown-editor"/>,
                keywords: ["markdown", "editor", "pdf", "编辑"],
            },

            {
                icon: <SchoolIcon/>,
                name: 'pages.class-schedule',
                desc: 'description.class-schedule',
                url: '/class-schedule',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/drag-class" title="pages.class-schedule" description="description.class-schedule"/>,
                keywords: ["class", "course", "schedule", "table", "list", "课程", "表"],
            },

            {
                icon: <QrCodeIcon/>,
                name: 'pages.qrcode',
                desc: 'description.qrcode',
                url: '/qrcode',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/qrcode" title="pages.qrcode" description="description.qrcode"/>,
                keywords: ["qr", "code", "generate", "parse", "encode", "decode", "二维", "码", "生成", "解析"],
            },
        ],
    },

    {
        name: 'menu.programming',
        icon: <ProgrammingIcon/>,
        apps: [
            {
                icon: <CodeIcon/>,
                name: 'pages.code-editor',
                desc: 'description.code-editor',
                url: '/code-editor',
                element: <CodeEditor/>,
                keywords: ["code", "editor", "c", "python", "lua", "代码", "程序", "编辑", "编程", "开发"],
            },

            {
                icon: <RunIcon/>,
                name: 'pages.code-interpreter',
                desc: 'description.code-interpreter',
                url: '/code-interpreter',
                element: <FramePage url="https://hubenchang0515.github.io/shift" title="pages.code-interpreter" description="description.code-interpreter"/>,
                keywords: ["code", "editor", "run", "exe", "c", "python", "lua", "代码", "程序", "编辑", "编程", "开发", "运行", "执行", "解释"],
            },
        ]
    },

    {
        name: "menu.math",
        icon: <MathIcon/>,
        apps: [
            {
                icon: <CalculatorIcon/>,
                name: 'pages.calculator',
                desc: 'description.calculator',
                url: '/calculator',
                element: <Calculator/>,
                keywords: ["calc", "calculator", "sci", "science", "计算", "计算器", "科学"],
            },

            {
                icon: <ShuffleSharpIcon/>,
                name: 'pages.random',
                desc: 'description.random',
                url: '/random',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/random" title="pages.random" description="description.random"/>,
                keywords: ["random", "number", "generate", "随机", "数", "生成器"],
            },
        ],
    },

    {
        name: "menu.pdf",
        icon: <PictureAsPdfIcon/>,
        apps: [
            {
                icon: <PictureAsPdfIcon/>,
                name: 'pages.pdf-download',
                desc: 'description.pdf-download',
                url: '/pdf-download',
                element: <FramePage url="https://pdf-shelf.pages.dev/" title="pages.pdf-download" description="description.pdf-download"/>,
                keywords: ["pdf", "doc", "view", "download", "文档", "预览", "下载"],
            },

            {
                icon: <PictureAsPdfIcon/>,
                name: 'pages.pdf-split',
                desc: 'description.pdf-split',
                url: '/pdf-split',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/pdf-split" title="pages.pdf-split" description="description.pdf-split"/>,
                keywords: ["pdf", "doc", "split", "文档", "拆分"],
            },

            {
                icon: <PictureAsPdfIcon/>,
                name: 'pages.pdf-merge',
                desc: 'description.pdf-merge',
                url: '/pdf-merge',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/pdf-merge" title="pages.pdf-merge" description="description.pdf-merge"/>,
                keywords: ["pdf", "doc", "merge", "concat", "文档", "连接", "拼接", "合并"],
            },

            {
                icon: <PictureAsPdfIcon/>,
                name: 'pages.pdf-to-png',
                desc: 'description.pdf-to-png',
                url: '/pdf-to-png',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/pdf-to-png" title="pages.pdf-to-png" description="description.pdf-to-png"/>,
                keywords: ["pdf", "doc", "convert", "png", "文档", "拆分", "转换", "图片"],
            },
        ],
    },

    {
        name: "menu.qt",
        icon: <QtIcon/>,
        apps: [
            {
                icon: <QtIcon/>,
                name: 'pages.qt-theme',
                desc: 'description.qt-theme',
                url: '/qt-theme',
                element: <FramePage url="https://hubenchang0515.github.io/QtTheme" title="pages.qt-theme" description="description.qt-theme"/>,
                keywords: ["qt", "theme", "qss", "主题", "风格"],
            },

            {
                icon: <QtIcon/>,
                name: 'pages.svg-icon',
                desc: 'description.svg-icon',
                url: '/svg-icon',
                element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html" title="pages.svg-icon" description="description.svg-icon"/>,
                keywords: ["qt", "svg", "icon", "图标"],
            },

            {
                icon: <QtIcon/>,
                name: 'pages.qt-standard-icon',
                desc: 'description.qt-standard-icon',
                url: '/qt-standard-icon',
                element: <FramePage url="https://hubenchang0515.github.io/QSPP/QSPP.html" title="pages.qt-standard-icon" description="description.qt-standard-icon"/>,
                keywords: ["qt", "standard", "pixmap", "icon", "标准", "图标"],
            },
        ],
    },

    {
        name: "menu.gis",
        icon: <GeoIcon/>,
        apps: [
            {
                element: <GisTileDownload/>,
                name: 'pages.gis-tile-download',
                desc: 'description.gis-tile-download',
                url: "/gis-tile-download",
                icon: <GeoIcon/>,
                keywords: ["gis", "tile", "geography", "map", "地理", "地图", "图块", "瓦片"],
            },
            
        ],
    },

    {
        name: "menu.info-query",
        icon: <TravelExploreIcon/>,
        apps: [
            {
                icon: <IpIcon/>,
                name: 'pages.ip-location',
                desc: 'description.ip-location',
                url: '/ip-location',
                element: <IpLocation/>,
                keywords: ["ip", "location", "地址", "定位"],
            },
            
        ],
    },

    {
        name: "menu.screen-detection",
        icon: <MonitorIcon/>,
        apps: [
            {
                icon: <ImageSearchIcon/>,
                name: 'pages.bad-pixel-detection',
                desc: 'description.bad-pixel-detection',
                url: '/bad-pixel-detection',
                element: <BadPixelDetection/>,
                keywords: ["monitor", "display", "screen", "bad", "pixel", "detect", "屏幕", "显示器", "坏点", "检测"],
            },
            
            {
                icon: <SpeedIcon/>,
                name: 'pages.frame-rate-detection',
                desc: 'description.frame-rate-detection',
                url: '/frame-rate-detection',
                element: <FrameRateDetection/>,
                keywords: ["monitor", "display", "screen", "frame", "skip", "refresh", "rate", "fps", "detect", "屏幕", "显示器", "帧", "刷新", "检测"],
            },
        ],
    },

    {
        name: "menu.image-and-color",
        icon: <ImageIcon/>,
        apps: [
            {
                icon: <CompressIcon/>,
                name: 'pages.compression-to-image',
                desc: 'description.compression-to-image',
                url: '/compression-to-image',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/compression-image.html" title="pages.compression-to-image" description="description.compression-to-image"/>,
                keywords: ["picture", "image", "compression", "zip", "rar", "7z", "png", "jpg", "gif", "压缩", "伪装", "图片"],
            },

            {
                icon: <LayersIcon/>,
                name: 'pages.mirage-image',
                desc: 'description.mirage-image',
                url: '/mirage-image',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/mirage-image.html" title="pages.mirage-image" description="description.mirage-image"/>,
                keywords: ["picture", "image", "mirage", "phantom", "hide", "图片", "隐藏", "合成", "幻影"],
            },

            {
                icon: <ExchangeIcon/>,
                name: 'pages.image-format-convert',
                desc: 'description.image-format-convert',
                url: '/image-format-convert',
                element: <ImageConvert/>,
                keywords: ["picture", "image", "format", "convert", "jpg", "jpeg", "png", "webp", "图片", "格式", "转换"]
            },

            {
                icon: <PaletteIcon/>,
                name: 'pages.color-convert',
                desc: 'description.color-convert',
                url: '/color-convert',
                element: <ColorConvert/>,
                keywords: ["color", "colour", "format", "convert", "rgb", "rgba", "颜色", "转换"]
            },

            {
                icon: <ImageIcon/>,
                name: 'pages.verification-code',
                desc: 'description.verification-code',
                url: '/verification-code',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/verification-code" title="pages.verification-code" description="description.verification-code"/>,
                keywords: ["verification", "code", "generate", "验证码", "生成"]
            }
        ]
    },

    {
        name: "menu.music",
        icon: <MusicNoteIcon/>,
        apps: [
            {
                icon: <MusicNoteIcon/>,
                name: 'pages.metronome',
                desc: 'description.metronome',
                url: '/metronome',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/metronome.html" title="pages.metronome" description="description.metronome"/>,
                keywords: ["music", "metronome", "音乐", "节拍器"],
            },
        ]
    },

    {
        name: "menu.test",
        icon: <TestIcon/>,
        apps: [
            {
                icon: <Grid3x3Icon/>,
                name: 'pages.schulte-table',
                desc: 'description.schulte-table',
                url: '/schulte-table',
                element: <FramePage url="https://hubenchang0515.github.io/ai-misc/schulte-grid" title="pages.schulte-table" description="description.schulte-table"/>,
                keywords: ["schulte", "table", "test", "舒尔特", "表格", "测试"],
            },
        ]
    }
]

export default ROUTES;