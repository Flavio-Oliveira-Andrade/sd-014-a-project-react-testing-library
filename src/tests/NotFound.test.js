import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa componente NotFound.js', () => {
  test('Testa se a página NotFound é renderizada corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-qualquer');

    const notFoundHeading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    const notFoundImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
