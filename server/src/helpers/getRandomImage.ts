import { getAllImages } from '../services/imagekit';

export async function getRandomImage() {
    const allImages = await getAllImages();
    return allImages[Math.floor(Math.random() * allImages.length)];
}
