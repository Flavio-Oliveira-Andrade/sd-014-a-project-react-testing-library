import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import App from '../App';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with'
  + ' electricity to make them tender enough to eat.',
};

const renderPokemon = () => render(
  <Router history={ createMemoryHistory('/') }>
    <Pokemon
      pokemon={ pikachu }
      isFavorite={ false }
    />
  </Router>,
);
const moreDetails = 'More details';
test('Teste se é renderizado um card com as informações de'
+ ' determinado pokémon.', () => {
  const { name, type, averageWeight } = pikachu;
  const { value, measurementUnit } = averageWeight;
  renderPokemon();
  const nome = screen.getByText(name);
  const tipo = screen.getByText(type);
  const peso = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
  const imagem = screen.getAllByRole('img')[0];
  expect(nome).toBeInTheDocument();
  expect(tipo).toBeInTheDocument();
  expect(peso).toBeInTheDocument();
  expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imagem).toHaveAttribute('alt', `${name} sprite`);
});
test('Teste se o card do Pokémon indicado na Pokédex contém'
+ ' um link de navegação para exibir detalhes deste Pokémon.'
+ ' O link deve possuir a URL /pokemons/<id>, onde <id> é o id d', () => {
  const { id } = pikachu;
  renderPokemon();
  const detalhes = screen.getByRole('link', { name: moreDetails });
  expect(detalhes).toBeInTheDocument();
  expect(detalhes).toHaveAttribute('href', `/pokemons/${id}`);
});
test('Teste se ao clicar no link de navegação do Pokémon, é feito'
+ ' o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
  const { id } = pikachu;
  const history = createMemoryHistory('/');
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detalhes = screen.getByRole('link', { name: moreDetails });
  userEvent.click(detalhes);
  history.push(`/pokemons/${id}`);
  const verDetalhes = screen.getByText('Summary');
  expect(verDetalhes).toBeInTheDocument();
});
test('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
+ ' onde <id> é o id do Pokémon cujos detalhes se deseja ver;', () => {
  const { id } = pikachu;
  const history = createMemoryHistory('/');
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detalhes = screen.getByRole('link', { name: moreDetails });
  userEvent.click(detalhes);
  history.push(`/pokemons/${id}`);
  expect(history.location.pathname).toBe(`/pokemons/${id}`);
});
test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { id } = pikachu;
  const history = createMemoryHistory('/');
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const detalhes = screen.getByRole('link', { name: moreDetails });
  userEvent.click(detalhes);
  history.push(`/pokemons/${id}`);
  const favoritar = screen.getByRole('checkbox');
  userEvent.click(favoritar);
  history.push('/');
  const favoritado = screen.getAllByRole('img')[1];
  expect(favoritado).toBeInTheDocument();
  expect(favoritado).toHaveAttribute('src', '/star-icon.svg');
  expect(favoritado).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
