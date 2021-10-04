import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

const noFound = 'No favorite pokemon found';

describe('Testando componente FavortitePokemons', () => {
  test('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    // passo 1 adicionar componente
    render(<FavoritePokemons />);

    // passo 2 interagir com ele(caso aja necessidade)

    // passo 3 fazer o teste
    expect(screen.getByText(noFound)).toBeInTheDocument();
  });

  // test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  //   // passo 1 adicionar componente
  //   render(<FavoritePokemons />);

  //   // passo 2 interagir com ele(caso aja necessidade)

  //   // passo 3 fazer o teste
  //   expect(screen.('section')).toBeInTheDocument();
  // });
});
