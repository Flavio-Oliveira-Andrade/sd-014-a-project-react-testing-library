import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWinthRouter from './novoTeste/ renderWithRouter';

const MoreDetails = 'More details';
const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'Kg',
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
  summary: `This intelligent Pokémon roasts hard berries with electricity
  to make them tender anough to eat.`,
};

describe('6. Teste o componente `<Pokemon.js />`', () => {
  test('Teste se é renderizado um card com as'
  + 'informações de determinado pokémon.', () => {
    renderWinthRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);
    const AVERAGE_WEIGHT = `Average weight: ${mockPokemon
      .averageWeight.value} ${mockPokemon.averageWeight.measurementUnit}`;

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();

    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');

    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(AVERAGE_WEIGHT);
  });

  test('- A imagem do Pokémon deve ser exibida. Ela deve'
    + 'conter um atributo `src` com a URL da imagem e um atributo'
    + '`alt` com o texto `<name> sprite`, onde `<name>` é o nome do pokémon;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    expect(screen.getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém'
    + 'um link de navegação para exibir detalhes deste Pokémon.'
    + 'O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é'
    + ' o id do Pokémon exibido;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('link', {
      name: MoreDetails,
    })).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon,'
    + 'é feito o redirecionamento da aplicação para a página de'
    + ' detalhes de Pokémon. ', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByRole('link', { name: MoreDetails }));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para `/pokemon/<id>`,'
  + 'onde `<id>` é o id do Pokémon cujos detalhes se deseja ver;', () => {
    renderWinthRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);

    expect(screen.getByRole('link', { name: MoreDetails })).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');

    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
