import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import data from '../data';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', {
        name: /More details/i,
      });
      userEvent.click(detailsLink);

      expect(detailsLink).not.toBeInTheDocument();
      expect(screen.getByText(`${data[0].name} Details`)).toBeInTheDocument();
      const header = screen.getByRole('heading', {
        level: 2,
        name: /Summary/i,
      });
      expect(header).toBeInTheDocument();
      expect(screen.getByText(data[0].summary)).toBeInTheDocument();
    });

  it('Teste se existe na página uma seção com'
  + ' os mapas contendo as localizações do pokémon',
  () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(header).toBeInTheDocument();
    const imageArray = screen.getAllByAltText(`${data[0].name} location`);
    expect(imageArray.length).toBe(data[0].foundAt.length);
    data[0].foundAt.forEach((entry, index) => {
      expect(screen.getByText(entry.location)).toBeInTheDocument();
      expect(imageArray[index]).toHaveAttribute('src', entry.map);
      expect(imageArray[index]).toHaveAttribute('alt', `${data[0].name} location`);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', {
        name: /More details/i,
      });
      userEvent.click(detailsLink);

      const favoriteCheck = screen.getByRole('checkbox', {
        name: /Pokémon favoritado?/i,
      });
      expect(favoriteCheck).toBeInTheDocument();
      expect(screen.queryByAltText(`${data[0].name} is marked as favorite`))
        .toBe(null);

      userEvent.click(favoriteCheck);
      expect(screen.getByAltText(`${data[0].name} is marked as favorite`))
        .toBeInTheDocument();

      userEvent.click(favoriteCheck);
      expect(screen.queryByAltText(`${data[0].name} is marked as favorite`))
        .toBe(null);
    });
});
