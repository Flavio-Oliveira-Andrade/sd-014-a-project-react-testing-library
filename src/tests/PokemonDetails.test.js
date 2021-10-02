import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderDetails = () => render(
  <Router history={ createMemoryHistory('/pokemons/25') }>
    <App />
  </Router>,
);

test('Teste se as informações detalhadas do Pokémon selecionado'
+ ' são mostradas na tela.', () => {
  renderDetails();
  const detalhes = screen.getByText(/More details/i);
  userEvent.click(detalhes);
  const detalheNome = screen.getByText('Pikachu Details');
  expect(detalheNome).toBeInTheDocument();
  expect(detalhes).not.toBeInTheDocument();
  const heading = screen.getByRole('heading', { level: 2, name: /summary/i });
  expect(heading).toBeInTheDocument();
  const descricao = screen.getByText(/This intelligent Pokémon/i);
  expect(descricao).toBeInTheDocument();
});
test('Teste se existe na página uma seção com os mapas contendo'
+ ' as localizações do pokémon', () => {
  renderDetails();
  const detalhes = screen.getByText(/More details/i);
  userEvent.click(detalhes);
  const gameLocation = screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  });
  expect(gameLocation).toBeInTheDocument();
  const localizacoes = screen.getAllByText(/Kanto/i);
  expect(localizacoes).toHaveLength(2);
  const mapas = screen.getAllByRole('img');
  expect(mapas[1]).toBeInTheDocument();
  expect(mapas[2]).toBeInTheDocument();
  expect(mapas[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapas[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(mapas[1]).toHaveAttribute('alt', 'Pikachu location');
  expect(mapas[2]).toHaveAttribute('alt', 'Pikachu location');
});
test('Teste se o usuário pode favoritar um pokémon através da'
+ ' página de detalhes.', () => {
  renderDetails();
  const detalhes = screen.getByText(/More details/i);
  userEvent.click(detalhes);
  const checkbox = screen.getByLabelText('Pokémon favoritado?');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  userEvent.click(screen.getByText('Favorite Pokémons'));
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
