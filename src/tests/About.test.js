import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Componente About', () => {
  beforeEach(() => render(<About />));
  it('Contém um h2 "About Pokédex"', () => {
    const h2 = screen.getByRole('heading',
      {
        name: 'About Pokédex',
        level: 2,
      });
    expect(h2).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png."', () => {
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
