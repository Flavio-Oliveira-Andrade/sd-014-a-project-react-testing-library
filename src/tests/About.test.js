import { screen } from '@testing-library/react';

import renderPath from './utilities/renderPath';

describe('Teste se o componente About funciona corretamente', () => {
  test('Testa se a página contém o título about pokedex', () => {
    renderPath('/about');

    const infos = screen.getByText('About Pokédex');

    expect(infos).toBeInTheDocument();
  });

  test('Testa se a página contém a imagem da pokedex', () => {
    renderPath('/about');

    const image = screen.getByRole('img');

    expect(image.src).toMatch('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
