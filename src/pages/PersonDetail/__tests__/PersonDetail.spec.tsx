import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockProvidersWrapper } from 'components';

import { PersonDetail } from '../PersonDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xLw==' }),
}));

const setup = async () => {
  render(<PersonDetail />, { wrapper: MockProvidersWrapper });

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
};

describe('Тестирование компонента PersonDetail', () => {
  it('отображение карточки персонажа', async () => {
    await setup();
  });

  it('отображение информации о планете', async () => {
    await setup();

    userEvent.click(screen.getByText('Homeworld'));

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  });

  it('отображение информации о фильмах', async () => {
    await setup();

    userEvent.click(screen.getByText('The character in the movies (4)'));

    await waitFor(() => {
      expect(screen.getByText('A New Hope (25.05.1977)')).toBeInTheDocument();
    });

    expect(screen.getByText('A New Hope (25.05.1977)')).toBeInTheDocument();

    expect(
      screen.getByText('The Empire Strikes Back (17.05.1980)')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Return of the Jedi (25.05.1983)')
    ).toBeInTheDocument();
  });

  it('проверка копирования ссылки', async () => {
    await setup();

    const mockFn = jest.fn();

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockFn,
      },
    });

    userEvent.click(screen.getByText('Copy url'));

    expect(mockFn).toHaveBeenCalled();
  });

  it('изменить имя персонажа', async () => {
    await setup();

    userEvent.click(screen.getByTestId('showpopup-name'));

    const tooltip = await screen.findByRole(/tooltip/);

    await waitFor(() => {
      expect(screen.getByTestId('input-change-name')).toBeInTheDocument();
    });

    // eslint-disable-next-line testing-library/no-node-access
    (tooltip.parentNode!.parentNode! as any).style.pointerEvents = 'all';

    userEvent.type(
      screen.getByTestId('input-change-name'),
      ' is son of Darth Vader'
    );
    const submitButton = screen.getByTestId('button-save-name');

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Luke Skywalker is son of Darth Vader')
      ).toBeInTheDocument();
    });
  });
});
