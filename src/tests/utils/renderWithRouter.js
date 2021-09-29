import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

// referência: aula 15.3
function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  const renderObject = render(
    <Router history={ customHistory }>
      { componentToRender }
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}

export default renderWithRouter;
