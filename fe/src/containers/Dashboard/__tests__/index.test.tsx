import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/react-testing";

import Dashboard from '../index';
import useDashboard, { UseDashboard } from '../hook';

jest.mock('../hook');

describe('Dashboard', () => {
  let mockedUseDashboard: jest.MockedFunction<UseDashboard>;

  beforeEach(() => {
    mockedUseDashboard = useDashboard as jest.MockedFunction<UseDashboard>;
  });

  it('should render correctly', () => {
    mockedUseDashboard.mockReturnValueOnce({
      states: {
        options: {},
        isFinal: false,
        defaultData: {
          labels: [],
          datasets: [],
        },
        data: {
          labels: [],
          datasets: [],
        },
        gameWsData: undefined,
      },
    });

    render(
      <MockedProvider>
        <Dashboard />
      </MockedProvider>
    );

    const buttonYellow = screen.getByTestId('button-yellow');
    const buttonBlue = screen.getByTestId('button-blue');
    const defaultDataBlock = screen.getByTestId('defaultData');

    expect(buttonYellow).toBeInTheDocument();
    expect(buttonBlue).toBeInTheDocument();
    expect(defaultDataBlock).toBeInTheDocument();
  });

  it('should render correctly - isFinal = true', () => {
    mockedUseDashboard.mockReturnValueOnce({
      states: {
        options: {},
        isFinal: true,
        defaultData: {
          labels: [],
          datasets: [],
        },
        data: {
          labels: [],
          datasets: [],
        },
        gameWsData: undefined,
      },
    });

    render(
      <MockedProvider>
        <Dashboard />
      </MockedProvider>
    );

    const dataBlock = screen.getByTestId('data');

    expect(dataBlock).toBeInTheDocument();
  });

  it('should render correctly - has gameWsData', () => {
    mockedUseDashboard.mockReturnValueOnce({
      states: {
        options: {},
        isFinal: false,
        defaultData: {
          labels: [],
          datasets: [],
        },
        data: {
          labels: [],
          datasets: [],
        },
        gameWsData: {
          subcribe: {
            black: 0,
            blue: 5,
            orange: 10,
            data: [],
            isFinal: false,
            createdAt: null,
          }
        },
      },
    });

    render(
      <MockedProvider>
        <Dashboard />
      </MockedProvider>
    );

    const buttonYellow = screen.getByTestId('button-yellow');
    const buttonBlue = screen.getByTestId('button-blue');

    expect(buttonYellow.textContent).toEqual('10');
    expect(buttonBlue.textContent).toEqual('5');
  });
});
