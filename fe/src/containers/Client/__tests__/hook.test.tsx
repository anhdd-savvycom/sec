import { renderHook, act } from '@testing-library/react-hooks';
import useClient from '../hook';
import useClientClient from '@/share/useClientClient';

jest.mock('@/share/useClientClient');

describe('useClient', () => {
  let mockedUseClientClient: jest.MockedFunction<typeof useClientClient>;
  beforeEach(() => {
    mockedUseClientClient = useClientClient as jest.MockedFunction<typeof useClientClient>;
    mockedUseClientClient.mockReturnValueOnce({
      handlers: {
        punchHandler: jest.fn(),
      },
    });
  });

  it('should init correctly', () => {
    const { result } = renderHook(() => useClient());

    expect(typeof result.current.handlers.clickHandler).toBe('function');
  });

  it('should exec clickHandler correctly', () => {
    const { result } = renderHook(() => useClient());
    const { clickHandler } = result.current.handlers;

    act(() => {
      clickHandler();
    });
  });
});
