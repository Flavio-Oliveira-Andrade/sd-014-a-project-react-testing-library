import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('Teste se as informações  do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const PokeName = screen.getByTestId('pokemon-name');
    expect(PokeName).toHaveTextContent('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
    const pokeweight = screen.getByTestId('pokemon-weight');
    expect(pokeweight).toHaveTextContent(/average weight: 6\.0 kg/i);
    const imag = screen.getByRole('img', { name: /pikachu sprite/i }).src;
    expect(imag).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: /More details/i });
    expect(detailLink).toBeInTheDocument();
    fireEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favorito = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorito.src).toBe('http://localhost/star-icon.svg');
    expect(favorito.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
