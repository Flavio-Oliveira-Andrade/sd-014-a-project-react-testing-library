import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Requisito 6', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const image = screen.getByAltText('Charmander sprite');

    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Charmander');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe(
      'Average weight: 8.5 kg',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });

  it('Ao clicar no link, é feito o redirecionamento e o navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    const favorite = screen.getByRole('img', {
      name: 'Charmander is marked as favorite',
    });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', 'Charmander is marked as favorite');
  });
});
