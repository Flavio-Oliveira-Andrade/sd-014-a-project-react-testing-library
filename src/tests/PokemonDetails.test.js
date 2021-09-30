import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon'
    + ' selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(`${pokemons[0].summary}`)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os'
    + ' mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    expect(screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    })).toBeInTheDocument();

    const { foundAt } = pokemons[0];
    const locations = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(locations).toHaveLength(foundAt.length);

    foundAt.map((location, index) => expect(locations[index])
      .toHaveAttribute('src', location.map));
  });

  test('Testa se o usuário pode favoritar um pokémon'
    + ' através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const favorito = screen.getByLabelText(/pokémon favoritado/i);
    expect(favorito).toBeInTheDocument();
    fireEvent.click(favorito);

    const favImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');

    fireEvent.click(favorito);
    expect(favImg).not.toBeInTheDocument();
  });
});
