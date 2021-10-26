import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const { name,
        type,
        averageWeight: { value, measurementUnit },
        image,
      } = pokemons[0];

      const pokemonName = screen.getByTestId(/pokemon-name/i);
      expect(pokemonName).toHaveTextContent(name);

      const pokemonType = screen.getByTestId(/pokemon-type/i);
      expect(pokemonType).toHaveTextContent(type);

      const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

      const pokemonImg = screen.getByRole('img');
      expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);
      expect(pokemonImg).toHaveAttribute('src', image);
      expect(pokemonImg).toBeInTheDocument();
    });

  test('Testa se o card contém um link de navegação para exibir detalhes dele',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

      const pokemonLinkNav = screen.getByRole('link', {
        name: /More details/i,
      });
      expect(pokemonLinkNav).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
      expect(pokemonLinkNav).toBeInTheDocument();
    });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
  + 'onde <id> é o id do Pokémon cujos detalhes se deseja ver',
  () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pokemonURL = screen.getByText(/More details/i);
    userEvent.click(pokemonURL);
    expect(window.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    // window.location.pathname - https://stackoverflow.com/questions/51988873/how-to-read-the-current-url-in-the-react-application/51988991
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

      const pokemonImg = screen.getByRole('img', {
        name: `${pokemons[0].name} is marked as favorite` });
      expect(pokemonImg).toHaveAttribute(
        'alt',
        `${pokemons[0].name} is marked as favorite`,
      );
      expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
      expect(pokemonImg).toBeInTheDocument();
    });
});
