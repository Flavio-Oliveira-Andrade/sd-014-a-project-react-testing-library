import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('4º Verifica se a pagina NotFound contem title e imagem', () => {
  it('verifica se o heading contem o  texto Page requested not found 😭', () => {
    render(<NotFound />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Page requested not found 😭/i);
  });
  it('verifica se renderiza a imagen correta', () => {
    const imgCorrect = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(<NotFound />);
    const imgElement = screen.getByRole('img', { name: /Pikachu/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(imgCorrect);
  });
});
