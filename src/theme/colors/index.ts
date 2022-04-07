import { BorderProps } from 'styled-system';

import colors from './colors.json';

type TColor = typeof colors;
export type TColorNames = keyof TColor;

type TStringWithoutColorName = TColorNames | Omit<string, TColorNames>;

export type ThemeColors =
  | undefined
  | Array<TStringWithoutColorName | undefined>
  | TStringWithoutColorName;

type OmitBorderProps = Omit<
  BorderProps,
  | 'borderColor'
  | 'borderTopColor'
  | 'borderBottomColor'
  | 'borderLeftColor'
  | 'borderRightColor'
  | 'borderTop'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderRight'
>;

export interface IThemeBordersProps extends OmitBorderProps {
  borderColor?: ThemeColors;
  borderTopColor?: ThemeColors;
  borderBottomColor?: ThemeColors;
  borderLeftColor?: ThemeColors;
  borderRightColor?: ThemeColors;
}

export interface IThemeColorsProps {
  color?: ThemeColors;
  bg?: ThemeColors;
  backgroundColor?: ThemeColors;
}

export { colors };
