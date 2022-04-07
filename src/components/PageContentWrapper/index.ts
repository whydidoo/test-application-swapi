import css from '@styled-system/css';
import styled from 'styled-components';

export const PageContentWrapper = styled.div(
  css({
    paddingX: ['20px', '40px', '80px'],
    paddingY: '30px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  })
);
