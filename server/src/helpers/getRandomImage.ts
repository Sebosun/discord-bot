import { getAllCatImages } from '../services/catImageKit';
import { getAllDuckImages } from '../services/imagekit';

export async function getRandomDuckImage() {
    const allImages = await getAllDuckImages();
    return allImages[Math.floor(Math.random() * allImages.length)];
}

export async function getRandomCatImage() {
    const allImages = await getAllCatImages();
    return allImages[Math.floor(Math.random() * allImages.length)];
}
