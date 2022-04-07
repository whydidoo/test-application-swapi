import { useNavigate, useParams } from 'react-router-dom';

import { Drawer } from 'antd';

import { useGetPersonInfo } from './hooks';
import { PersonContainer } from './PersonContainer';

export const PersonDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { person, isLoading, isError } = useGetPersonInfo(params.id!);

  const onClose = () => navigate('..');

  return (
    <Drawer visible={true} onClose={onClose} width="500px">
      <PersonContainer
        person={person}
        isError={isError}
        isLoading={isLoading}
      />
    </Drawer>
  );
};
