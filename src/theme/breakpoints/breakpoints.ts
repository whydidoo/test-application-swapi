import { TBreakpoints } from './types';

const breakpoints = [320, 768, 1024, 1200].map(
  (v) => `${v}px`
) as TBreakpoints<string>;

// aliases
breakpoints.xs = breakpoints[0];
breakpoints.s = breakpoints[1];
breakpoints.m = breakpoints[2];
breakpoints.l = breakpoints[3];

export { breakpoints };
