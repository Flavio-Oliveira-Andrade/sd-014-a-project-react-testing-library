import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(componentToRender) {
  const changeHistory = createMemoryHistory();

  const renderObejct = render(
    <Router history={ changeHistory }>
      {componentToRender}
    </Router>,
  );
  return {
    ...renderObejct,
    history: changeHistory,
  };
}

export default renderWithRouter;
