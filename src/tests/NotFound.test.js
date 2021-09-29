// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9;
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { NotFound } from '../components';

describe('NotFround.js - Verificando funcionalidade', () => {
  // reinicia a renderização do App a cada teste;
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Verifica se existe uma tag "h2" com o texto esperado e junto a um emoji', () => {
    const h2 = screen.getByRole('heading', { level: 2 }); // https://testing-library.com/docs/queries/byrole/#level;
    expect(h2).toBeInTheDocument(); // verifica se tem um h2 no documento;
    expect(h2).toHaveTextContent('Page requested not found 😭'); // verifica se o texto do h2 no documento é o esperado;
    // a linha 16 daqui está diferente da linha 16 do About.test.js por haver uma tag span dentro do h2 do NotFound.js;
  });

  it('Verifica se aparece o gif esperado', () => {
    const gif = screen.getAllByRole('img')[1]; // o gif é a segunda imagem do array de imagens da tela;
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(gif).toBeInTheDocument();
    expect(gif.src).toContain(src);
  });
});
