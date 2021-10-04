import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );

    const prg = screen.getByText(/No favorite pokemon found/i);
    expect(prg).toBeInTheDocument();
  });
});
