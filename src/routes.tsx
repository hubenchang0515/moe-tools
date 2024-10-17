
import FramePage from "./pages/FramePage";
import GisTileDownload from "./pages/GisTileDownload";

interface RouteItem {
    name: string;
    url: string;
    element: JSX.Element;
}

const warning = window.location.origin !== 'https://hubenchang0515.github.io'

const ROUTES: RouteItem[] = [
    {
        name: 'apps.gis-tile-download',
        url: "gis-tile-download",
        element: <GisTileDownload/>
    },

    {
        name: 'apps.todo',
        url: 'todo',
        element: <FramePage url="https://hubenchang0515.github.io/todo/" warning={warning}/>
    },

    {
        name: 'apps.qt-theme',
        url: 'qt-theme',
        element: <FramePage url="https://hubenchang0515.github.io/QtTheme/QtTheme.html" warning={warning}/>
    },

    {
        name: 'apps.svg-icon',
        url: 'svg-icon',
        element: <FramePage url="https://hubenchang0515.github.io/SvgIcons/SvgIcon.html" warning={warning}/>
    },

]

export default ROUTES;