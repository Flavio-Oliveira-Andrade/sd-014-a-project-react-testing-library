import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utilities/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testando o componente Pokemon', () => {
  it('testa se é renderizadeo um card com as informações do Pokemon', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    const pikachuType = screen.getByTestId('pokemon-type');
    const pikachuAvarage = screen.getByTestId('pokemon-weight');

    expect(pikachuName.innerHTML).toBe('Pikachu');
    expect(pikachuType.innerHTML).toBe('Electric');
    expect(pikachuAvarage.innerHTML).toBe('Average weight: 6.0 kg');

    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  });
  it('testa se tem um link para exibir os detalhes do Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link.href).toBe('http://localhost/pokemons/25');
    fireEvent.click(link);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });

  // Estudei o código do Rodolpho Pinheiro para entender e implementar essa lógica
  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const iconStar = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(iconStar).toHaveAttribute('src', '/star-icon.svg');
    expect(iconStar).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
