type FUNC = (...args: any[]) => void;

export default function Debounce (func:FUNC, timeout:number=200):FUNC {
    let id:number = 0;
    return function (...args:any[]) {
        window.clearTimeout(id);
        id = window.setTimeout(() => {
            func(...args);
        }, timeout);
    }
}