import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

describe('Testa o componente About.js', () => {
  test('Testa se a págona contém um heading h2'
  + ' com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos'
  + ' com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex1 = screen.getByText(/This application simulates a Pokédex/i);
    const aboutPokedex2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutPokedex1).toBeInTheDocument();
    expect(aboutPokedex2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgPokedex).toHaveAttribute('alt', 'Pokédex');
  });
});
