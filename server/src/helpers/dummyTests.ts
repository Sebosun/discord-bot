import { readdirSync, readFileSync } from 'fs';

const imagesFolderPath = '/home/seb/Pictures/Images';

export function readImagesFolder() {
    const dir = readdirSync(imagesFolderPath);
    if (dir.length > 0) {
        return dir[0];
    }
}

export async function getFile() {
    const imgName = readImagesFolder();
    const imgPath = `${imagesFolderPath}/${imgName}`;
    return readFileSync(imgPath, 'utf8');
}

getFile();
