import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  test('página contém um heading h2 com o texto "About Pokédex" ', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(h2).toBeInTheDocument();
  });

  test('página contém dois parágrafos com texto sobre a Pokédex ', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    // https://testing-library.com/docs/queries/about#priority
    const paragraph = screen.getAllByText(/pokémon/i);
    expect(paragraph).toHaveLength(2);
  });

  test('página contém a seguinte imagem de uma Pokédex', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const img = screen.getByAltText('Pokédex');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
