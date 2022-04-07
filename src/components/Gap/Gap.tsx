import React from 'react';

import { View } from '../View';

export const Gap: React.FC<{ vertical?: boolean; size: number }> = ({
  vertical,
  size,
}) => {
  const props = { [vertical ? 'height' : 'width']: size };
  return <View {...props} />;
};
