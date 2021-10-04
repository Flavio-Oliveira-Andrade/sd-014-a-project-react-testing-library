import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utilities/renderWithRouter';

import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Testes do requisito 6', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText('Pikachu sprite');

    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe(
      'Average weight: 6.0 kg',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
  });

  it('se ao clicar no link, é feito o redirecionamento e o navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favorite = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
