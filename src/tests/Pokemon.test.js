import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req 5 pokemon.test', () => {
  test('Verifica se nome correto do Pokémon é mostrado na tela;', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  test('Verifica se o tipo correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonElement = screen.getAllByText(/Electric/i);
    expect(pokemonElement).toHaveLength(2);
  });

  test('Verifica se o peso médio do Pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('Verifica se a imagem do pokemon é mostrada na tela', () => {
    renderWithRouter(<App />);
    const pokemonThumbnail = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonThumbnail.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica funcionalidade dos detalhes do card do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
