import { describe, expect, test } from '@jest/globals';

import calc from './calc';

describe('calc', () => {
  test('calculates', () => {
    expect(calc('-243')).toBe(-243);
    expect(calc('(-243)')).toBe(-243);
    expect(calc('-(243)')).toBe(-243);
    expect(calc('-(-243)')).toBe(243);
    expect(calc('-(-2+3)')).toBe(-1);
    expect(calc('(24)-3')).toBe(21);
    expect(calc('-3-4*2')).toBe(-11);
    expect(calc('3^4*2')).toBe(162);
    expect(calc('3+4^2')).toBe(19);
    expect(calc('3+-(4-2)^2')).toBe(-1);
    expect(calc('3+(-4-2)^2')).toBe(39);
    expect(calc('(-3-4)*2')).toBe(-14);
    expect(calc('-(-3-4)*2')).toBe(14);
    expect(calc('-(-3-4)*-2')).toBe(-14);
    expect(calc('-3-4*2*3-5+2')).toBe(-30);
    expect(calc('((3*(3-4))+2)*3')).toBe(-3);
    expect(calc('((3.53*(3.02-4.5))+2.88)*3.307')).toBeCloseTo(-7.7529308, 14);
    expect(calc('3.53*3.02-4.5+2.88*3.307')).toBeCloseTo(15.68476, 14);
    expect(calc('1/2')).toBe(0.5);
    expect(calc('1/-2')).toBe(-0.5);
    expect(calc('1-1')).toBe(0);
  });

  test('handles spaces', () => {
    expect(calc('1 + 8')).toBe(9)
  })

  test('skips ending parenthesis if it does not have an opening', () => {
    expect(calc('1 + 8)')).toBe(9)
  })

  test('returns `undefined` on incorrect syntax', () => {
    expect(calc('(1 + 8')).toBe(undefined)
  })

  test.failing('fails on incorrect syntax', () => {
    expect(calc('12112'))
  })
});
