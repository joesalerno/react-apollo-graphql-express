import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders navbar title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/ttm cam app/i);
  expect(linkElement).toBeInTheDocument();
});