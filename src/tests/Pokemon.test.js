import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  const {
    id,
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0];
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link'
  + ' de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeDefined();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação para a página de detalhes de Pokémon e se a URL exibida no navegador'
  + ' muda para `/pokemon/<id>`, onde `<id>` é o id do Pokémon cujos detalhes se deseja'
  + ' ver', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);

    const favoriteCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favoriteCheck);

    const icon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
