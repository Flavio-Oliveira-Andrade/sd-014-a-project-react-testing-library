import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilis/renderWithRouter';
import App from '../App';

describe('Teste o componente "Pokemon"', () => {
  test('Teste se é renderizado um card com as'
  + ' informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const cardPkmName = screen.getByTestId('pokemon-name');
    const cardPkmType = screen.getByTestId('pokemon-type');
    const cardPkmAverage = screen.getByTestId('pokemon-weight');
    const cardPkmImg = screen.getByAltText('Pikachu sprite');

    expect(cardPkmName.innerHTML).toBe('Pikachu');
    expect(cardPkmType.innerHTML).toBe('Electric');
    expect(cardPkmAverage.innerHTML).toBe('Average weight: 6.0 kg');
    expect(cardPkmImg.src).toStrictEqual(img);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um'
  + ' link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o'
  + 'redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkMoreDetails);
    const titlePikachuDetails = screen.getByRole('heading', {
      name: 'Pikachu Details',
    });
    expect(titlePikachuDetails).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador'
  + ' muda para Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkMoreDetails);
    const pkmFavorited = screen.getByRole('checkbox');
    userEvent.click(pkmFavorited);
    const starShows = screen.getByAltText('Pikachu is marked as favorite');
    expect(starShows).toHaveAttribute('src', '/star-icon.svg');
  });
});
