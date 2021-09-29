import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testes PokemonDetails.js', () => {
  test('Teste se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(detailLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    expect(summary).toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon roasts hard/i)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas do pokemon', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);

    const gameLocationTitle = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocationTitle).toBeInTheDocument();

    const maps = screen.queryAllByAltText('Pikachu location');

    expect(maps[0]).toBeInTheDocument();
    expect(maps[1]).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Teste se é possivel favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);

    const favCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);
    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favCheckbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
