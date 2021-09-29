import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('2 - Testes do componente About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Deve haver um componente h2 com About Pokédex', () => {
    const aboutPokedex = screen.getByText('About Pokédex');

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Devem haver dois parágrafos descritivos na página', () => {
    const firstParagraph = screen.getByText(/application simulates/i);
    const secondParagraph = screen.getByText(/application simulates/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Deve haver uma imagem da Pokédex', () => {
    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toContain(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
    expect(pokedexImage).toBeInTheDocument();
  });
});
