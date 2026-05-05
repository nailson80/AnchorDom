import { describe, it, expect } from 'vitest';
import { getNineSliceStyle } from './nineSlice';

describe('getNineSliceStyle', () => {
    it('should return an empty object if imageUrl is missing', () => {
        expect(getNineSliceStyle(undefined, '10 fill')).toEqual({});
        expect(getNineSliceStyle('', '10 fill')).toEqual({});
    });

    it('should return an empty object if slice is missing', () => {
        expect(getNineSliceStyle('image.png', undefined)).toEqual({});
        expect(getNineSliceStyle('image.png', '')).toEqual({});
    });

    it('should return an empty object if both imageUrl and slice are missing', () => {
        expect(getNineSliceStyle()).toEqual({});
    });

    it('should return correct CSS properties when width is omitted', () => {
        const result = getNineSliceStyle('image.png', '10 10 10 10 fill');
        expect(result).toEqual({
            borderStyle: 'solid',
            borderWidth: 'auto',
            borderImageSource: 'url(image.png)',
            borderImageSlice: '10 10 10 10 fill',
            borderImageWidth: 'auto',
            backgroundColor: 'transparent',
        });
    });

    it('should return correct CSS properties when width is provided as a string', () => {
        const result = getNineSliceStyle('image.png', '25%', '10px');
        expect(result).toEqual({
            borderStyle: 'solid',
            borderWidth: '10px',
            borderImageSource: 'url(image.png)',
            borderImageSlice: '25%',
            borderImageWidth: '10px',
            backgroundColor: 'transparent',
        });
    });

    it('should return correct CSS properties when width is provided as a number', () => {
        const result = getNineSliceStyle('image.png', '10', 15);
        expect(result).toEqual({
            borderStyle: 'solid',
            borderWidth: 15,
            borderImageSource: 'url(image.png)',
            borderImageSlice: '10',
            borderImageWidth: 15,
            backgroundColor: 'transparent',
        });
    });
});
