import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const type = 'Electric';
    const pokemonType = screen.getByTestId('pokemon-type', { name: type });
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWeigth = screen.getByText(/average weight: 6.0 kg/i);
    expect(pokemonWeigth).toBeInTheDocument();

    const pokemonImage = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card possui link para exibir detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('Testa se ao clicar no link de navegação é exibido detalhes do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pokemonDetailsHeading = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pokemonDetailsHeading).toBeInTheDocument();
  });

  test('Testa se ao clicar no link de navegação há'
  + ' o redirecionamento para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const markAsFavoriteCheckBox = screen.getByRole('checkbox');
    userEvent.click(markAsFavoriteCheckBox);

    const favIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
