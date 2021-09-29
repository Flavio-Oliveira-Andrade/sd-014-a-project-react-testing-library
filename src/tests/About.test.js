import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  beforeEach(() => render(<About />));

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs).toHaveLength(2);
    paragraphs.forEach((paragraph) => expect(paragraph).toBeInTheDocument());
  });

  test('A página contém a imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
