import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';

interface IPersonCardProps {
  name: string;
  gender: string;
  url: string;
}

export const PersonCard: React.FC<IPersonCardProps> = memo(
  ({ name, gender, url }) => {
    const idSearch = btoa(url);
    const navigate = useNavigate();

    const onClick = useCallback(() => {
      navigate(idSearch);
    }, [idSearch, navigate]);

    return (
      <Col xs={24} md={12}>
        <Card hoverable onClick={onClick} data-testid="person-item">
          <Meta title={name} description={`Gender: ${gender}`} />
        </Card>
      </Col>
    );
  }
);
