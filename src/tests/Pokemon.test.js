import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

const moreDetail = 'More details';

describe('Testes Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pikachuType = screen.getByTestId('pokemon-type');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(pikachuType).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const pikachuImage = screen.getByAltText('Pikachu sprite');

    expect(pikachuImage).toBeInTheDocument();
    expect(pikachuImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado contém um link de navegação', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(moreDetail);

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  test('Teste se ao clicar no link de detalhes, a pagina vai para os detalhes', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(moreDetail);
    userEvent.click(detailsLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByText(moreDetail);
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
