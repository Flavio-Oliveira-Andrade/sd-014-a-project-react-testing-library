import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Teste do componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const infos1 = screen.getByText(
      'This application simulates a Pokédex, '
            + 'a digital encyclopedia containing all Pokémons',
    );
    const infos2 = screen.getByText('One can filter Pokémons by type, '
        + 'and see more details for each one of them');
    expect(infos1).toBeInTheDocument();
    expect(infos2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const imgAlt = screen.getByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgAlt).toHaveAttribute('src', url);
  });
});
