// feito com ajuda do Notion da BeeDev https://www.notion.so/beedeveloper/BeeDev-b3284d4907f8420eb3bd6021e7baeaf9;
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('About.js - Verificação de funcionamento', () => {
  // reinicia a renderização do App a cada teste;
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  // é possível fazer todos num mesmo "it", mas foi feito seperadamente para questão de organização;
  it('Verifica se há uma tag h2 com o texto "About Pokedex"', () => {
    const h2 = screen.getByRole('heading', { level: 2 }); // https://testing-library.com/docs/queries/byrole/#level;
    expect(h2.innerHTML).toStrictEqual('About Pokédex'); // verifica se o conteudo detro da tag é o esperado;
  });

  it('Verifica a existência de dois paragrafos com info sobre a pokédex', () => {
    // se checado no ./components/About.js, a palavra "Pokémons" está presente em cada paragŕafo,
    // isso pode ser usado para a verificação;
    const pokémons = screen.getAllByText(/Pokémons/); // constante que representa a palavra comum em cada paragráfo;
    expect(pokémons).toHaveLength(2); // verifica se os paragráfos existentes são dois;
  });

  it('Verifica se a página tem a imagem esperada', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'; // src da imagem;
    const img = screen.getByRole('img', { name: 'Pokédex' }); // constante que representa uma imagem com o name/alt igual à "Pokédex";
    expect(img).toBeInTheDocument(); // verifica se há uma imagem com o name/alt de Pokédex no documento;
    expect(img.src).toStrictEqual(src); // verifica se a imagem do documento é a esperada;
  });
});
