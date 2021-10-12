import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../rendreWithRouter';
import About from '../components/About';

const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testa o componente About.js', () => {
  it('testa se a pagina contém as informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    const infoAboutPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoAboutPokedex).toBeInTheDocument();
  });

  it('testa se a pagina contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage.src).toContain(srcImg);
    expect(pokedexImage).toHaveAttribute('src', srcImg);
  });
});

/** referencia para usar o teste na imagem: https://stackoverflow.com/questions/60509527/
 * jestreact-native-testing-library-how-to-test-an-image-src */
