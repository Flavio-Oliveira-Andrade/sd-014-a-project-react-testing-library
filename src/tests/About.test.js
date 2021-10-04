import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('2. Teste o componente `<About.js />.`', () => {
  it('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    // Passo 1 - Acesse o elemento:
    render(<About />);
    // Passo 2 - Interagir com ele (se for necessário):
    // Passo 3 - Fazer o teste:
    expect(screen
      .getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      }))
      .toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // Passo 1 - Acesse o elemento:
    render(<About />);

    // Passo 2 - Interagir com ele (se for necessário):
    // Passo 3 - Fazer o teste:
    expect(screen
      .getByText(/This application simulates/i))
      .toBeInTheDocument();

    expect(screen
      .getByText(/One can filter Pokémons by type/i))
      .toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    // Passo 1 - Acesse o elemento:
    render(<About />);

    // Passo 2 - Interagir com ele (se for necessário):
    // Passo 3 - Fazer o teste:
    expect(screen.getByRole('img'))
      .toHaveAttribute(
        'src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
  });
});
