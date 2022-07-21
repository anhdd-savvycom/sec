import { renderHook, act } from '@testing-library/react-hooks';
import useDashboard from '../hook';
import useDashboardClient from '@/share/useDashboardClient';
import { PUNCH_TYPES } from '@/share/const';

jest.mock('@/share/useDashboardClient');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((init) => [init, jest.fn]),
}));

describe('useDashboard', () => {
  let mockedUseDashboardClient: jest.MockedFunction<typeof useDashboardClient>;
  beforeEach(() => {
    mockedUseDashboardClient = useDashboardClient as jest.MockedFunction<typeof useDashboardClient>;
  });

  it('should init correctly', () => {
    mockedUseDashboardClient.mockReturnValueOnce({
      states: {
        loading: false,
        data: undefined,
      },
      handlers: {
        newGameHandler: jest.fn(),
      },
    });

    const { result } = renderHook(() => useDashboard());
    const { options, data } = result.current.states;

    expect(typeof options).toBe('object');
    expect(typeof data).toBe('object');
  });

  it('should init correctly - with game data', () => {
    mockedUseDashboardClient.mockReturnValueOnce({
      states: {
        loading: false,
        data: {
          subcribe: {
            black: 15,
            blue: 20,
            orange: 5,
            data: [
              {color: PUNCH_TYPES.BLUE, createdAt: 1},
              {color: PUNCH_TYPES.ORANGE, createdAt: 501},
            ],
            isFinal: true,
            createdAt: null,
          }
        },
      },
      handlers: {
        newGameHandler: jest.fn(),
      },
    });

    const { result } = renderHook(() => useDashboard());
    const { options, data } = result.current.states;

    expect(typeof options).toBe('object');
    expect(typeof data).toBe('object');
  });
});
