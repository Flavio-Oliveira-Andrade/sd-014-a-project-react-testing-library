import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => render(<About />));
  it('verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const head = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(head).toBeInTheDocument();
  });

  it('verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const prg = screen.getAllByText(/Pokémons/i);
    expect(prg).toHaveLength(2);
  });

  it('verifica se a página contém um imagem de uma Pokédex ', () => {
    const imagem = screen.getByAltText('Pokédex');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
