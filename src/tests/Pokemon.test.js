import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonPic = screen.getByRole('img', { name: /sprite/i });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(pokemonPic).toHaveAttribute('src', image);
    expect(pokemonPic).toHaveAttribute('alt', `${name} sprite`);
  });

  it('Testa se o card tem um link de navegação para exibir detalhes do Pokémon.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute(
      'alt',
      `${pokemons[0].name} is marked as favorite`,
    );
  });
});
