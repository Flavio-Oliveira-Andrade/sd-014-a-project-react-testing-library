import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        {component}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('7 Requisito', () => {
  test('Se as infos detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    userEvent.click(detailsLink);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    const h2Details = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });

    expect(h2Details).toBeInTheDocument();

    const pokemonDetails = screen.getByText(
      /this intelligent pokémon roasts hard berries/i,
    );

    expect(h2).toBeInTheDocument();
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas'
  + 'contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    userEvent.click(detailsLink);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /game locations of Pikachu/i,
    });

    expect(h2).toBeInTheDocument();

    const pikachuLocations = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });

    pikachuLocations.forEach((location) => {
      expect(location).toBeInTheDocument();
      expect(location).toHaveAttribute('alt', 'Pikachu location');
    });

    expect(pikachuLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(pikachuLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se o usuário pode favoritar um pokémon'
  + 'através da página de detalhes.', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /details/i,
    });

    userEvent.click(detailsLink);

    const favCheck = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(favCheck).toBeInTheDocument();

    const favLabel = screen.getByText(/pokémon favoritado\?/i);
    expect(favLabel).toBeInTheDocument();

    userEvent.click(favCheck);

    const favStar = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });

    expect(favStar).toBeInTheDocument();

    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favLink);

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();

    const detailsLink2 = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink2);

    const favCheck2 = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(favCheck2);

    const favLink2 = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favLink2);

    const noPokemons = screen.getByText(/no favorite pokemon found/i);

    expect(noPokemons).toBeInTheDocument();
  });
});
