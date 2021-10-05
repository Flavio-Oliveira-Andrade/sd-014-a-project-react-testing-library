import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import data from '../data';
import App from '../App';
import historyRouter from '../services/historyRouter';

describe('Teste o componente `<Pokemon.js />`', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    historyRouter(<App />);

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

    expect(imgPkm).toHaveAttribute('src', `${image}`);
    expect(namePkm.innerHTML).toBe(name);
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
