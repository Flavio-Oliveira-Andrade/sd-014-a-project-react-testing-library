import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('É renderizado um card com as informações de determinado pokémon.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName.textContent).toBe('Pikachu');

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.textContent).toBe('Electric');

  const pokemonAverageWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonAverageWeight.textContent).toBe('Average weight: 6.0 kg');

  const pokemonImage = screen.getByRole('img', {
    name: 'Pikachu sprite',
  });
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('O card do Pokémon indicado na Pokédex contém um link de navegação '
+ 'para exibir detalhes deste Pokémon.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const moreDetailsLink = screen.getByRole('link', {
    name: /More details/i,
  });
  expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(moreDetailsLink);
});

test('Ao clicar no link de navegação do Pokémon, '
+ 'é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(moreDetailsLink);

  const pokemonDetails = screen.getByRole('heading', {
    name: 'Pikachu Details',
  });
  expect(pokemonDetails).toBeInTheDocument();
});

test('Existe um ícone de estrela nos Pokémons favoritados', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetailsLink = screen.getByRole('link', {
    name: 'More details',
  });
  userEvent.click(moreDetailsLink);

  const pokemonDetails = screen.getByRole('heading', {
    name: 'Pikachu Details',
  });
  expect(pokemonDetails).toBeInTheDocument();

  const pokemonFavoriteElement = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(pokemonFavoriteElement);

  const imageIcon = screen.getByRole('img', {
    name: 'Pikachu is marked as favorite',
  });
  expect(imageIcon).toHaveAttribute('src', '/star-icon.svg');
  expect(imageIcon).toBeInTheDocument();
});
