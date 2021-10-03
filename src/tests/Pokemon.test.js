import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('', () => {
  test('', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeName.innerHTML).toEqual('Pikachu');
    expect(pokeType.innerHTML).toEqual('Electric');
    expect(pokeWeight.innerHTML).toEqual('Average weight: 6.0 kg');
    expect(pokeWeight.innerHTML).toStrictEqual(pokeWeight.innerHTML);
    const pokeImage = screen.getByRole('img');
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImage).toHaveAttribute('alt', `${pokeName.innerHTML} sprite`);
  });

  test('Testa se há o link de detalhes', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detailLink = screen.getByText(/More details/i);
    expect(detailLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detailLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    const markedPoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(markedPoke).toBeInTheDocument();
  });

  test('', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    expect(detailLink.href).toEqual('http://localhost/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const detailLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);

    // const favoriteCheck = screen.getByRole('checkbox');
    // expect(favoriteCheck).toBeInTheDocument();
    // userEvent.click(favoriteCheck);

    const starIcon = screen.getAllByRole('img');
    expect(starIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(starIcon[1]).toBeInTheDocument();
  });
});
