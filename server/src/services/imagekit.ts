import * as dotenv from 'dotenv';
import ImageKit from 'imagekit';

dotenv.config();

const baseImgPath = 'https://ik.imagekit.io/mhsz3icvu/';

const PUBLIC_KEY = process.env.PUBLIC_IMG_KEY;
const PRIVATE_KEY = process.env.PRIVATE_IMG_KEY;

if (!PUBLIC_KEY || !PRIVATE_KEY) {
    throw new Error('Keys for imagekit missing');
}

const imagekit = new ImageKit({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    urlEndpoint: baseImgPath,
});

export async function getAllCatImages() {
    try {
        const imgItems = await imagekit.listFiles({
            skip: 0,
            path: 'cats',
        });
        return imgItems;
    } catch (e) {
        throw new Error('Couldnt find images');
    }
}

// TODO: this simple caching as you guessed doesnt work

export async function getAllDuckImages() {
    try {
        const imgItems = await imagekit.listFiles({
            skip: 0,
            path: 'why-animal',
        });
        console.log(imgItems);
        return imgItems;
    } catch (e) {
        throw new Error('Couldnt find images');
    }
}
