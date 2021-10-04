import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';
import data from '../data';
import pokemons from '../data';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(data[0].name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(data[0].type);
      const weight = data[0].averageWeight.value;
      const unit = data[0].averageWeight.measurementUnit;
      const weightText = `Average weight: ${weight} ${unit}`;
      expect(screen.getByText(weightText)).toBeInTheDocument();

      const img = screen.getByAltText(`${data[0].name} sprite`);
      expect(img).toHaveAttribute('src', pokemons[0].image);
    });

  it('Teste se o card do Pokémon indicado na Pokédex'
  + 'contém um link de navegação para exibir detalhes deste Pokémon.',
  () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    const linkTo = `/pokemons/${data[0].id}`;
    expect(detailsLink).toHaveAttribute('href', linkTo);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon',
  () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Game Locations of/i)).toBeInTheDocument();
    const currentPath = history.location.pathname;
    expect(currentPath).toBe(`/pokemons/${data[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', {
        name: /Home/i,
      });
      const detailsLink = screen.getByRole('link', {
        name: /More details/i,
      });

      userEvent.click(detailsLink);
      const addFavorite = screen.getByRole('checkbox');
      userEvent.click(addFavorite);
      userEvent.click(home);

      const img = screen.getByAltText('Pikachu is marked as favorite');
      expect(img).toHaveAttribute('src', '/star-icon.svg');
    });
});
