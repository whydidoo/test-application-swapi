import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockProvidersWrapper } from 'components';

import { Persons } from '../Persons';

const setup = async () => {
  render(<Persons />, { wrapper: MockProvidersWrapper });

  await waitFor(() => {
    expect(screen.getByText('Movie characters')).toBeInTheDocument();
  });
};

describe('Тестирование компонента Persons', () => {
  it('отображение списка персонажей', async () => {
    await setup();

    await waitFor(() => {
      expect(screen.getAllByTestId('person-item').length).toBe(10);
    });
  });

  it('изменение пагинации', async () => {
    await setup();

    let buttonPagination = await screen.findByText('2');

    userEvent.click(buttonPagination);

    await waitFor(() => {
      expect(window.location.href.includes('page=2')).toBeTruthy();
    });
  });

  it('отправка запроса с search полем', async () => {
    await setup();

    const inputSearch = screen.getByPlaceholderText('Search');
    userEvent.type(inputSearch, 'lu');

    await waitFor(() => {
      expect(window.location.href.includes('search=lu')).toBeTruthy();
    });

    expect(screen.getAllByTestId('person-item').length).toBe(1);
  });
});
