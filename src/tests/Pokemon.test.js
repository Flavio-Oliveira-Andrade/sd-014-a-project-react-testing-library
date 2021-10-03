import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pokeNameTestId = 'pokemon-name';

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

describe('6 Requisito', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const pokemonName = screen.getByTestId(pokeNameTestId);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const img = screen.getAllByRole('img');

    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img[0]).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o '
  + 'redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    expect(h2).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    const favCheck = screen.getByRole('checkbox', { checked: false });

    userEvent.click(favCheck);

    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');

    expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
