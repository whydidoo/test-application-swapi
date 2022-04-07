import { useQuery, useQueryClient } from 'react-query';

import { IPeople, People } from 'swapi-ts';

export const useGetPersonInfo = (id: string) => {
  const qClient = useQueryClient();
  const query = ['person', id];

  const prevData = qClient.getQueryData<IPeople>(query);

  const { data, isLoading, isError } = useQuery(
    query,
    async () => {
      const response = await People.find((people) => people.url === atob(id));

      return response.resources[0].value;
    },
    {
      cacheTime: Infinity,
      enabled: !prevData,
    }
  );

  return {
    person: data,
    isLoading,
    isError,
  };
};
