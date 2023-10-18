import https from 'https';

export async function getURLAsBuffer(img: string) {
    const myPromise = new Promise<Buffer>((resolve, reject) => {
        https
            .get(img, (response) => {
                let data = [] as any[];

                response.on('data', (chunk) => {
                    data.push(chunk);
                });

                response.on('end', () => {
                    resolve(Buffer.concat(data));
                });
            })
            .on('error', () => {
                reject('Coulndt find image');
            });
    });

    try {
        const item = await myPromise;
        return item;
    } catch (e) {
        throw new Error('Couldnt find image');
    }
}
