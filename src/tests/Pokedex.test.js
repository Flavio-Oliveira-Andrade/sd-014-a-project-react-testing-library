// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
// import RenderWithRouter from '../util/RenderWithRouter';
// import mock from './mock/mockpok';

// test('cabeçalho h2', () => {
//   RenderWithRouter(<Pokedex { ...mock } />);
//   const tituloH2 = screen.getByRole('heading', {
//     name: /Encountered pokémons/i,
//     level: 2,
//   });

//   expect(tituloH2).toBeInTheDocument();
// });

// test('teste proximo pokemon', () => {
//   RenderWithRouter(<Pokedex { ...mock } />);
//   const botãoProximoPokemon = screen.getByRole('button', {
//     name: /próximo po/i,
//   });
//   expect(botãoProximoPokemon).toBeInTheDocument();

//   const idNomePOk = 'pokemon-name';

//   const testandoNome = screen.getByTestId(idNomePOk).innerHTML;
//   expect(testandoNome).toBe(mock.pokemons[0].name);

//   userEvent.click(botãoProximoPokemon);
//   const testandoNome2 = screen.getByTestId(idNomePOk).innerHTML;
//   expect(testandoNome2).toBe(mock.pokemons[1].name);

//   userEvent.click(botãoProximoPokemon);
//   const testandoNome3 = screen.getByTestId(idNomePOk).innerHTML;
//   expect(testandoNome3).toBe(mock.pokemons[2].name);
// });

// test('testando tipo', () => {

// });
test('', () => {});
