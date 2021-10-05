import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Testa o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const tituloH2 = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(tituloH2).toBeInTheDocument();
  });
  test('Exibe o próximo Pokémon quando o botão  é clicado', () => {
    renderWithRouter(<App />);
    const btProximoPok = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btProximoPok).toBeInTheDocument();
    userEvent.click(btProximoPok);
    const botaoAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(botaoAll);
    const nomePokemon = screen.getByTestId(/pokemon-name/i);
    expect(nomePokemon).toBeInTheDocument();
    expect(nomePokemon).toHaveTextContent(pokemon.name);
  });
});
