import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import colorsSlice from '../../../redux/slices/colorsSlice';
import { DataTable } from './data-table';

test('renders DataTable', () => {
  const store = configureStore({
    reducer: {
      colors: colorsSlice,
    },
  });

  render(
    <Provider store={store}>
      <DataTable data={[]} />
    </Provider>,
  );

  const pageTitle = screen.getByText(/Dashboard/i);
  expect(pageTitle).toBeInTheDocument();
});
