import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter.test';

import About from '../components/About';

describe('02-Teste o componente "About.js"', () => {
  // Pesquisa Regex em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
  test('se a página contém um heading h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTxt = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutTxt).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const countParagraph = screen.getAllByText(/Pokémons/i);
    expect(countParagraph).toHaveLength(2);
  });

  // Fonte: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  test('e a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokeImage = screen.getByRole('img');
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokeImage).toHaveAttribute('alt', 'Pokédex');
  });
});
