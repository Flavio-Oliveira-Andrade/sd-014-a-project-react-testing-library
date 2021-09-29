import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Testa componente About.js', () => {
  test('Testa se a página contém as informações sobre a Pokedéx', () => {
    renderWithRouter(<About />);

    const pokedexAboutHeader = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    const pokedexParagraph1 = screen.getByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    const pokedexParagraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details'
       + ' for each one of them',
    );
    const pokedexFigure = screen.getByRole('img');

    expect(pokedexAboutHeader).toBeInTheDocument();
    expect(pokedexParagraph1).toBeInTheDocument();
    expect(pokedexParagraph2).toBeInTheDocument();
    expect(pokedexFigure).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
