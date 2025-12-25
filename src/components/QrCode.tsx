import { useEffect, useState } from "react";
import QRCode from 'qrcode';

export interface QrCodeProps {
    content: string;
}

export default function QrCode(props:QrCodeProps) {
    const [src, setSrc] = useState('');
    useEffect(() => {
        QRCode.toDataURL(props.content, (_:any, url:string) => setSrc(url));
    }, [props.content]);
    return <img src={src}/>
}