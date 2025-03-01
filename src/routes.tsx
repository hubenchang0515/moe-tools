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

const FramePage = React.lazy(()=>import("./pages/FramePage"));
const GisTileDownload = React.lazy(()=>import("./pages/GisTileDownload"));
const MarkdownEditor = React.lazy(()=>import("./pages/MarkdownEditor"));
const CodeEditor = React.lazy(()=>import("./pages/CodeEditor"));
const IpLocation = React.lazy(()=>import("./pages/IpLocation"));
const BadPixelDetection = React.lazy(()=>import("./pages/BadPixelDetection"));
const FrameRateDetection = React.lazy(()=>import("./pages/FrameRateDetection"));
const Calculator = React.lazy(()=>import("./pages/Calculator"));
const ImageConvert = React.lazy(()=>import("./pages/ImageConvert"));
const ColorConvert = React.lazy(()=>import("./pages/ColorConvert"));

interface AppItem {
    name: string;
    icon?: JSX.Element;
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
                name: 'pages.todo',
                url: '/todo',
                icon: <TodoIcon/>,
                element: <FramePage url="https://hubenchang0515.github.io/todo/" title="pages.todo" description="description.todo"/>,
                keywords: ["todo", "to-do", "待办", "计划"],
            },
            
            {
                name: 'pages.markdown-editor',
                url: '/markdown-editor',
                icon: <MarkdownIcon/>,
                element: <MarkdownEditor/>,
                keywords: ["markdown", "editor", "pdf", "编辑"],
            },
        ],
    },

    {
        name: 'menu.programming',
        icon: <ProgrammingIcon/>,
        apps: [
            {
                name: 'pages.code-editor',
                url: '/code-editor',
                icon: <CodeIcon/>,
                element: <CodeEditor/>,
                keywords: ["code", "editor", "c", "python", "lua", "代码", "程序", "编辑", "编程", "开发"],
            },

            {
                name: 'pages.code-interpreter',
                url: '/code-interpreter',
                icon: <RunIcon/>,
                element: <FramePage url="https://hubenchang0515.github.io/shift/" title="pages.code-interpreter" description="description.code-interpreter"/>,
                keywords: ["code", "editor", "run", "exe", "c", "python", "lua", "代码", "程序", "编辑", "编程", "开发", "运行", "执行", "解释"],
            },
        ]
    },

    {
        name: "menu.math",
        icon: <MathIcon/>,
        apps: [
            {
                name: 'pages.calculator',
                url: '/calculator',
                icon: <CalculatorIcon/>,
                element: <Calculator/>,
                keywords: ["calc", "calculator", "sci", "science", "计算", "计算器", "科学"],
            },

        ],
    },

    {
        name: "menu.qt",
        icon: <QtIcon/>,
        apps: [
            {
                name: 'pages.qt-theme',
                url: '/qt-theme',
                icon: <QtIcon/>,
                element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html" title="pages.qt-theme" description="description.qt-theme"/>,
                keywords: ["qt", "theme", "qss", "主题", "风格"],
            },

            {
                name: 'pages.svg-icon',
                url: '/svg-icon',
                icon: <QtIcon/>,
                element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html" title="pages.svg-icon" description="description.svg-icon"/>,
                keywords: ["qt", "svg", "icon", "图标"],
            },

            {
                name: 'pages.qt-standard-icon',
                url: '/qt-standard-icon',
                icon: <QtIcon/>,
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
                name: 'pages.gis-tile-download',
                url: "/gis-tile-download",
                icon: <GeoIcon/>,
                element: <GisTileDownload/>,
                keywords: ["gis", "tile", "geography", "map", "地理", "地图", "图块", "瓦片"],
            },
            
        ],
    },

    {
        name: "menu.info-query",
        icon: <TravelExploreIcon/>,
        apps: [
            {
                name: 'pages.ip-location',
                url: '/ip-location',
                icon: <IpIcon/>,
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
                name: 'pages.bad-pixel-detection',
                url: '/bad-pixel-detection',
                icon: <ImageSearchIcon/>,
                element: <BadPixelDetection/>,
                keywords: ["monitor", "display", "screen", "bad", "pixel", "detect", "屏幕", "显示器", "坏点", "检测"],
            },
            
            {
                name: 'pages.frame-rate-detection',
                url: '/frame-rate-detection',
                icon: <SpeedIcon/>,
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
                name: 'pages.image-format-convert',
                url: '/image-format-convert',
                icon: <ExchangeIcon/>,
                element: <ImageConvert/>,
                keywords: ["picture", "image", "format", "convert", "jpg", "jpeg", "png", "webp", "图片", "格式", "转换"]
            },

            {
                name: 'pages.color-convert',
                url: '/color-convert',
                icon: <PaletteIcon/>,
                element: <ColorConvert/>,
                keywords: ["color", "colour", "format", "convert", "rgb", "rgba", "颜色", "转换"]
            }
        ]
    }
]

export default ROUTES;