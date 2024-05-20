import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import colorsSlice from '../../../redux/slices/colorsSlice';
import userEvent from '@testing-library/user-event';
import { DataTable } from './data-table';
import fetch from 'cross-fetch';
import { waitFor } from '@testing-library/react';

global.fetch = fetch;

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

describe('DataTable', () => {
  const mockData = [
    { name: 'red', hex: 'FF0000' },
    { name: 'green', hex: '00FF00' },
    { name: 'blue', hex: '0000FF' },
  ];

  const store = configureStore({
    reducer: {
      colors: colorsSlice,
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <DataTable data={mockData} />
      </Provider>,
    );
  });

  it('displays data correctly', () => {
    expect(screen.getByText('red')).toBeInTheDocument();
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
    expect(screen.getByText('green')).toBeInTheDocument();
    expect(screen.getByText('#00FF00')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('#0000FF')).toBeInTheDocument();
  });

  it('opens delete dialog on delete button click', () => {
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
  });

  it('removes a row from the table when the delete button is clicked', async () => {
    expect(screen.queryByText('#FF0000')).toBeInTheDocument();
    
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);
    
    const deleteButton = screen.getByTestId('delete');
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('#FF0000')).not.toBeInTheDocument();
    });
  });
});
