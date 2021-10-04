import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente `<About.js />.`', () => {
  beforeEach(() => render(<About />));

  test('Existem informações sobre a Pokédex na página.', () => {
    const h2 = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Existem dois parágrafos com texto sobre a Pokédex na página', () => {
    const paragraph = screen.getAllByText(/Pokémons/);
    expect(paragraph).toHaveLength(2);
    paragraph.forEach((p) => expect(p).toBeInTheDocument());
  });

  test('Existe a imagem de uma Pokédex na página', () => {
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
