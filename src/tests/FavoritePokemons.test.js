import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('3. Teste o componente <FavoritePokemons.js', () => {
  it('este se é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos',
  () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const home = screen.getByRole('link', {
        name: /Home/i,
      });
      const moreDetails = screen.getByRole('link', {
        name: /More details/i,
      });
      fireEvent.click(moreDetails);
      const addFavorite = screen.getByRole('checkbox');
      fireEvent.click(addFavorite);

      fireEvent.click(home);
      const fire = screen.getByRole('button', {
        name: /fire/i,
      });
      fireEvent.click(fire);
      const moreDetails2 = screen.getByRole('link', {
        name: /More details/i,
      });
      fireEvent.click(moreDetails2);
      const addFavorite2 = screen.getByRole('checkbox');
      fireEvent.click(addFavorite2);

      const favorite = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });
      fireEvent.click(favorite);
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
});
