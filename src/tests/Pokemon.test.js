import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/dom';
import data from '../data';
import App from '../App';

describe('Teste o componente `<Pokemon.js />`', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const {
      name,
      image,
    } = data[0];
    const details = screen.getByRole('link', { name: 'More details' });
    const nav = screen.getByRole('navigation');
    const imgPkm = screen.getByAltText(/Pikachu sprite/i);

    const namePkm = screen.getByTestId('pokemon-name');
    const typePkm = screen.getByTestId('pokemon-type');
    const averagePkm = screen.getAllByTestId('pokemon-weight');

    console.log(typePkm.innerHTML);

    expect(imgPkm).toHaveAttribute('src', `${image}`);
    expect(nav).toBeInTheDocument();
    expect(namePkm).toBeInTheDocument();
    expect(typePkm).toBeInTheDocument();
    expect(typePkm.innerHTML).toBe('Electric');
    expect(averagePkm[0].innerHTML).toBe('Average weight: 6.0 kg');

    fireEvent.click(details);

    const labelFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelFavorite).toBeInTheDocument();

    fireEvent.click(labelFavorite);

    const imgStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    const starLink = '/star-icon.svg';

    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', `${starLink}`);
    expect(imgStar).toHaveAttribute('alt', `${name} is marked as favorite`);
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });
});
