import React from 'react';
import About from '../components/About';

import renderWithRouter from './renderWithRouter';

describe('Teste no componente <About.js />', () => {
  it('Teste se a página contém um heading "h2" com o texto: "About Pokédex".', () => {
    const { screen } = renderWithRouter(<About />, { route: '/about' });

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { screen } = renderWithRouter(<About />, { route: '/about' });

    const oneParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(oneParagraph).toBeInTheDocument();

    const twoParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(twoParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { screen } = renderWithRouter(<About />, { route: '/about' });

    const imgPokedex = screen.getByRole('img', { name: 'Pokédex' });
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
