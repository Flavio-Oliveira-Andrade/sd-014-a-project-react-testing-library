import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const MoreDetails = 'More Details';

describe('Teste o componente `<PokemonDetails.js />`', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado'
  + 'são mostradas na tela', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByText(MoreDetails)).toBeNull();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon roasts hard berries/i))
      .toBeInTheDocument();
  });
  test(' Teste se existe na página uma seção com os'
  + 'mapas contendo as localizações do pokémon', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getAllByAltText('Pikachu location').length).toBe(2);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon'
  + 'através da página de detalhes', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
