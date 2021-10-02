import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa se o componente PokemonDetails: ', () => {
  it('Mostra informações detalhadas do pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const details = screen.getByRole('heading', { name: /pikachu details/i });
    expect(details).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText = /this intelligent pokémon roasts hard /i;
    const summary = screen.getByText(summaryText);
    expect(summary).toBeInTheDocument();
  });

  it('Mostra uma seção com os mapas onde o pokemon pode ser encontrado', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const locationsHeading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    expect(locationsHeading).toBeInTheDocument();

    const images = screen.getAllByAltText(/location/);
    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('Permite que o usuário favorite o pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const fvtCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(fvtCheckbox).toBeInTheDocument();

    userEvent.click(fvtCheckbox);

    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteStar).toBeInTheDocument();

    userEvent.click(fvtCheckbox);
    expect(favoriteStar).not.toBeInTheDocument();

    const favoriteLabel = screen.getByText(/pokémon favoritado\?/i);
    expect(favoriteLabel).toBeInTheDocument();
  });
});
