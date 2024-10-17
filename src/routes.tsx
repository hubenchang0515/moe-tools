import GisTileDownload from "./pages/GisTileDownload";

interface RouteItem {
    name: string;
    url: string;
    element: JSX.Element;
}

const ROUTES: RouteItem[] = [
    {
        name: 'apps.gis-tile-download',
        url: "gis-tile-download",
        element: <GisTileDownload/>
    }
]

export default ROUTES;