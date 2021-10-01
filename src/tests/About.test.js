import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Testes do requisito 2', () => {
  it('se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /about pokédex/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    expect(screen.getByText(/digital encyclopedia/)).toBeInTheDocument();
    expect(screen.getByText(/pokémons by type/i)).toBeInTheDocument();
  });

  it('se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
