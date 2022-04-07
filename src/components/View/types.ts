import {
  FlexboxProps,
  GridProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TextAlignProps,
} from 'styled-system';
import { IThemeBordersProps, IThemeColorsProps } from 'theme/colors';

export interface IViewProps
  extends FlexboxProps,
    GridProps,
    LayoutProps,
    PositionProps,
    ShadowProps,
    SpaceProps,
    IThemeBordersProps,
    IThemeColorsProps,
    OpacityProps,
    TextAlignProps {}
