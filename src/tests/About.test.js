import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import About from '../components/About';

describe('Verifica o componente <About />', () => {
  test('Testando o título', () => {
    render(<About />);

    // const { getByRole } = render(<About />);
    const title2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title2).toBeInTheDocument();
  });

  test('Testando se tem 2 paragrafos', () => {
    render(<About />);

    const paragraph1 = screen.getByText(/This application/i, {
      selector: 'p',
    });
    const paragraph2 = screen.getByText(/One can filter/i, {
      selector: 'p',
    });

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Testando renderização da imagem', () => {
    render(<About />);

    const img = screen.getByRole('img');

    // usei a referencia: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
