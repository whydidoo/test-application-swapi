import { ShareAltOutlined } from '@ant-design/icons';
import { Button, Collapse, Descriptions, notification, Typography } from 'antd';
import { IPeople } from 'swapi-ts';

import { Gap, View } from 'components';

import { Films } from './Films';
import { Homeworld } from './Homeworld';
import { PopoverChangeName } from './PopoverChangeName';

const { Text } = Typography;

const { Panel } = Collapse;

interface IPersonProps {
  person: IPeople;
}

export const Person: React.FC<IPersonProps> = ({ person }) => {
  const {
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    films,
    homeworld,
  } = person;

  const onClickCopy = () => {
    navigator.clipboard.writeText(window.location.href);

    notification.info({
      message: `Copied`,
      placement: 'bottomRight',
    });
  };

  return (
    <View>
      <Descriptions
        title={<PopoverChangeName name={name} />}
        extra={
          <Button icon={<ShareAltOutlined />} type="text" onClick={onClickCopy}>
            Copy url
          </Button>
        }
      >
        <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="Height">{height}</Descriptions.Item>
        <Descriptions.Item label="Weight">{mass}</Descriptions.Item>
        <Descriptions.Item label="Hair">{hair_color}</Descriptions.Item>
        <Descriptions.Item label="Skin">{skin_color}</Descriptions.Item>
        <Descriptions.Item label="Eyes">{eye_color}</Descriptions.Item>
      </Descriptions>

      <Text type="secondary">Birth year {birth_year}.</Text>
      <Gap size={16} vertical />
      <Collapse>
        <Panel header="Homeworld" key="homeworld">
          <Homeworld homeworld={homeworld as string} />
        </Panel>
        <Panel
          header={`The character in the movies (${films.length})`}
          key="films"
        >
          <Films films={films as string[]} />
        </Panel>
      </Collapse>
    </View>
  );
};
