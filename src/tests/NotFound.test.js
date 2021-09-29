import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import historyFunction from '../utils/historyFunction';
import App from '../App';

describe('testa o componente NotFound', () => {
  test('este se página contém um heading ', () => {
    const { history } = historyFunction(<App />);
    history.push('/not');
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: / not found /i,
    });
    const emoji = screen.getByLabelText('Crying emoji');
    expect(notFoundTitle).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { history } = historyFunction(<App />);
    history.push('/not');
    const notFoundImage = screen.getByAltText('Pikachu crying because'
    + ' the page requested was not found');
    expect(notFoundImage).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
