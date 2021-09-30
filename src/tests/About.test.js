import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('About.js Testes', () => {
  it('Teste se a pg contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    expect((screen.getByText(/This application simulates a Pokéd/i))).toBeInTheDocument();
    expect((screen.getByText(/One can filter Pokémons by type/i))).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    expect((screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    })));
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    expect((screen.getByRole('img')).src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
