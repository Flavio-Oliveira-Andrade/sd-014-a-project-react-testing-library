import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe(' Testes NotFoundc.', () => {
  test('página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const tituloNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not/i,
    });
    expect(tituloNotFound).toBeInTheDocument();
  });

  // test('página mostra a imagem', () => {
  //   render(<NotFound />);

  //   const imgNF = screen.getByRole('img', {
  //     src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  //   });
  //   expect(imgNF).toBeInTheDocument();
  // });
});
