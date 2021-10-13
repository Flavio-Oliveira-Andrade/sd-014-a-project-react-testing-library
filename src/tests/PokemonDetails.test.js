import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('7. Teste o componente `<PokemonDetails.js />`', () => {
  const MoreDetails = 'More details';

  it('Teste se as informações detalhadas do Pokémon'
   + 'selecionado são mostradas na tela.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByText(MoreDetails));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByText(MoreDetails)).toBeNull();
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    })).toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os'
   + 'mapas contendo as localizações do pokémon', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    // userEvent.click(screen.getByText(MoreDetails));
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    })).toBeInTheDocument();

    expect(screen.getAllByAltText(('Pikachu location')).length).toBe(2);
    expect(screen.getAllByRole('img')[1])
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getAllByRole('img')[2])
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um'
   + 'pokémon através da página de detalhes.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  });
});
