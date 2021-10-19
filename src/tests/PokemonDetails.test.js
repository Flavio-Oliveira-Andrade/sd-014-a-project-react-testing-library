import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rendreWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Teste o componente PokemonDetails.js', () => {
  const ID = { params: { id: pokemons[0].id } };
  const FAVORITES = { [pokemons[0].id]: true }; // props do Details, chave dinamica

  it('testa se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    render(<PokemonDetails
      isPokemonFavoriteById={ FAVORITES }
      match={ ID }
      pokemons={ pokemons }
    />);

    const regex = new RegExp(`${pokemons[0].name} Details`, 'i');
    const headingPikachu = screen.getByRole('heading', { name: regex, level: 2 });
    expect(headingPikachu).toBeInTheDocument();

    const pokeLink = screen.queryByRole('link', { name: /More details/i });
    expect(pokeLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const regexSummary = new RegExp(pokemons[0].summary, 'i');
    const details = screen.getByText(regexSummary);
    expect(details).toBeInTheDocument();
  });

  it('testa se existe na página uma seção com os mapas', () => {
    render(<PokemonDetails
      isPokemonFavoriteById={ FAVORITES }
      match={ ID }
      pokemons={ pokemons }
    />);

    const regex = new RegExp(`Game Locations of ${pokemons[0].name}`, 'i');
    const heading = screen.getByRole('heading', { name: regex, level: 2 });
    expect(heading).toBeInTheDocument();

    const pokeMap = screen.getAllByAltText(`${pokemons[0].name} location`);

    expect(pokeMap[0].src).toContain(pokemons[0].foundAt[0].map);
  });

  it('testa se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokeLink);
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);
    const favorite = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite` });
    expect(favorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toBeInTheDocument();
  });
});
