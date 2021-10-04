import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente "NotFound"', () => {
  test('Verifica que a página contém um heading `h2`'
  + 'com o texto `Page requested not found 😭`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');

    const notFoundImage = screen.getAllByRole('img');
    expect(notFoundImage[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImage[1]).toBeInTheDocument();
  });
});
