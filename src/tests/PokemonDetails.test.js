import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails.js test', () => {
  const moreDetails = 'More details';
  it('Testa se as informações detalhadas do Pokémon'
  + ' selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const namePokeDetails = screen.getByRole('heading',
      { leve: 2, name: 'Pikachu Details' });
    expect(namePokeDetails).toBeInTheDocument();

    expect(linkMoreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const resumo = screen.getByText(/This intelligent Pokémon/);
    expect(resumo).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção com os mapas'
  + ' contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const gameOfLocation = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu' });
    expect(gameOfLocation).toBeInTheDocument();

    const allImgLocations = screen.getAllByAltText('Pikachu location');
    expect(allImgLocations.length).toBe(2);

    const allTextLocation = screen.getAllByText(/Kanto/);
    expect(allTextLocation.length).toBe(2);

    expect(allImgLocations[0]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allImgLocations[1]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(linkMoreDetails);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.checked).toBe(false);

      userEvent.click(checkbox);

      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(linkFavorite);

      const pokefavo = screen.getByTestId('pokemon-name');
      expect(pokefavo).toBeInTheDocument();

      history.push('/pokemons/25');

      userEvent.click(checkbox);
      userEvent.click(linkFavorite);
      expect(pokefavo).not.toBeInTheDocument();

      history.push('/pokemons/25');

      const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(checkboxLabel).toBeInTheDocument();
    });
});
