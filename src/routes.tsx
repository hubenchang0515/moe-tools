import FramePage from "./pages/FramePage";
import GisTileDownload from "./pages/GisTileDownload";

interface RouteItem {
    name: string;
    url: string;
    element: JSX.Element;
}

const SAME_ORIGIN = window.location.origin === 'https://hubenchang0515.github.io';
const FRAME_SEVERITY = SAME_ORIGIN? "info" : "warning";

const ROUTES: RouteItem[] = [
    {
        name: 'apps.gis-tile-download',
        url: "gis-tile-download",
        element: <GisTileDownload/>
    },

    {
        name: 'apps.todo',
        url: 'todo',
        element: <FramePage url="https://hubenchang0515.github.io/todo/" severity={FRAME_SEVERITY}/>
    },

    {
        name: 'apps.qt-theme',
        url: 'qt-theme',
        element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html" severity={FRAME_SEVERITY}/>
    },

    {
        name: 'apps.svg-icon',
        url: 'svg-icon',
        element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html" severity={FRAME_SEVERITY}/>
    },

]

export default ROUTES;