import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  const renderObject = render(
    <Router history={ customHistory }>
      {componentToRender}
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}

export default renderWithRouter;
