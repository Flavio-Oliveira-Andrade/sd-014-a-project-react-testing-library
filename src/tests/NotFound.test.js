import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

// Agradecimentos ao Tiago Sathler com algums conhecimentos e o Rod Pinheiro
// Nada necessáriamente sobre o código do Rod mas sim seus raciocinios e ideias usadas
describe('4. Testa o componente <NotFound.js />:', () => {
  it('4.1.Testa se a página contém um heading h2 com texto "Page requested not found"',
    () => {
      renderWithRouter(<NotFound />);
      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });

  it('4.2. Testa se  a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter(<NotFound />);
      const notFoundImage = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );

      expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
