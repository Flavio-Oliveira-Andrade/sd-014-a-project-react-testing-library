import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const moreDetails = 'More details';

describe('Teste o componente <Pokemon />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const { averageWeight } = pokemons[0];
    const image = screen.getByAltText('Pikachu sprite');
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe(pokemons[0].name);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe(pokemons[0].type);
    expect(screen.getByTestId('pokemon-weight').innerHTML)
      .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', pokemons[0].image);
  });

  test('Se o card do Pokémon indicado na Pokédex contém'
  + ' um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: moreDetails })).toBeInTheDocument();
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o'
  + 'redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: moreDetails }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const favorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
