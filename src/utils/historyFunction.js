import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function historyFunction(component) {
  const customHistory = createMemoryHistory();

  const renderObject = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}
export default historyFunction;
