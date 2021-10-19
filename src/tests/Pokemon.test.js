import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rendreWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];

    const pokeName = screen.getByTestId(/pokemon-name/i);
    expect(pokeName).toHaveTextContent(name);
    const pokeType = screen.getByTestId(/pokemon-type/i);
    expect(pokeType).toHaveTextContent(type);
    const pokeWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokeImg = screen.getByRole('img');
    expect(pokeImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokeImg).toHaveAttribute('src', image);
    expect(pokeImg).toBeInTheDocument();
  });

  it('Teste se o card contém um link de navegação para exibir detalhes dele', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pokeLink = screen.getByRole('link', { name: /More details/i });
    expect(pokeLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(pokeLink).toBeInTheDocument();
  });

  it('testa se ao clicar no link de navegação, é feito o redirecionamento.', () => {
    renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokeLink);

    const regex = new RegExp(`${pokemons[0].name} Details`, 'i');
    const headingPikachu = screen.getByRole('heading', { name: regex, level: 2 });
    expect(headingPikachu).toBeInTheDocument();
  });

  it('testa se a URL exibida no navegador muda para /pokemon/<id>;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pokeLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokeLink);
    expect(window.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const pokeImg = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite` });
    expect(pokeImg).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(pokeImg).toHaveAttribute('src', /\/star-icon.svg/i);
    expect(pokeImg).toBeInTheDocument();
  });
});
