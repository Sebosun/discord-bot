const BASE_REGEX =
    /https?:\/\/(?:(?:www|m(?:obile)?)\.)?(?:twitter\.com|twitter3e4tixl4xyajtrzo62zg5vztmjuricljdp2c5kshju4avyoid\.onion|x\.com)/;

/* const queryReg = /(\?.+)/ */
const queryReg = /\?.+/g;
const removeQueryFromUrl = (link: string) => link.replace(queryReg, '');

export function parseTwitterLink(link: string) {
    const twtSiteWithPreviews = 'https://vxtwitter.com';

    console.log('new str');
    let newStr = link.replace(BASE_REGEX, twtSiteWithPreviews);
    newStr = removeQueryFromUrl(newStr);
    if (!newStr) {
        throw new Error('Not a valid twitter link');
    }
    return newStr;
}
