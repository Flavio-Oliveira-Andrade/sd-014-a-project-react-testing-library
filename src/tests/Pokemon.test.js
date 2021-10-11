import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';

describe('Teste o componente `<Pokemon.js />`', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getAllByTestId('pokemon-weight');
    const img = screen.getByAltText(`${pokemonName.textContent} sprite`);

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight[0].textContent).toBe('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do Pokémon indicado na Pokédex'
  + 'contém um link de navegação para exibir detalhes deste Pokémon.  ', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(moreDetails);
    const checkFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkFavorite).toBeInTheDocument();

    fireEvent.click(checkFavorite);

    const imgStar = screen
      .getByAltText(`${pokemonName.textContent} is marked as favorite`);
    const starLink = '/star-icon.svg';

    expect(imgStar).toHaveAttribute('src', `${starLink}`);
    expect(imgStar)
      .toHaveAttribute('alt', `${pokemonName.textContent} is marked as favorite`);
  });
});
