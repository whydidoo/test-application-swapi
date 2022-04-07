import { useMutation, useQueryClient } from 'react-query';

import { IPeople } from 'swapi-ts';

export const useChangeName = (id: string) => {
  const qClient = useQueryClient();
  const query = ['person', id];

  const { mutate } = useMutation(
    async (name: string) => {
      const prevData = qClient.getQueryData<IPeople>(query);

      if (prevData) {
        let newData = { ...prevData };

        newData.name = name;

        qClient.setQueryData(query, newData);
      }
    },
    {
      onSettled: () => {
        qClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'persons',
        });
      },
    }
  );

  return {
    changeName: mutate,
  };
};
