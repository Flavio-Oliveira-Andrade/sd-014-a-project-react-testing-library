import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('O primeiro link deve possuir o texto "Home"', () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByText('Home');
      expect(linkHome).toBeInTheDocument();
    });
  });
