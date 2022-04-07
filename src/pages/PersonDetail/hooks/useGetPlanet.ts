import { useQuery } from 'react-query';

import { Planets } from 'swapi-ts';

export const useGetPlanet = (id: string) => {
  const { data, isLoading, isError } = useQuery(
    ['planet', id],
    async () => {
      const response = await Planets.find((item) => item.url === id);

      return response.resources[0].value;
    },
    {
      cacheTime: Infinity,
    }
  );

  return {
    data,
    isLoading,
    isError,
  };
};
