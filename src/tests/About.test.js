// role information from: https://www.w3.org/TR/html-aria/#docconformance
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
// import App from '../App';
import { About } from '../components';

describe('Testa o componente "About"', () => {
  test('a página contém um heading `h2` com o texto `About Pokédex`', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/about');
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /about Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/about');
    renderWithRouter(<About />);

    const aboutParagraph = screen.getByText(/application simulates a pokédex/i);
    const aboutParagraph2 = screen.getByText(/filter pokémons by type/i);

    expect(aboutParagraph).toBeInTheDocument();
    expect(aboutParagraph2).toBeInTheDocument();
  });

  test('a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/about');
    renderWithRouter(<About />);

    // Help from: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImage).toBeInTheDocument();
  });
});
