// sum.test.js
import { describe, expect, test } from 'vitest';
import { parseTwitterLink } from '../helpers/parseTwitterLink';

describe('twt links', () => {
    test('Normal twitter link', () => {
        const str = 'https://twitter.com/i/cards/tfw/v1/623160978427936768';
        expect(parseTwitterLink(str)).toEqual('https://vxtwitter.com/i/cards/tfw/v1/623160978427936768');
    });

    test('X.com', () => {
        const str = 'https://x.com/i/cards/tfw/v1/623160978427936768';
        expect(parseTwitterLink(str)).toEqual('https://vxtwitter.com/i/cards/tfw/v1/623160978427936768');
    });
    test('Removes queries base', () => {
        const str = 'https://twitter.com/i/cards/tfw/v1/623160978427936768?sranie-dupa';
        expect(parseTwitterLink(str)).toEqual('https://vxtwitter.com/i/cards/tfw/v1/623160978427936768');
    });
});
