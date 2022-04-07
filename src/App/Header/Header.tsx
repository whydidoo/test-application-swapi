import { View } from 'components';

import { ReactComponent as LogoHeader } from './Logo.svg';

export const Header: React.FC = () => {
  return (
    <View
      backgroundColor="TextColorMain"
      paddingY={1}
      paddingX={['20px', '40px', '80px']}
    >
      <LogoHeader width={60} height={60} />
    </View>
  );
};
