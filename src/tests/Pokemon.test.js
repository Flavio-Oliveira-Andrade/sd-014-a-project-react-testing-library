import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Elementos do componente  <Pokemon /> ', () => {
  const pokemon = pokemons[0]; // Pikachu

  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value: v, measurementUnit: mu } } = pokemon;
    const pokemonName = screen.getByText(pokemon.name);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByText(`Average weight: ${v} ${mu}`);
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonImage.src).toBe(pokemon.image);
    expect(pokemonImage.alt).toBe(`${pokemon.name} sprite`);
  });
  it('O card Pokémon contém um link de navegação para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('Ao clicar no link "More details" é feito o redirecionamento, '
  + ' da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const textScreen = screen.getByText(/This intelligent Pokémon/);
    expect(textScreen).toBeInTheDocument();
  });

  it('A URL exibida no navegador muda para /pokemon/<id>, onde <id>'
  + ' é o id do Pokémon cujos detalhes se deseja ver;', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const btnFavoritePokemon = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });
    userEvent.click(btnFavoritePokemon);
    const imageFavoritePokemon = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(imageFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
    expect(imageFavoritePokemon).toHaveAttribute('alt',
      `${pokemon.name} is marked as favorite`);
  });
});
