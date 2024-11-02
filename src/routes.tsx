import React from "react";

interface RouteItem {
    name: string;
    url: string;
    element: JSX.Element;
}

const FramePage = React.lazy(()=>import("./pages/FramePage"));
const GisTileDownload = React.lazy(()=>import("./pages/GisTileDownload"));
const MarkdownEditor = React.lazy(()=>import("./pages/MarkdownEditor"));

const ROUTES: RouteItem[] = [
    {
        name: 'apps.gis-tile-download',
        url: "/gis-tile-download",
        element: <GisTileDownload/>
    },

    {
        name: 'apps.todo',
        url: '/todo',
        element: <FramePage url="https://hubenchang0515.github.io/todo/"/>
    },

    {
        name: 'apps.qt-theme',
        url: '/qt-theme',
        element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html"/>
    },

    {
        name: 'apps.svg-icon',
        url: '/svg-icon',
        element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html"/>
    },

    {
        name: 'apps.markdown-editor',
        url: '/markdown-editor',
        element: <MarkdownEditor/>
    },

]

export default ROUTES;