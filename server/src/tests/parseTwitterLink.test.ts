// sum.test.js
import { expect, test } from 'vitest';
import { parseTwitterLink } from '../helpers/parseTwitterLink';

test('Normal twitter link', () => {
    const str = 'https://twitter.com/i/cards/tfw/v1/623160978427936768';
    expect(parseTwitterLink(str)).toEqual('https://vxtwitter.com/i/cards/tfw/v1/623160978427936768');
});

test('X.com', () => {
    const str = 'https://x.com/i/cards/tfw/v1/623160978427936768';
    expect(parseTwitterLink(str)).toEqual('https://vxtwitter.com/i/cards/tfw/v1/623160978427936768');
});
