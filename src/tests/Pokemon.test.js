import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const testPokemon = pokemons[0];
const FAV_PATH = '/star-icon.svg';

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { name, type, image,
        averageWeight: { value, measurementUnit } } = testPokemon;

      const weightText = `Average weight: ${value} ${measurementUnit}`;
      const altText = `${name} sprite`;

      renderWithRouter(<Pokemon pokemon={ testPokemon } />);

      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(weightText);
      expect(screen.getByAltText(altText)).toHaveAttribute('src', image);
    });

  test('Testa se existe o link de navegação para os detalhes do pokémon', () => {
    const { id } = testPokemon;
    const detailsPath = `/pokemons/${id}`;
    renderWithRouter(<Pokemon pokemon={ testPokemon } />);
    expect(screen.getByRole('link', { name: 'More details' }))
      .toHaveAttribute('href', detailsPath);
  });

  test('Testa o redirecionamento para a página de detalhes do pokemon', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ testPokemon } isFavorite={ false } />,
    );
    const { id } = testPokemon;
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe um ícone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ testPokemon } isFavorite />);
    const { name } = testPokemon;
    const altText = `${name} is marked as favorite`;
    expect(screen.getByAltText(altText)).toHaveAttribute('src', FAV_PATH);
  });
});
