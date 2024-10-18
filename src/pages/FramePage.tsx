import Frame, { FrameProps } from "../components/Frame";

export interface FramePageProps {
    url: string;
    severity?: FrameProps['severity']
}

export default function FramePage(props: FramePageProps) {
    return (<Frame url={props.url} severity={props.severity}/>)
}