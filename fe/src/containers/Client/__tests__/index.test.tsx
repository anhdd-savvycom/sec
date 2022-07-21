import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/react-testing";

import Client from '../index';
import useClient, { UseClient } from '../hook';

jest.mock('../hook');

describe('Client', () => {
  let mockedUseClient: jest.MockedFunction<UseClient>;
  let mockedClickHandler: jest.MockedFunction<(value: number) => any>;

  beforeEach(() => {
    mockedUseClient = useClient as jest.MockedFunction<UseClient>;
    mockedClickHandler = jest.fn();
    mockedUseClient.mockReturnValueOnce({
      handlers: {
        clickHandler: mockedClickHandler,
      },
    });
  });

  it('should render correctly', () => {
    render(
      <MockedProvider>
        <Client />
      </MockedProvider>
    )

    const buttonYellow = screen.getByTestId('button-yellow');
    const buttonBlue = screen.getByTestId('button-blue');

    expect(buttonYellow).toBeInTheDocument();
    expect(buttonBlue).toBeInTheDocument();
  });

  it('should trigger yellow button click correctly', () => {
    render(
      <MockedProvider>
        <Client />
      </MockedProvider>
    )

    const buttonYellow = screen.getByTestId('button-yellow');
    fireEvent.click(buttonYellow);

    expect(mockedClickHandler).toHaveBeenCalled();
  });

  it('should trigger blue button click correctly', () => {
    render(
      <MockedProvider>
        <Client />
      </MockedProvider>
    )

    const buttonBlue = screen.getByTestId('button-blue');
    fireEvent.click(buttonBlue);

    expect(mockedClickHandler).toHaveBeenCalled();
  });
})