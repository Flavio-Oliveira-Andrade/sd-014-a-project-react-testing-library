import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import About from '../components/About';

describe('2 - Testando o About.js', () => {
  test('2.1- Se a página exibe dois Paragrafos informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/This application simulates a Pokédex/);
    const pokedexInfo2 = screen.getByText(/One can filter Pokémons by type/);
    expect(pokedexInfo).toBeInTheDocument();
    expect(pokedexInfo2).toBeInTheDocument();
  });

  test('2.2- Testa se a página exibe um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const header = screen.getByRole('heading', { level: 2 });

    expect(header.textContent).toBe('About Pokédex');
  });

  test('2.3- Testa se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
