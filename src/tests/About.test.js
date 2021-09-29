import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import About from '../components/About';

describe('teste About', () => {
  it('teste de informações sobre o About', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application Simulates/i)).toBeInTheDocument();
  });

  it('verifica se tem um h2 na pagina', () => {
    renderWithRouter(<About />);
    const aboutH2 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboutH2).toBeInTheDocument();
  });

  it('verifica se tem dois paragrafos', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/digital /i)).toBeInTheDocument();
    expect(screen.getByText(/digital /i)).toBeInTheDocument();
  });

  it('testa se tem a imagem', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
