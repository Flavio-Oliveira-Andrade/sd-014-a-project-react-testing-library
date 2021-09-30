import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Verifica o funcionamento do componente "NotFound"', () => {
  it('verifica se a página contém um "h2" com o texto'
  + ' "Page requested not found 😭"', () => {
    render(<NotFound />);
    const heading = screen.getByRole(
      'heading', { level: 2, name: 'Page requested not found Crying emoji' },
    );
    expect(heading).toBeInTheDocument();
  });

  it('verifica se a página exibe o gif do Pikachu chorando', () => {
    render(<NotFound />);
    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAlt = 'Pikachu crying because the page requested was not found';
    const imageElement = screen.getByRole('img', { name: imageAlt });
    expect(imageElement).toHaveAttribute('src', imageSrc);
    expect(imageElement).toBeInTheDocument();
  });
});
