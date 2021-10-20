import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

const POKEMON_ID = 65;
const alakazamInfo = data.find((pokemon) => pokemon.id === POKEMON_ID);

describe('Verifica o componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações '
    + 'de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ alakazamInfo } isFavorite />);
    expect(screen.getByText(alakazamInfo.name)).toBeInTheDocument();
    expect(screen.getByText(alakazamInfo.type)).toBeInTheDocument();
    const alakazamWeightValue = alakazamInfo.averageWeight.value;
    const alakazamWeightMeasure = alakazamInfo.averageWeight.measurementUnit;
    const WeigthText = `Average weight: ${alakazamWeightValue} ${alakazamWeightMeasure}`;
    expect(screen.getByText(WeigthText)).toBeInTheDocument();
    expect(screen.getByAltText(`${alakazamInfo.name} sprite`))
      .toHaveAttribute('src', alakazamInfo.image);
  });
  it('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação para '
    + 'exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, '
      + 'onde <id> é o id do Pokémon exibido e se esse link redireciona '
      + 'para a página de detalhes de pokemon com a URL /pokemon/<id>', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ alakazamInfo }
      isFavorite
    />);
    const link = screen.getByText('More details');
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${alakazamInfo.id}`);
  });
  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ alakazamInfo } isFavorite />);
    expect(screen.getByAltText(`${alakazamInfo.name} is marked as favorite`))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
