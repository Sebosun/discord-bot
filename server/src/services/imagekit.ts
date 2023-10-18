import * as dotenv from 'dotenv';
import ImageKit from 'imagekit';

dotenv.config();

const baseImgPath = 'https://ik.imagekit.io/mhsz3icvu/';
const folder = 'why-animal';
const fullPath = `${baseImgPath}/${folder}`;

const PUBLIC_KEY = process.env.PUBLIC_IMG_KEY;
const PRIVATE_KEY = process.env.PRIVATE_IMG_KEY;

if (!PUBLIC_KEY || !PRIVATE_KEY) {
    throw new Error('Keys for imagekit missing');
}

const imagekit = new ImageKit({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    urlEndpoint: fullPath,
});

type DummyType = {
    url: string;
};

let items: DummyType[] = [];

export async function getAllImages() {
    if (items.length) {
        return items;
    }
    try {
        const imgItems = await imagekit.listFiles({
            skip: 0,
        });
        items = imgItems;
        return imgItems;
    } catch (e) {
        throw new Error('Couldnt find images');
    }
}
