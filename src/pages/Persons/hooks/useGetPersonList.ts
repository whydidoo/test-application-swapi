import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import * as SWApi from 'swapi-ts';
import { IGetResponsePage } from 'utils/types';

export const useGetPersonList = (page: number, search = '') => {
  const qClient = useQueryClient();
  const pageFetch = search ? undefined : page;
  const [total, setTotal] = useState(0);

  const { data, isLoading } = useQuery(
    ['persons', pageFetch, search],
    async () => {
      if (search) {
        setTotal(0);
      }

      const response = (await SWApi.People.getPage(
        pageFetch,
        search
      )) as IGetResponsePage<SWApi.IPeople[]>;

      setTotal(response.count);

      return {
        persons: response.results.map((person) => {
          const query = ['person', btoa(person.url)];
          let cachePerson = qClient.getQueryData<SWApi.IPeople>(query);

          return cachePerson || person;
        }),
      };
    }
  );

  return {
    persons: data?.persons ?? [],
    total: total,
    isLoading,
  };
};
