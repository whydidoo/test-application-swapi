import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockProvidersWrapper } from 'components';

import { Persons } from '../Persons';

const setup = async () =>
  render(<Persons />, { wrapper: MockProvidersWrapper });

describe('Тестирование компонента Persons', () => {
  it('отображение списка персонажей', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Movie characters')).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('person-item').length).toBe(10);
  });

  it('изменение пагинации', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Movie characters')).toBeInTheDocument();
    });

    let buttonPagination = screen.getByTitle('2');

    userEvent.click(buttonPagination);

    expect(window.location.href.includes('page=2')).toBeTruthy();
  });

  it('отправка запроса с search полем', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Movie characters')).toBeInTheDocument();
    });

    const inputSearch = screen.getByPlaceholderText('Search');
    userEvent.type(inputSearch, 'lu');

    await waitFor(() => {
      expect(window.location.href.includes('search=lu')).toBeTruthy();
    });

    expect(screen.getAllByTestId('person-item').length).toBe(1);
  });
});
