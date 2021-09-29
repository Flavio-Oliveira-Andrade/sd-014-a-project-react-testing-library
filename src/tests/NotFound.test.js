import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Verifica se a pagina NotFound contem title e imagem', () => {
  it('verifica se o heading contem o  texto Page requested not found 😭', () => {
    render(<NotFound />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Page requested not found 😭/i);
  });
});
