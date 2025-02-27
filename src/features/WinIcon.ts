// 参考：https://en.wikipedia.org/wiki/ICO_(file_format)#cite_note-bigSize-7

export function CreateIcon(png:Uint8Array){
    const ico = new Uint8Array(6 + 16 + 2 + png.length);
    const view = new DataView(ico.buffer);

    // NEWHEADER 6-bytes
    view.setUint16(0, 0, true);   // reserved
    view.setUint16(2, 1, true);   // type: 1-ico 2-cur
    view.setUint16(4, 1, true);   // number of images

    // RESDIR 16-bytes
    view.setUint8(6, 0);                        // width
    view.setUint8(7, 0);                        // height
    view.setUint8(8, 0);                        // palette
    view.setUint8(9, 0);                        // reserved
    view.setUint16(10, 0, true);                // color panels
    view.setUint16(12, 32, true);               // color depth
    view.setUint32(14, png.length, true);       // image size
    view.setUint32(18, 6 + 16 + 2, true);       // image offset

    // padding 2-bytes

    // IMAGE
    ico.set(png, 6 + 16 + 2);
    return ico
}