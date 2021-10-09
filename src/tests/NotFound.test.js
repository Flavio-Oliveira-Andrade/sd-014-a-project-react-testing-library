import React from 'react';
import { screen, render } from '@testing-library/react';

// import App from '../App';
// import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente "NotFound"', () => {
  test('Verifica que a página contém um heading `h2`'
  + 'com o texto `Page requested not found 😭`', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/notFound');
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/notFound');
    render(<NotFound />);

    // const notFoundImage = screen.getAllByRole('img');
    // expect(notFoundImage[1]).toBeInTheDocument();
    const notFoundImage = screen.getByAltText(/Pikachu crying/i);
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImage).toBeInTheDocument();
  });
});
