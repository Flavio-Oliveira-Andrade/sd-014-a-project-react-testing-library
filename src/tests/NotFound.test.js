import { screen } from '@testing-library/react';

import renderPath from './utilities/renderPath';

describe('Teste se o componente NotFound funciona corretamente', () => {
  test('Testa se a página contém o título NotFound pokedex', () => {
    renderPath('/notfound');

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
    });

    expect(notFoundTitle.innerHTML).toMatch('Page requested not found');
  });

  test('Testa se a página contém uma imagem', () => {
    renderPath('/notfound');

    const image = screen.getAllByRole('img');

    expect(image[1].src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
