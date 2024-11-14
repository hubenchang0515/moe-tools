import React from "react";
import GeoIcon from "./assets/GeoIcon";
import QtIcon from "./assets/QtIcon";

const FramePage = React.lazy(()=>import("./pages/FramePage"));
const GisTileDownload = React.lazy(()=>import("./pages/GisTileDownload"));
const MarkdownEditor = React.lazy(()=>import("./pages/MarkdownEditor"));
const CodeEditor = React.lazy(()=>import("./pages/CodeEditor"));
const IpLocation = React.lazy(()=>import("./pages/IpLocation"));

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
                element: <FramePage url="https://hubenchang0515.github.io/todo/" title="pages.todo" description="description.todo"/>,
                keywords: ["todo", "to-do", "待办", "计划"],
            },

            {
                name: 'pages.markdown-editor',
                url: '/markdown-editor',
                element: <MarkdownEditor/>,
                keywords: ["markdown", "editor", "pdf", "编辑"],
            },

            {
                name: 'pages.code-editor',
                url: '/code-editor',
                element: <CodeEditor/>,
                keywords: ["code", "editor", "代码", "程序", "编辑", "编程"],
            },

            {
                name: 'pages.ip-location',
                url: '/ip-location',
                element: <IpLocation/>,
                keywords: ["ip", "location", "地址", "定位"],
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
                element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html" title="pages.qt-theme" description="description.qt-theme"/>,
                keywords: ["qt", "theme", "qss", "主题", "风格"],
            },

            {
                name: 'pages.svg-icon',
                url: '/svg-icon',
                element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html" title="pages.svg-icon" description="description.svg-icon"/>,
                keywords: ["qt", "svg", "icon", "图标"],
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
                element: <GisTileDownload/>,
                keywords: ["gis", "tile", "geography", "map", "地理", "地图", "图块", "瓦片"],
            },
            
        ],
    }
]

export default ROUTES;