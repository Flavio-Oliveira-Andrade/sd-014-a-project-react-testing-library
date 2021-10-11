import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Pokemon component', () => {
  describe('Test if it renders the pokémon card', () => {
    it('shows the correct Pokémon name', () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLink);

      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName.innerHTML).toBe('Pikachu');
    });

    it('shows the correct Pokémon type', () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLink);

      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeType.innerHTML).toBe('Electric');
    });

    it('has the right weight format text', () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLink);

      const pokeWeight = screen.getByTestId('pokemon-weight');
      expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
    });

    it('has the right src and alt info on image', () => {
      renderWithRouter(<App />);

      const detailsLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLink);

      const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      const image = screen.getByAltText('Pikachu sprite');
      expect(image).toHaveAttribute('src', url);
    });
  });

  it('shows navigation link for details with correct id', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('redirects to details page, when navigation link is clicked', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsBtn);

    const detailsText = screen.getByText(/Details/i);
    expect(detailsText).toBeDefined();
  });

  it('uses pokemon id on browser url', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('has a a star icon on favorite Pokémons, with correct alt and src', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const star = screen.getByAltText(/Pikachu is marked/i);
    expect(star).toBeDefined();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
