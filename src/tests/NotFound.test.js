import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => render(<NotFound />));

  test('A página contém um heading h2 com o texto Page requested not found', () => {
    const h2 = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    expect(h2).toBeInTheDocument();
  });

  test('A página contém a imagem do Pikachu chorando porque a página não existe', () => {
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
