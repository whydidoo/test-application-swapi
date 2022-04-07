import { useQuery, useQueryClient } from 'react-query';

import * as SWApi from 'swapi-ts';
import { IGetResponsePage } from 'utils/types';

export const useGetPersonList = (page: number, search = '') => {
  const qClient = useQueryClient();
  const { data, isLoading } = useQuery(['persons', page, search], async () => {
    const response = (await SWApi.People.getPage(
      page,
      search
    )) as IGetResponsePage<SWApi.IPeople[]>;

    return {
      persons: response.results.map((person) => {
        const query = ['person', btoa(person.url)];
        let cachePerson = qClient.getQueryData<SWApi.IPeople>(query);

        return cachePerson || person;
      }),
      total: response.count,
    };
  });

  return {
    persons: data?.persons ?? [],
    total: data?.total,
    isLoading,
  };
};
