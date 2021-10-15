import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando a página \'NotFound\'', () => {
  beforeEach(() => renderWithRouter(<NotFound />));
  test('Se a página possui texto \'Page requested not found 😭\'', () => {
    const notFoundText = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
    const notFoundEmoji = screen.getByRole('img', { name: 'Crying emoji' });
    expect(notFoundEmoji).toBeInTheDocument();
  });
  test('Se a página possui um gif do Pikachu chorando', () => {
    const gifSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundGif = screen.getAllByRole('img');
    expect(notFoundGif[1]).toHaveAttribute('src', gifSource);
  });
});
