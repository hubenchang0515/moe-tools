import React from "react";
import GeoIcon from "./assets/GeoIcon";
import QtIcon from "./assets/QtIcon";

const FramePage = React.lazy(()=>import("./pages/FramePage"));
const GisTileDownload = React.lazy(()=>import("./pages/GisTileDownload"));
const MarkdownEditor = React.lazy(()=>import("./pages/MarkdownEditor"));
const CodeEditor = React.lazy(()=>import("./pages/CodeEditor"));

interface AppItem {
    name: string;
    icon?: JSX.Element;
    url: string;
    element: JSX.Element;
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
                name: 'apps.todo',
                url: '/todo',
                element: <FramePage url="https://hubenchang0515.github.io/todo/"/>,
            },

            {
                name: 'apps.markdown-editor',
                url: '/markdown-editor',
                element: <MarkdownEditor/>,
            },

            {
                name: 'apps.code-editor',
                url: '/code-editor',
                element: <CodeEditor/>,
            },
        ],
    },

    {
        name: "menu.qt",
        icon: <QtIcon/>,
        apps: [
            {
                name: 'apps.qt-theme',
                url: '/qt-theme',
                element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html"/>,
            },

            {
                name: 'apps.svg-icon',
                url: '/svg-icon',
                element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html"/>,
            },
        ],
    },

    {
        name: "menu.gis",
        icon: <GeoIcon/>,
        apps: [
            {
                name: 'apps.gis-tile-download',
                url: "/gis-tile-download",
                element: <GisTileDownload/>,
            },
            
        ],
    }
]

export default ROUTES;