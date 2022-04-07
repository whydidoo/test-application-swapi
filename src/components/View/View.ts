import styled from 'styled-components';
import {
  background,
  border,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  color,
  textAlign,
  opacity,
} from 'styled-system';

import { IViewProps } from './types';

export const styledView = compose(
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  textAlign,
  opacity
);

export const View = styled.div<IViewProps>(styledView);
