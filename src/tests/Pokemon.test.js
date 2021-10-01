import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('6º verifica o funcionamento do componente Pokemon', () => {
  const boolFavorite = true;
  const { name, type, averageWeight, image, id } = pokemons[0];
  const { value, measurementUnit } = averageWeight;
  it('Verifica se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ boolFavorite } />);

    const nameElement = screen.getByTestId('pokemon-name');
    const typeElement = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(nameElement).toHaveTextContent(name);
    expect(typeElement).toHaveTextContent(type);
    expect(weightPokemon).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    const imgElement = screen.getByRole('img', { name: `${name} sprite` });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', image);
  });
  it('testa se o card possui um link que acessa a pagina de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ boolFavorite }
    />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(linkDetails);
    const pathLocation = history.location.pathname;
    expect(pathLocation).toBe(`/pokemons/${id}`);
  });
  it('verifica se existe um icone de estrela se o pokemon for favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ boolFavorite } />);
    const imgFavorite = screen.getByRole('img', { name: /favorite/i });
    expect(imgFavorite).toBeInTheDocument();

    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
