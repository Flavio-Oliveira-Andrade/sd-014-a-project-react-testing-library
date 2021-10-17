import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Requisito 2', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /about pokédex/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    expect(screen.getByText(/digital encyclopedia/)).toBeInTheDocument();
    expect(screen.getByText(/pokémons by type/i)).toBeInTheDocument();
  });

  it('A página contém a seguinte imagem descrita no teste abaixo ',
    () => {
      render(<About />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
