import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente PokemonDetails.js', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(linkMoreDetails);
      expect(linkMoreDetails).not.toBeInTheDocument();

      const nameDetails = screen.getByText(`${data[0].name} Details`);
      expect(nameDetails).toBeInTheDocument();

      const headinglvl2 = screen.getByRole('heading', {
        level: 2,
        name: /summary/i,
      });
      expect(headinglvl2).toBeInTheDocument();

      const summary = screen.getByText(data[0].summary);
      expect(summary).toBeInTheDocument();
    });

  test('Testa se existe na página uma seção com os mapas'
  + 'contendo as localizações do pokémon',
  () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const headinglvl2 = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(headinglvl2).toBeInTheDocument();

    const pokemonLocation = screen.getAllByAltText(/pikachu location/i);
    expect(pokemonLocation[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Testa se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(linkMoreDetails);

      const checkboxfav = screen.getByRole('checkbox', {
        name: /pokémon favoritado?/i,
      });
      expect(checkboxfav).toBeInTheDocument();

      userEvent.click(checkboxfav);
      expect(screen.getByAltText(`${data[0].name} is marked as favorite`))
        .toBeInTheDocument();

      userEvent.click(checkboxfav);
      expect(screen.queryByAltText(`${data[0].name} is marked as favorite`))
        .not.toBeInTheDocument();
    });
});
