import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('2. Teste o componente `<About.js />.`:', () => {
  it('Teste se a página contém um heading `h2` com o texto `About Pokédex`', () => {
    render(<About />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    expect(screen.getByRole('img'))
      .toHaveAttribute(
        'src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
  });
});
