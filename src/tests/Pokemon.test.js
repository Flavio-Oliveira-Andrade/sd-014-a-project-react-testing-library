import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWigth = screen.getByTestId('pokemon-weight');
      const imgPokemon = screen.getByRole('img');
      expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonName).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
      expect(pokemonWigth).toHaveTextContent('Average weight: 6.0 kg');
    });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkMOreDetails = screen.getByRole('link', { name: /More Details/i });
      userEvent.click(linkMOreDetails);
      expect(history.location.pathname).toBe('/pokemons/25');
      const favorite = screen.getByText(/Pokémon favoritado?/i);
      userEvent.click(favorite);
      const imagefavorite = screen.getAllByRole('img')[1];
      expect(imagefavorite.src).toBe('http://localhost/star-icon.svg');
      expect(imagefavorite.alt).toBe('Pikachu is marked as favorite');
    });

  test('se a imagem do pokemon selecionado existe', () => {
    renderWithRouter(<App />);
    const linkMOreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(linkMOreDetails);
    const imagePikachu = screen.getAllByRole('img')[0];
    expect(imagePikachu.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePikachu.alt).toBe('Pikachu sprite');
  });
});
