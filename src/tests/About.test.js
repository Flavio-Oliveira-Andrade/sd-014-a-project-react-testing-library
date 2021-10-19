import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente', () => {
  test('Testa se a página contém um heading h2 com o texto "About Pokédex"',
    () => {
      render(<About />);
      const aboutHeading = screen.getByRole('heading', {
        level: 2,
        name: /about pokédex/i,
      });
      expect(aboutHeading).toBeInTheDocument();
    });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      render(<About />);
      const aboutParagraphs = screen.getAllByText(/pokémons/i);
      // Os dois parágrafos tem a palavra "pokémons"
      expect(aboutParagraphs).toHaveLength(2);
    });
  test('Testa se a página possui a imagem correta de uma Pokédex',
    () => {
      render(<About />);
      const aboutImg = screen.getByRole('img');
      expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
