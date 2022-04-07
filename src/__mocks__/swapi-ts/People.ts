import findPerson from './findPerson.json';
import peopleJson from './people.json';
export const People = {
  getPage: (_page: number, search = '') => {
    if (search) {
      const totalFilter = peopleJson.results.filter(({ name }) =>
        name.toLocaleLowerCase().includes(search)
      );

      return Promise.resolve({
        ...peopleJson,
        results: totalFilter,
        count: totalFilter.length,
      });
    }

    return Promise.resolve({
      ...peopleJson,
    });
  },

  find: () => Promise.resolve(findPerson),
};
