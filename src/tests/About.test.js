import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Util/RenderWithRouter';
import { About } from '../components';

describe('Verifica component About.js, referente ao requisito 2', () => {
  it('Verifica se a página contém as informações da Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Verifica se a página contém pelo menos dois parágrafos', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(
      /This application simulates a Pokédex/i,
    );
    const secondParagraph = screen.getByText(
      /One can filter Pokémons by type/i,
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Verifica se contem a img da pokedex', () => {
    renderWithRouter(<About />);

    const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', imageLink);
  });
});
