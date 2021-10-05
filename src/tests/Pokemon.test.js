import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('6 - Testes do componente Pokemon.js', () => {
  describe('Testa se as informaçoes do pokémon são exibidas', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('Checa se exibe o nome correto do pokémon', () => {
      const pokemonName = screen.getByTestId('pokemon-name');

      expect(pokemonName).toHaveTextContent('Pikachu');
    });
    it('Checa se exibe o tipo correto do pokemon', () => {
      const pokemonType = screen.getByTestId('pokemon-type');

      expect(pokemonType).toHaveTextContent('Electric');
    });
    it('Checa se o peso do pokemón é exibido de forma correta', () => {
      const pokemonWeight = screen.getByTestId('pokemon-weight');

      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    });
    it('Testa se a imagem do pokémon é exibida de forma correta', () => {
      const pokemonImage = screen.getByAltText('Pikachu sprite');

      expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImage).toBeInTheDocument();
    });
  });
  describe('Testa se a página de detalhes do pokémon funciona corretamente', () => {
    it('Testa se o link mais detalhes leva aos detalhes do pokemon', () => {
      const { history } = renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
      expect(moreDetailsLink).toBeInTheDocument();

      userEvent.click(moreDetailsLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');

      const pokemonDetailsHeader = screen.getByText('Pikachu Details');
      expect(pokemonDetailsHeader).toBeInTheDocument();
    });
    it('Testa se um pokémon favoritado tem ícone de estrela', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(moreDetailsLink);

      const favoriteCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
      userEvent.click(favoriteCheckbox);

      const favoriteImage = screen.getByAltText('Pikachu is marked as favorite');
      expect(favoriteImage.src).toContain('/star-icon.svg');
      expect(favoriteImage).toBeInTheDocument();
    });
  });
});
