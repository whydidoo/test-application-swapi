import { Alert, Spin } from 'antd';
import { IPeople } from 'swapi-ts';

import { View } from 'components';

import { Person } from './Person';

interface IPersonContainerProps {
  person?: IPeople;
  isLoading: boolean;
  isError: boolean;
}

export const PersonContainer: React.FC<IPersonContainerProps> = ({
  person,
  isError,
  isLoading,
}) => {
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <View>
        {isError ? (
          <Alert type="error" message="Character has not found" />
        ) : (
          person && <Person person={person} />
        )}
      </View>
    </Spin>
  );
};
