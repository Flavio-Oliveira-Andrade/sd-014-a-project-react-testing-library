import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');
    const headingH2 = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const { src } = screen.getAllByRole('img')[1];
    expect(headingH2).toBeInTheDocument();
    expect(src).toBe(URL);
  });
});
