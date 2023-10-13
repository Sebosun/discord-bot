const BASE_REGEX =
    /https?:\/\/(?:(?:www|m(?:obile)?)\.)?(?:twitter\.com|twitter3e4tixl4xyajtrzo62zg5vztmjuricljdp2c5kshju4avyoid\.onion|x\.com)/;

export function parseTwitterLink(link: string) {
    const twtSiteWithPreviews = 'https://vxtwitter.com';

    const newStr = link.replace(BASE_REGEX, twtSiteWithPreviews);
    return newStr;
}
