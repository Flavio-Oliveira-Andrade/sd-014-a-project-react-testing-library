import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import historyRouter from '../services/historyRouter';
import data from '../data';

const {
  name,
  summary,
  foundAt,
} = data[0];

describe('Teste o componente `<PokemonDetails.js />`', () => {
  it('A página deve conter um texto `<name> Details`', () => {
    historyRouter(<App />);

    const btnDetails = screen.getByText('More details');

    fireEvent.click(btnDetails);

    const h2namePkm = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });

    const Summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    const SummaryInfo = screen.getByText(/This intelligent Pokémon roasts hard/i);
    const gameLocation = screen.getByRole('heading', { level: 2, name: /game locatio/i });
    const locations = screen.getAllByRole('img', { name: /Pikachu location/i });
    const inputCheckbox = screen.getAllByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });

    fireEvent.click(inputCheckbox[0]);
    const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite).toBeInTheDocument();

    fireEvent.click(inputCheckbox[0]);

    expect(imgFavorite).not.toBeInTheDocument();
    expect(inputCheckbox[0]).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', `${foundAt[0].map}`);
    expect(locations[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locations[1]).toHaveAttribute('src', `${foundAt[1].map}`);
    expect(locations[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(gameLocation.innerHTML).toBe(`Game Locations of ${name}`);
    expect(btnDetails).not.toBeInTheDocument();
    expect(h2namePkm).toBeInTheDocument();
    expect(Summary).toBeInTheDocument();
    expect(SummaryInfo.innerHTML).toBe(summary);
  });
});
