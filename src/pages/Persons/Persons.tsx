import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Empty, Input, PageHeader, Pagination, Row, Spin } from 'antd';
import { RowProps } from 'antd/lib/grid/row';
import { useGetQueryParamsLocation } from 'hooks';
import { useDebounce } from 'use-debounce';

import { PageContentWrapper, View } from 'components';

import { useGetPersonList } from './hooks';
import { PersonCard } from './PersonCard';
import { IQueryParamsPersons } from './types';

const rowGutter = [16, 12] as RowProps['gutter'];

export const Persons: React.FC = () => {
  const { queryParams, changeQuery } =
    useGetQueryParamsLocation<IQueryParamsPersons>();

  const [search, setSearch] = useState(queryParams.search || '');
  const [page, setPage] = useState(Number(queryParams.page) || 1);

  const [debouncedValue] = useDebounce(search, 500);

  const { persons, total, isLoading } = useGetPersonList(page, debouncedValue);

  useEffect(() => {
    changeQuery({ search: debouncedValue });
  }, [changeQuery, debouncedValue]);

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page);
      changeQuery({ page: String(page) });
    },
    [changeQuery]
  );

  return (
    <PageContentWrapper>
      <View
        as={PageHeader}
        title="Movie characters"
        paddingX="0"
        paddingY={0}
        paddingBottom={2}
        extra={
          <Input
            placeholder="Search"
            allowClear
            size="large"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        }
      />

      <Spin spinning={isLoading}>
        {persons.length === 0 && !isLoading ? (
          <Empty />
        ) : (
          <Row gutter={rowGutter}>
            {persons.map(({ name, url, gender }) => (
              <PersonCard name={name} gender={gender} url={url} key={url} />
            ))}
          </Row>
        )}
      </Spin>

      <View flex={1} />

      <View textAlign="end" paddingTop={4}>
        <Pagination
          total={total}
          showSizeChanger={false}
          current={page}
          onChange={onChangePage}
          size="small"
        />
      </View>
      <Outlet />
    </PageContentWrapper>
  );
};
