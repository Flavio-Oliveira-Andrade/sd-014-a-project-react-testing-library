import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import { PokemonDetails } from '../components';
import RenderWithRouter from './RenderWithRouter';

const id = { params: { id: '25' } };
const favoriteStatus = { 25: true };

describe('Testa o se o componente Pokemon Details renderiza', () => {
  it('Verifica se as informações detalhadas dos pokemon são mostradas na tela', () => {
    RenderWithRouter(
      <PokemonDetails // PokemonDetails needs to recieve these props to work.
        match={ id }
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteStatus }
      />,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(heading).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
    const text = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
    const paragraph = screen.getByText(text);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se exite uma seção com mapas de ontem o pokemon é encontrado', () => {
    renderWithRouter(
      <PokemonDetails
        match={ id }
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteStatus }
      />,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(heading).toBeInTheDocument();

    const img = screen.getAllByAltText('Pikachu location');
    expect(img).toHaveLength(2);
    expect(img[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(img[0].alt).toBe(`${pokemons[0].name} location`);
  });

  it('Verifica se é possível favoritar a partir da pagina details', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /details/i,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const starImg = screen.getByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
