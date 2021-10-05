import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  const id = { params: { id: pokemons[0].id } };
  const favorites = { [pokemons[0].id]: true };
  beforeEach(() => {
  });

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    render(<PokemonDetails
      match={ id }
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);

    const h2 = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();

    const linkDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).not.toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(h2Summary).toBeInTheDocument();

    const pDetails = screen.getByText(/oasts hard berries with electricity/i);
    expect(pDetails).toBeInTheDocument();
  });

  test('Existe na página seção com os mapas contendo as localizações do pokémon', () => {
    render(<PokemonDetails
      match={ id }
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);

    const h2 = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();

    const map = screen.getAllByAltText(/pikachu location/i);
    expect(map[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const favorite = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });

    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
  });
});
