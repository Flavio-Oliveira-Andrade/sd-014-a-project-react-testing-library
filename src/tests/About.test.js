import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Requisito 2, testa o About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const pokedexParagraphs = screen.getAllByText(/pokémons/i);

    expect(pokedexParagraphs).toHaveLength(2);
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    // referencia atribuir link img no teste: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
