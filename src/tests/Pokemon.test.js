import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const pokName = screen.getByTestId('pokemon-name');
    expect(pokName).toHaveTextContent(`${pokemons[0].name}`);

    const pokType = screen.getByTestId('pokemon-type');
    expect(pokType).toHaveTextContent(`${pokemons[0].type}`);

    const pokWei = screen.getByTestId('pokemon-weight');
    expect(pokWei).toHaveTextContent(`Average weight: ${pokemons[0].averageWeight.value}`
      + ` ${pokemons[0].averageWeight.measurementUnit}`);

    const pokImg = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(pokImg).toHaveAttribute('src', `${pokemons[0].image}`);
    expect(pokImg).toBeInTheDocument();
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém'
    + ' um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da'
    + ' aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const favorito = screen.getByLabelText(/pokémon favoritado/i);
    expect(favorito).toBeInTheDocument();
    fireEvent.click(favorito);

    const favImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
