import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const {
  name,
  summary,
  foundAt,
} = pokemons[0];

function takeHappyPath() {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

  userEvent.click(moreDetailsLink);
  return { moreDetailsLink };
}

describe('7. Teste o componente <PokemonDetails.js />:', () => {
  afterEach(() => {
    cleanup();
  });

  it('7.1. se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { moreDetailsLink } = takeHappyPath();

      const headingDetails = screen.getByRole('heading',
        { level: 2, name: `${name} Details` });
      expect(headingDetails).toBeInTheDocument();

      expect(moreDetailsLink).not.toBeInTheDocument();

      const headingSummary = screen.getByRole('heading', { level: 2, name: /summary/i });
      expect(headingSummary).toBeInTheDocument();

      const textInSummary = screen.getByText(summary);
      expect(textInSummary).toBeInTheDocument();
    });

  it('7.2. se existe na página uma seção com os mapas contendo'
   + 'as localizações do pokémon',
  () => {
    takeHappyPath();

    const headingLocations = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${name}` });
    expect(headingLocations).toBeInTheDocument();

    foundAt.forEach(({ location }) => {
      const mapDescription = screen.getByText(location);
      expect(mapDescription).toBeInTheDocument();
    });

    const allMapImages = screen.getAllByAltText(`${name} location`);
    allMapImages.forEach((mapImage, index) => {
      expect(mapImage).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('7.3. se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      takeHappyPath();

      const favoriteBtn = screen.getByRole('checkbox');
      expect(favoriteBtn).toBeInTheDocument();

      const formInput = screen.getByLabelText(/Pokémon favoritado?/i);
      expect(formInput).toBeInTheDocument();

      userEvent.click(favoriteBtn);
      const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
      expect(favoriteIcon).toBeInTheDocument();

      userEvent.click(favoriteBtn);
      expect(favoriteIcon).not.toBeInTheDocument();
    });
});
