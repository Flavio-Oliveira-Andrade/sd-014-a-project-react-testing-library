import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/dom';
import App from '../App';

describe('Teste o componente `<Pokemon.js />`', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const details = screen.getByRole('link', { name: /More details/i });
    const nav = screen.getByRole('navigation');

    const namePkm = screen.getByTestId('pokemon-name');
    const typePkm = screen.getByTestId('pokemon-type');
    const averagePkm = screen.getAllByTestId('pokemon-weight');

    expect(nav).toBeInTheDocument();
    expect(namePkm).toBeInTheDocument();
    expect(typePkm).toBeInTheDocument();
    expect(averagePkm[0].innerHTML).toBe('Average weight: 6.0 kg');

    fireEvent.click(details);

    const labelFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelFavorite).toBeInTheDocument();

    fireEvent.click(labelFavorite);

    const imgStar = screen.getByAltText(/Pikachu is marked as favorite/i);

    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });
});
