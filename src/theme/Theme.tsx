import React from 'react';

import { ThemeProvider } from 'styled-components';

import { breakpoints } from './breakpoints';
import { colors } from './colors';

let genArr = new Array(12).fill(1);
let step = 4;

let space = genArr.map((_, index) => index * step);
let radii = genArr.map((_, index) => index * step);

const theme = {
  colors: colors,
  spacing: 4,
  breakpoints,
  space,
  radii,
};

const CustomTheme: React.FC = function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomTheme;
