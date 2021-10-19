import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../util/RenderWithRouter';
import App from '../App';
import pokemons from '../data';
import { PokemonDetails } from '../components';

describe('fazendo testes no Pokemon details', () => {
  test('fazendo testes dos detalhes sobre o pokemon', () => {
    RenderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetalhes);

    const nomePok = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
      level: 2,
    });
    expect(nomePok).toBeInTheDocument();

    const summaryExiste = screen.getByText('Summary');
    expect(summaryExiste).toBeInTheDocument();

    const pokemonSummary = screen.getByText(`${pokemons[0].summary}`);
    expect(pokemonSummary).toBeInTheDocument();

    const pokemonLocations = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    expect(pokemonLocations).toBeInTheDocument();

    const checkDeFavoritos = screen.getByText('Pokémon favoritado?');
    expect(checkDeFavoritos).toBeInTheDocument();
  });

  test('testando a imagem do picachu', () => {
    RenderWithRouter(<App />);
    const linkDetalhes3 = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetalhes3);

    const imgPikachu = screen.getAllByRole('img')[0];
    expect(imgPikachu).toHaveAttribute('src', `${pokemons[0].image}`);
    expect(imgPikachu).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });

  test('testando os mapas ', () => {
    RenderWithRouter(<App />);
    const linkDetalhes3 = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetalhes3);

    const mapaDaLocalização = screen.getAllByRole('img')[1];
    expect(mapaDaLocalização).toHaveAttribute('src', `${pokemons[0].foundAt[0].map}`);
    expect(mapaDaLocalização).toHaveAttribute('alt', `${pokemons[0].name} location`);

    const mapaDaLocalização2 = screen.getAllByRole('img')[2];
    expect(mapaDaLocalização2).toHaveAttribute('src', `${pokemons[0].foundAt[1].map}`);
    expect(mapaDaLocalização2).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
});
