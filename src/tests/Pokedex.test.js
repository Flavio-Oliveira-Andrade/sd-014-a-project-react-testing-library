import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Button, Pokedex } from '../components';

const renderApp = () => render(
  <Router history={ createMemoryHistory('/') }>
    <App />
  </Router>,
);

const mokPok = [{
  averageWeight: 0,
  id: 1,
  image: 'teste1.png',
  name: 'teste1',
  type: 'tipo1',
}, {
  averageWeight: 1,
  id: 2,
  image: 'teste2.png',
  name: 'teste2',
  type: 'tipo2',
}, {
  averageWeight: 2,
  id: 3,
  image: 'teste3.png',
  name: 'teste3',
  type: 'tipo3',
}];

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderApp();
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(h2).toBeInTheDocument();
});
test('Teste se é exibido o próximo Pokémon da'
+ 'lista quando o botão Próximo pokémon é clicado', () => {
  renderApp();
  const btoProximo = screen.getByText(/Próximo pokémon/i);
  expect(btoProximo).toBeInTheDocument();
  const pokeAtual = screen.getByText(/Pikachu/i);
  expect(pokeAtual).toBeInTheDocument();
  userEvent.click(btoProximo);
  const pokeProximo = screen.getByText(/Charmander/i);
  expect(pokeProximo).toBeInTheDocument();
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  userEvent.click(btoProximo);
  const ultimoPoke = screen.getByText(/Dragonair/i);
  expect(ultimoPoke).toBeInTheDocument();
  userEvent.click(btoProximo);
  expect(pokeAtual).toBeInTheDocument();
});
test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  renderApp();
  expect(screen.getAllByText(/more details/i)).toHaveLength(1);
});
test('Teste se a Pokédex tem os botões de filtro.', () => {
  renderApp();
  const proximo = screen.getByRole('button', { name: /Próximo pokémon/i });
  const eletric = screen.getAllByRole('button', { name: 'Electric' });
  expect(eletric).toHaveLength(1);
  const fire = screen.getAllByRole('button', { name: 'Fire' });
  expect(fire).toHaveLength(1);
  const bug = screen.getAllByRole('button', { name: 'Bug' });
  expect(bug).toHaveLength(1);
  const poison = screen.getAllByRole('button', { name: 'Poison' });
  expect(poison).toHaveLength(1);
  const psychic = screen.getAllByRole('button', { name: 'Psychic' });
  expect(psychic).toHaveLength(1);
  const normal = screen.getAllByRole('button', { name: 'Normal' });
  expect(normal).toHaveLength(1);
  const dragon = screen.getAllByRole('button', { name: 'Dragon' });
  expect(dragon).toHaveLength(1);
  userEvent.click(eletric[0]);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  expect(screen.getAllByText(/electric/i)).toHaveLength(2);
  userEvent.click(fire[0]);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  expect(screen.getAllByText(/fire/i)).toHaveLength(2);
  userEvent.click(proximo);
  expect(screen.getAllByText(/fire/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  userEvent.click(bug[0]);
  expect(screen.getAllByText(/bug/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  userEvent.click(poison[0]);
  expect(screen.getAllByText(/poison/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  userEvent.click(psychic[0]);
  expect(screen.getAllByText(/psychic/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  userEvent.click(normal[0]);
  expect(screen.getAllByText(/normal/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  userEvent.click(dragon[0]);
  expect(screen.getAllByText('Dragon')).toHaveLength(2);
});
test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  render(
    <Router history={ createMemoryHistory('/') }>
      <Pokedex pokemons={ mokPok } isPokemonFavoriteById={ false } />
      <Button />
    </Router>,
  );
  const botao = screen.getByRole('button', { name: /all/i });
  const next = screen.getByRole('button', { name: /Próximo pokémon/i });
  const teste1 = screen.getByRole('button', { name: 'tipo1' });
  const teste2 = screen.getByRole('button', { name: 'tipo2' });
  const teste3 = screen.getByRole('button', { name: 'tipo3' });
  expect(botao).toBeInTheDocument();
  expect(screen.getByText('teste1')).toBeInTheDocument();
  userEvent.click(next);
  expect(screen.getByText('teste2')).toBeInTheDocument();
  userEvent.click(next);
  expect(screen.getByText('teste3')).toBeInTheDocument();
  userEvent.click(teste2);
  expect(next).toBeDisabled();
  expect(screen.getByText('teste2')).toBeInTheDocument();
  userEvent.click(teste1);
  expect(next).toBeDisabled();
  expect(screen.getByText('teste1')).toBeInTheDocument();
  userEvent.click(teste3);
  expect(next).toBeDisabled();
  expect(screen.getByText('teste3')).toBeInTheDocument();
  userEvent.click(botao);
  expect(next).toBeEnabled();
});
