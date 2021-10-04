import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/dom';
import App from '../App';

describe('Teste o componente `<FavoritePokemons.js />`', () => {
  it('pagina "No favorite pokemon found" caso a pessoa não tenha adicionado pkm', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    fireEvent.click(favorite);

    const notFound = screen.getByText(/No favorite pokemon found/i);

    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const typeFire = screen.getByRole('button', { name: /Fire/i });

    fireEvent.click(typeFire);

    const nomePkm = screen.getByText(/Charmander/i);
    const detailsPkm = screen.getByText(/More details/i);

    expect(nomePkm).toBeInTheDocument();

    fireEvent.click(detailsPkm);

    const labelPkm = screen.getByLabelText(/Pokémon favoritado?/i);

    fireEvent.click(labelPkm);

    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    fireEvent.click(favorite);

    const namePkmfavorite = screen.getByText(/Charmander/i);

    expect(namePkmfavorite).toBeInTheDocument();
  });
});
