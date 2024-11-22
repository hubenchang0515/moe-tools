type TarFileType = 'normal' | 'hardlink' | 'symlink' | 'chardev' | 'blockdev' | 'dir' | 'fifo' | 'contiguous';

export function TarFileTypeFlag(type:TarFileType) {
    switch (type) {
        case 'normal': return '0';
        case 'hardlink': return '1';
        case 'symlink': return '2';
        case 'chardev': return '3';
        case 'blockdev': return '4';
        case 'dir': return '5';
        case 'fifo': return '6';
        case 'contiguous': return '7';
    }
}

export function CreateTarHeaderBlock(
    path:string, 
    size:number, 
    mode:number=0o644, 
    uid:number=0, 
    gid:number=0, 
    mtime:number=Math.floor(Date.now() / 1000), 
    type:TarFileType='normal',
    linkpath:string=''
):Uint8Array {
    const header = new Uint8Array(512);

    // 辅助函数：将值写入 Uint8Array 中，以 null 结尾，或填充到指定长度
    function writeString(array: Uint8Array, value: string, offset: number, length: number) {
        const str = value.padEnd(length, '\0').slice(0, length);
        for (let i = 0; i < str.length; i++) {
            array[offset + i] = str.charCodeAt(i);
        }
    }

    // 辅助函数：将八进制数字写入 Uint8Array 中（右对齐，左侧填充空格）
    function writeOctal(array: Uint8Array, value: number, offset: number, length: number) {
        const str = value.toString(8).padStart(length - 1, '0') + '\0'; // 空间最后一个位置留给 null
        for (let i = 0; i < str.length; i++) {
            array[offset + i] = str.charCodeAt(i);
        }
    }

    writeString(header, path, 0, 100);
    writeOctal(header, mode, 100, 8);
    writeOctal(header, uid, 108, 8);
    writeOctal(header, gid, 116, 8);
    writeOctal(header, size, 124, 12);
    writeOctal(header, mtime, 136, 12);
    writeString(header, TarFileTypeFlag(type), 156, 1);
    writeString(header, linkpath, 157, 100);

    writeString(header, 'ustar', 257, 6);   // magic number
    writeString(header, '00', 263, 2);      // version
    writeString(header, 'user', 265, 32);   // 所有者
    writeString(header, 'group', 297, 32);  // 所属组
    writeOctal(header, 0, 329, 8);          // 主设备号
    writeOctal(header, 0, 337, 8);          // 次设备号
    writeString(header, '', 345, 155);      // 路径前缀（用于 path 超过 100 字节的情况）


    // 校验和占位：初始化为空格
    for (let i = 148; i < 156; i++) {
        header[i] = 0x20; // ASCII 空格
    }
    let checksum = 0;
    for (let i = 0; i < 512; i++) {
        checksum += header[i];
    }
    writeOctal(header, checksum, 148, 8);
    return header;
}

export function CreateTarDataBlock(data:Uint8Array):Uint8Array {
    const blocks = Math.ceil(data.length / 512);
    const block = new Uint8Array(512 * blocks);
    block.set(data);
    return block;
}

export function CreateTarEndBlock():Uint8Array {
    const block = new Uint8Array(512 * 2);
    return block;
}