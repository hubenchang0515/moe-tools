export type RGB = [number, number, number];
export type HSL = [number, number, number];
export type HSV = [number, number, number];
export type YUV = [number, number, number];
export type YUVStandard = 'BT.601' | 'BT.709' | 'BT.2020';

export const Colors:{name:string, rgb:RGB}[] = [
    { name: 'aliceblue', rgb: [240, 248, 255] },
    { name: 'antiquewhite', rgb: [250, 235, 215] },
    { name: 'aqua', rgb: [0, 255, 255] },
    { name: 'aquamarine', rgb: [127, 255, 212] },
    { name: 'azure', rgb: [240, 255, 255] },
    { name: 'beige', rgb: [245, 245, 220] },
    { name: 'bisque', rgb: [255, 228, 196] },
    { name: 'black', rgb: [0, 0, 0] },
    { name: 'blanchedalmond', rgb: [255, 235, 205] },
    { name: 'blue', rgb: [0, 0, 255] },
    { name: 'blueviolet', rgb: [138, 43, 226] },
    { name: 'brown', rgb: [165, 42, 42] },
    { name: 'burlywood', rgb: [222, 184, 135] },
    { name: 'cadetblue', rgb: [95, 158, 160] },
    { name: 'chartreuse', rgb: [127, 255, 0] },
    { name: 'chocolate', rgb: [210, 105, 30] },
    { name: 'coral', rgb: [255, 127, 80] },
    { name: 'cornflowerblue', rgb: [100, 149, 237] },
    { name: 'cornsilk', rgb: [255, 248, 220] },
    { name: 'crimson', rgb: [220, 20, 60] },
    { name: 'cyan', rgb: [0, 255, 255] },
    { name: 'darkblue', rgb: [0, 0, 139] },
    { name: 'darkcyan', rgb: [0, 139, 139] },
    { name: 'darkgoldenrod', rgb: [184, 134, 11] },
    { name: 'darkgray', rgb: [169, 169, 169] },
    { name: 'darkgreen', rgb: [0, 100, 0] },
    { name: 'darkkhaki', rgb: [189, 183, 107] },
    { name: 'darkmagenta', rgb: [139, 0, 139] },
    { name: 'darkolivegreen', rgb: [85, 107, 47] },
    { name: 'darkorange', rgb: [255, 140, 0] },
    { name: 'darkorchid', rgb: [153, 50, 204] },
    { name: 'darkred', rgb: [139, 0, 0] },
    { name: 'darksalmon', rgb: [233, 150, 122] },
    { name: 'darkseagreen', rgb: [143, 188, 143] },
    { name: 'darkslateblue', rgb: [72, 61, 139] },
    { name: 'darkslategray', rgb: [47, 79, 79] },
    { name: 'darkturquoise', rgb: [0, 206, 209] },
    { name: 'darkviolet', rgb: [148, 0, 211] },
    { name: 'deeppink', rgb: [255, 20, 147] },
    { name: 'deepskyblue', rgb: [0, 191, 255] },
    { name: 'dimgray', rgb: [105, 105, 105] },
    { name: 'dodgerblue', rgb: [30, 144, 255] },
    { name: 'firebrick', rgb: [178, 34, 34] },
    { name: 'floralwhite', rgb: [255, 250, 240] },
    { name: 'forestgreen', rgb: [34, 139, 34] },
    { name: 'fuchsia', rgb: [255, 0, 255] },
    { name: 'gainsboro', rgb: [220, 220, 220] },
    { name: 'ghostwhite', rgb: [248, 248, 255] },
    { name: 'gold', rgb: [255, 215, 0] },
    { name: 'goldenrod', rgb: [218, 165, 32] },
    { name: 'gray', rgb: [128, 128, 128] },
    { name: 'green', rgb: [0, 128, 0] },
    { name: 'greenyellow', rgb: [173, 255, 47] },
    { name: 'honeydew', rgb: [240, 255, 240] },
    { name: 'hotpink', rgb: [255, 105, 180] },
    { name: 'indianred', rgb: [205, 92, 92] },
    { name: 'indigo', rgb: [75, 0, 130] },
    { name: 'ivory', rgb: [255, 255, 240] },
    { name: 'khaki', rgb: [240, 230, 140] },
    { name: 'lavender', rgb: [230, 230, 250] },
    { name: 'lavenderblush', rgb: [255, 240, 245] },
    { name: 'lawngreen', rgb: [124, 252, 0] },
    { name: 'lightpink', rgb: [255, 182, 193] }
];



export function RGB2HSL([r, g, b]: RGB): HSL {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

export function HSL2RGB([h, s, l]: HSL): RGB {
    h /= 360, s /= 100, l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function RGB2HSV([r, g, b]: RGB): HSV {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, v * 100];
}

export function HSV2RGB([h, s, v]: HSV): RGB {
    h /= 360, s /= 100, v /= 100;
    let r=0, g=0, b=0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function RGB2YUV(rgb: RGB, standard: YUVStandard = 'BT.601'): YUV {
    const [r, g, b] = rgb;
    let Kr, Kg, Kb;
    
    switch (standard) {
        case 'BT.709':
            Kr = 0.2126; Kg = 0.7152; Kb = 0.0722;
            break;
        case 'BT.2020':
            Kr = 0.2627; Kg = 0.6780; Kb = 0.0593;
            break;
        default: // BT.601
            Kr = 0.299; Kg = 0.587; Kb = 0.114;
    }
    
    const y = Kr * r + Kg * g + Kb * b;
    const u = ((b - y) / (1 - Kb)) * 0.5 + 128;
    const v = ((r - y) / (1 - Kr)) * 0.5 + 128;
    
    return [y, Math.max(0, Math.min(255, u)), Math.max(0, Math.min(255, v))];
}

export function YUV2RGB(yuv: YUV, standard: YUVStandard = 'BT.601'): RGB {
    const [y, u, v] = yuv;
    let Kr, Kg, Kb;
    
    switch (standard) {
        case 'BT.709':
            Kr = 0.2126; Kg = 0.7152; Kb = 0.0722;
            break;
        case 'BT.2020':
            Kr = 0.2627; Kg = 0.6780; Kb = 0.0593;
            break;
        default: // BT.601
            Kr = 0.299; Kg = 0.587; Kb = 0.114;
    }
    
    const r = y + (v - 128) * (2 - 2 * Kr);
    const g = y - (u - 128) * (2 * (1 - Kb) * Kb / Kg) - (v - 128) * (2 * (1 - Kr) * Kr / Kg);
    const b = y + (u - 128) * (2 - 2 * Kb);
    
    return [Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, g)), Math.max(0, Math.min(255, b))];
}


export function RGB2HEX(rgb: RGB): string {
    return `#${rgb.map((val) => val.toString(16).padStart(2, '0')).join('')}`;
}

export function HEX2RGB(hex: string): RGB {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    if (hex.length !== 6) {
        return [0, 0, 0];
    }
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export default Colors;