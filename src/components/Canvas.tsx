import React, { Ref, useImperativeHandle } from "react";
import { KeyboardEventHandler, MouseEventHandler, useEffect, useRef } from "react";

export interface CanvasProps {
    onLoad?: (canvas:HTMLCanvasElement)=>void;
    onDraw?: (canvas:HTMLCanvasElement)=>void;
    onUpdate?: (canvas:HTMLCanvasElement)=>void;
    onKeyDown?: KeyboardEventHandler<HTMLCanvasElement>;
    onKeyUp?: KeyboardEventHandler<HTMLCanvasElement>;
    onClick?: MouseEventHandler<HTMLCanvasElement>;
}

export function Canvas(props: CanvasProps, ref?:Ref<HTMLCanvasElement|null>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current);

    useEffect(() => {
        const config = () => {
            if (!canvasRef.current) {
                return;
            }

            if (document.fullscreenElement === canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                canvasRef.current.style.cursor = 'none';
            } else {
                canvasRef.current.width = canvasRef.current.parentElement?.offsetWidth || 0;
                canvasRef.current.height = canvasRef.current.parentElement?.offsetHeight || 0;
                canvasRef.current.style.cursor = 'auto';
            }
        }

        config();
        document.addEventListener('fullscreenchange', config);
        window.addEventListener('resize', config);

        return () => {
            document.removeEventListener('fullscreenchange', config);
            window.removeEventListener('resize', config);
        }
    }, [canvasRef.current]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        let stop = false;

        props.onLoad?.(canvasRef.current);
        const frame = () => {
            if (stop) {
                return;
            }

            if (canvasRef.current) {
                props.onDraw?.(canvasRef.current);
                props.onUpdate?.(canvasRef.current);
            }
            window.requestAnimationFrame(frame);
        }
        
        frame();

        return () => {stop = true;}
    }, [props.onLoad, props.onDraw, props.onUpdate, canvasRef.current]);

    return (
        <canvas 
            tabIndex={0} 
            ref={canvasRef} 
            width={0}
            height={0}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
            onClick={props.onClick}
            onContextMenu={(e) => {e.preventDefault() }}
            style={{position:'absolute', outline: 'none'}}
        />
    )
}

export default React.forwardRef(Canvas);