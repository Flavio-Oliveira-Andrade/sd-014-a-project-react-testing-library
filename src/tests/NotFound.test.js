import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('NotFound.js test', () => {
  it(' Testa se página contém um heading h2 com o texto Page requested not found 😭;',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page/not/found');

      const msgNoFavoritePokeFound = screen.getByRole('heading',
        { level: 2,
          name: 'Page requested not found Crying emoji' });
      expect(msgNoFavoritePokeFound).toBeInTheDocument();
    });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page/not/found');
      const img = (
        screen.getByAltText('Pikachu crying because the page requested was not found'));
      expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
