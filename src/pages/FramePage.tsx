import Frame from "../components/Frame";

export interface FramePageProps {
    url: string;
    warning?: boolean;
}

export default function FramePage(props: FramePageProps) {
    return (<Frame url={props.url} warning={!!props.warning}/>)
}