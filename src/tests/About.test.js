import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente <About />', () => {
  test('Testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    // src: https://github.com/tryber/sd-14a-live-lectures/blob/lecture/15.3/portfolio_example/src/tests/App.test.js
    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2Text).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    // src: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
