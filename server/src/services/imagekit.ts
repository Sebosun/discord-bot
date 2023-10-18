import * as dotenv from 'dotenv';
import ImageKit from 'imagekit';

dotenv.config();

const baseImgPath = 'https://ik.imagekit.io/mhsz3icvu/';
const duckFolder = 'why-animal';
const catFolder = 'cats';
const fullDuckPath = `${baseImgPath}/${duckFolder}`;
const fullCatPath = `${baseImgPath}/${catFolder}`;

const PUBLIC_KEY = process.env.PUBLIC_IMG_KEY;
const PRIVATE_KEY = process.env.PRIVATE_IMG_KEY;

if (!PUBLIC_KEY || !PRIVATE_KEY) {
    throw new Error('Keys for imagekit missing');
}

const DuckImageKit = new ImageKit({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    urlEndpoint: fullDuckPath,
});

type DummyType = {
    url: string;
};

let catImages: DummyType[] = [];

const CatImageKit = new ImageKit({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    urlEndpoint: fullCatPath,
});

export async function getAllCatImages() {
    if (catImages.length) {
        return catImages;
    }
    try {
        const imgItems = await CatImageKit.listFiles({
            skip: 0,
        });
        catImages = imgItems;
        return imgItems;
    } catch (e) {
        throw new Error('Couldnt find images');
    }
}

let duckImages: DummyType[] = [];

export async function getAllDuckImages() {
    if (duckImages.length) {
        return duckImages;
    }
    try {
        const imgItems = await DuckImageKit.listFiles({
            skip: 0,
        });
        duckImages = imgItems;
        return imgItems;
    } catch (e) {
        throw new Error('Couldnt find images');
    }
}
