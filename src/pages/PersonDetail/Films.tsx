import { Descriptions, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { format } from 'date-fns';

import { View } from 'components';

import { useGetFilms } from './hooks';

const { Text } = Typography;

let contentStyle = { textDecoration: 'underline' };

interface IFilmsProps {
  films: string[];
}

export const Films: React.FC<IFilmsProps> = ({ films }) => {
  const { data } = useGetFilms(films);

  return (
    <>
      {data.map((film) => {
        const { url, title, opening_crawl, release_date, director, producer } =
          film;
        return (
          <View key={url}>
            <View>
              <Text strong>
                {title} ({format(new Date(release_date), 'dd.MM.yyyy')})
              </Text>
            </View>
            <Paragraph>{opening_crawl}</Paragraph>

            <Descriptions column={1}>
              <Descriptions.Item label="Producer" contentStyle={contentStyle}>
                {producer}
              </Descriptions.Item>
              <Descriptions.Item label="Director" contentStyle={contentStyle}>
                {director}
              </Descriptions.Item>
            </Descriptions>
          </View>
        );
      })}
    </>
  );
};
