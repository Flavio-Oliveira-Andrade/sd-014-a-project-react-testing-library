import { render, screen } from '@testing-library/react';
import React from 'react';
import { Pokedex } from '../components';

describe('testa componente "Pokedex"', () => {
  test('página contém um heading h2 com o texto "Encountered pokémons"', () => {
    render(<Pokedex />);

    const heading = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('é exibido o próximo Pokémon da lista quando "Próximo pokémon" é clicado', () => {

  });

  test('é mostrado apenas um Pokémon por vez', () => {

  });

  test('a Pokédex tem os botões de filtro', () => {

  });

  test('a Pokédex contém um botão para resetar o filtro', () => {

  });
});
