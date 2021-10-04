import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const img = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  });

  it('Verifica se no card aparece o botão com details', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const imgStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
