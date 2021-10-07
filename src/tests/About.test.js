import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import About from '../components/About';

describe('Teste do componente About', () => {
  it('Página contém informações sobre Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <About />
      </Router>,
    );

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();
  });

  it('Página contém informações sobre Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <About />
      </Router>,
    );

    expect(screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });

  it('Página contém dois parágrafos com texto sobre Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <About />
      </Router>,
    );

    const pokedexFirstParagraph = screen
      .getByText('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
    expect(pokedexFirstParagraph).toBeInTheDocument();

    const pokedexSecondParagraph = screen
      .getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(pokedexSecondParagraph).toBeInTheDocument();
  });

  it('Página contém imagem de uma Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <About />
      </Router>,
    );

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
