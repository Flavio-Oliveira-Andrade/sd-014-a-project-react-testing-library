import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('Testa se o componente About renderiza', () => {
  it('Testa se a pagina apresenta um heading com texto "About Pokédex"', () => {
    render(<About />);
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Testa se a página contém informação sobre a Pokédex', () => {
    render(<About />);
    const infos = screen.getByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    expect(infos).toBeInTheDocument();
  });

  it('Testa se a página apresenta a imagem de uma Pokédex', () => {
    render(<About />);
    const urlPath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAlt = screen.getByAltText('Pokédex');
    expect(imgAlt).toHaveAttribute('src', urlPath);
  });
});
