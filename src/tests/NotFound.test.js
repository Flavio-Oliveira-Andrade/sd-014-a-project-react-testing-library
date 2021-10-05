import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('4 - Testes do componente NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Deve haver o texto "Page requestednot found"', () => {
    const pageNotFoundText = screen.getByText(/Page requested not found/i);

    expect(pageNotFoundText).toBeInTheDocument();
  });

  it('Deve haver uma imagem personalizada', () => {
    const pageNotFoundImage = screen.getByAltText(/Pikachu crying/i);

    expect(pageNotFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(pageNotFoundImage).toBeInTheDocument();
  });
});
