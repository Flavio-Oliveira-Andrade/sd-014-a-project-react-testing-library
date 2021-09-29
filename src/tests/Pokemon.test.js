import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Teste do componente <Pokemon.js />', () => {
  it('Verifique se é renderizado um card com as informações do pokémon.', () => {
    const linkImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
    expect(pokemonImg.src).toBe(linkImage);
  });
  it('Verifique se o card do Pokémon indicado na Pokédex'
  + ' contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });
  it('Verifique se ao clicar no link de navegação do Pokémon,é feito'
  + ' o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Verifique se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const isFavorite = screen.getByAltText(/charmander is marked as favorite/i);
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
