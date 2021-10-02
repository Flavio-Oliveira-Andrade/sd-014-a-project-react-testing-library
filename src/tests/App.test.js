import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './new-test/RenderWithRouter';
import App from '../App';

describe('Verifique se aplicação contém um conjunto fixo de links de navegação.', () => {
  it('Existem os respectivos texto "Home" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);

    // Interagir com eles (se houver necessidade):

    // Fazer o teste / testes:
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('Existem o texto "About" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);

    // Interagir com eles (se houver necessidade):

    // Fazer o teste / testes:
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('Existem os respectivos texto "Favorite Pokémons" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);

    // Interagir com eles (se houver necessidade):

    // Fazer o teste / testes:
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
