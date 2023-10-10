// sum.test.js
import { expect, test } from 'vitest';
import { extractEmojiID } from '../helpers/getEmoji';

test('Normal emoji', () => {
    const str = '<:cooldoge:947541543542210600>';
    expect(extractEmojiID(str)).toStrictEqual({ id: '947541543542210600', isAnimated: false });
});

test('Animated emoji', () => {
    const strc = '<a:cooldoge:947541543542210600>';
    expect(extractEmojiID(strc)).toStrictEqual({ id: '947541543542210600', isAnimated: true });
});
