import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

const pikachuData = {
  weight: data[0].averageWeight.value,
  measurementUnit: data[0].averageWeight.measurementUnit,
  imgLink: data[0].image,
  name: data[0].name,
  id: data[0].id,
};

test('Teste o componente <Pokemon.js />', () => {
  const { history } = renderWithRouter(
    <Pokemon pokemon={ data[0] } isFavorite={ false } />,
  );

  expect(
    screen.getAllByText('Pikachu'),
  ).toHaveLength(1);

  expect(
    screen.getAllByText('Electric'),
  ).toHaveLength(1);

  expect(
    screen.getAllByText('Average weight: 6.0 kg'),
  ).toHaveLength(1);

  expect(
    screen.getByTestId('pokemon-weight').textContent,
  ).toBe(`Average weight: ${pikachuData.weight} ${pikachuData.measurementUnit}`);

  expect(
    screen.getByRole('img').alt,
  ).toBe(`${pikachuData.name} sprite`);

  expect(
    screen.getByRole('img').src,
  ).toBe(`${pikachuData.imgLink}`);

  fireEvent.click(
    screen.getByText('More details'),
  );

  expect(
    history.location.pathname,
  ).toBe(`/pokemons/${pikachuData.id}`);
});

test('se pokemon favoritado se comporta de forma correta', () => {
  renderWithRouter(
    <Pokemon pokemon={ data[0] } isFavorite />,
  );

  expect(
    screen.getAllByRole('img'),
  ).toHaveLength(2);

  expect(
    screen.getAllByRole('img')[1].src,
  ).toBe('http://localhost/star-icon.svg');

  expect(
    screen.getAllByRole('img')[1].alt,
  ).toBe(`${pikachuData.name} is marked as favorite`);
});
