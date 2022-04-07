import { Descriptions, Spin } from 'antd';

import { useGetPlanet } from './hooks';

interface IHomeworldProps {
  homeworld: string;
}

export const Homeworld: React.FC<IHomeworldProps> = ({ homeworld }) => {
  const { data, isLoading } = useGetPlanet(homeworld);

  if (!data) {
    return null;
  }

  const {
    name,
    population,
    climate,
    gravity,
    diameter,
    terrain,
    rotation_period,
  } = data;

  return (
    <Spin spinning={isLoading}>
      <Descriptions title={name} column={2}>
        <Descriptions.Item label="Diameter">{diameter}</Descriptions.Item>
        <Descriptions.Item label="Climate">{climate}</Descriptions.Item>
        <Descriptions.Item label="Rotation period">
          {rotation_period}
        </Descriptions.Item>
        <Descriptions.Item label="Gravity">{gravity}</Descriptions.Item>
        <Descriptions.Item label="Terrain">{terrain}</Descriptions.Item>
        <Descriptions.Item label="Population">{population}</Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};
