import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';

/**
 * Example: Testing a custom React hook
 * 
 * This demonstrates unit testing hooks that manage state or side effects.
 * Uses @testing-library/react for hook testing patterns.
 */

// Example custom hook
import { useState, useCallback, useEffect } from 'react';

interface UseToggleReturn {
  isOn: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

function useToggle(initialValue = false): UseToggleReturn {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsOn((prev) => !prev);
  }, []);

  const setOn = useCallback(() => {
    setIsOn(true);
  }, []);

  const setOff = useCallback(() => {
    setIsOn(false);
  }, []);

  return { isOn, toggle, setOn, setOff };
}

// ============================================================================
// TESTS
// ============================================================================

describe('useToggle', () => {
  it('should initialize with default value of false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.isOn).toBe(false);
  });

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.isOn).toBe(true);
  });

  it('should toggle value when toggle is called', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.isOn).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOn).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOn).toBe(false);
  });

  it('should set value to true when setOn is called', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.isOn).toBe(false);

    act(() => {
      result.current.setOn();
    });

    expect(result.current.isOn).toBe(true);

    // Should stay true even if called again
    act(() => {
      result.current.setOn();
    });

    expect(result.current.isOn).toBe(true);
  });

  it('should set value to false when setOff is called', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.isOn).toBe(true);

    act(() => {
      result.current.setOff();
    });

    expect(result.current.isOn).toBe(false);

    // Should stay false even if called again
    act(() => {
      result.current.setOff();
    });

    expect(result.current.isOn).toBe(false);
  });

  it('should maintain referential stability of functions', () => {
    const { result, rerender } = renderHook(() => useToggle());

    const initialToggle = result.current.toggle;
    const initialSetOn = result.current.setOn;
    const initialSetOff = result.current.setOff;

    // Force re-render
    rerender();

    // Functions should remain the same reference (useCallback working)
    expect(result.current.toggle).toBe(initialToggle);
    expect(result.current.setOn).toBe(initialSetOn);
    expect(result.current.setOff).toBe(initialSetOff);
  });
});

// ============================================================================
// Example: Testing a hook with side effects
// ============================================================================

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (newValue: T) => void;
  removeValue: () => void;
}

function useLocalStorage<T>(key: string, initialValue?: T): UseLocalStorageReturn<T> {
  const [value, setValueState] = useState<T | null>(() => {
    if (typeof window === 'undefined') return initialValue || null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || null;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue || null;
    }
  });

  const setValue = useCallback(
    (newValue: T) => {
      try {
        setValueState(newValue);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setValueState(null);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { value, setValue, removeValue };
}

describe('useLocalStorage', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));

    expect(result.current.value).toBe('initial');
  });

  it('should load value from localStorage if available', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage<string>('test-key', 'initial'));

    expect(result.current.value).toBe('stored-value');
  });

  it('should update localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage<string>('test-key'));

    act(() => {
      result.current.setValue('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(localStorageMock.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should remove value from localStorage when removeValue is called', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage<string>('test-key'));

    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBeNull();
    expect(localStorageMock.getItem('test-key')).toBeNull();
  });

  it('should handle objects as values', () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ name: string; age: number }>('user-key')
    );

    const user = { name: 'Alice', age: 30 };

    act(() => {
      result.current.setValue(user);
    });

    expect(result.current.value).toEqual(user);
    expect(JSON.parse(localStorageMock.getItem('user-key')!)).toEqual(user);
  });
});

/**
 * Key Hook Testing Patterns:
 * 
 * 1. **renderHook**: Use @testing-library/react's renderHook utility
 * 2. **act()**: Wrap state updates in act() to flush effects
 * 3. **result.current**: Access hook return values via result.current
 * 4. **rerender**: Force re-renders to test referential stability
 * 5. **Mock side effects**: Mock localStorage, fetch, timers, etc.
 * 6. **Test cleanup**: Verify effects clean up properly (useEffect return)
 * 
 * Setup:
 * ```bash
 * npm install -D @testing-library/react @testing-library/react-hooks vitest
 * ```
 * 
 * To Run:
 * ```bash
 * npx vitest testing/frontend/unit/hook-example.test.tsx
 * ```
 */
