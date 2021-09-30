import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    render(<FavoritePokemons />);

    const noFavoriteText = screen.getByText('No favorite pokemon found');

    expect(noFavoriteText).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    fireEvent.click(favorite);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favoriteLink);

    const isFavorite = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(isFavorite).toBeInTheDocument();
  });
});
