import { useQuery } from 'react-query';

import { Films } from 'swapi-ts';

export const useGetFilms = (films: string[]) => {
  const { data, isLoading, isError } = useQuery(
    ['films', films.toString()],
    async () => {
      const response = await Films.find((film) => films.includes(film.url));

      return response.resources.map((item) => item.value);
    },
    {
      cacheTime: Infinity,
    }
  );

  return {
    data: data || [],
    isLoading,
    isError,
  };
};
