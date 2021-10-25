import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const defaultPoke = screen.getByTestId('pokemon-name');
    const defaultType = screen.getByTestId('pokemon-type');
    const defaultWeight = screen.getByTestId('pokemon-weight');
    const defaultSprite = screen.getByAltText('Pikachu sprite');
    expect(defaultPoke).toHaveTextContent('Pikachu');
    expect(defaultType).toHaveTextContent('Electric');
    expect(defaultWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(defaultSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(defaultSprite).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('se contém link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('se é feito o redirecionamento da aplicação para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailsClick = screen.getByText(/more details/i);
    userEvent.click(detailsClick);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsClick = screen.getByText(/more details/i);
    userEvent.click(detailsClick);
    const favoriteMark = screen.getByRole('checkbox');
    userEvent.click(favoriteMark);
    const favorited = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorited).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
