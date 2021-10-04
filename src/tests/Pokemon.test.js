import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa o componente "Pokemon"', () => {
  test('renderiza um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    const averageWeigth = screen.getByTestId('pokemon-weight').innerHTML;
    const spritePokemon = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(averageWeigth).toBe('Average weight: 6.0 kg');
    expect(spritePokemon.src).toBe(pokemons[0].image);
  });

  test('link possui URL: /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });

    expect(link.href).toBe('http://localhost/pokemons/25');

    userEvent.click(link);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('redireciona a aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });

    expect(link.href).toBe('http://localhost/pokemons/25');

    userEvent.click(link);

    const pikachu = screen.getByText(/Pikachu Details/i);

    expect(pikachu).toBeInTheDocument();
  });

  test('URL exibida no navegador muda para /pokemon/<id>, <id> é o id do Pokémon', () => {
    renderWithRouter(<App />);
  });

  test('existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
  });
});
