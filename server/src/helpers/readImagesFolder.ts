import { readdirSync, readFileSync } from 'fs';

const imagesFolderPath = '/home/seb/Pictures/Images';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function readImagesFolder() {
    const dir = readdirSync(imagesFolderPath);
    if (dir.length > 0) {
        const randomIndex = getRandomInt(dir.length);
        return dir[randomIndex];
    }
}

export function getFile() {
    const imgName = readImagesFolder();
    if (!imgName) {
        throw new Error('file not found');
    }
    const imgPath = `${imagesFolderPath}/${imgName}`;
    return readFileSync(imgPath);
}
