import { type ReactNode, createContext, useState, useEffect } from 'react';

/**
 * The type of the {@link HeaderContext}
 */
export interface HeaderContextType {
  /**
   * The pixel height of the app header
   */
  headerHeight: number;

  /**
   * Sets the headerHeight context
   */
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Context for header state
 */
const HeaderContext = createContext<HeaderContextType>({
  headerHeight: 0,
  setHeaderHeight: () => {}
});

export default HeaderContext;

/**
 * Context provider for header state
 *
 * @param props Children
 * @returns A context provider
 */
export function HeaderContextProvider({ children }: { children: ReactNode }) {
  // local storage keys
  const headerHeightKey = 'height';

  // initialize state
  const [headerHeight, setHeaderHeight] = useState<number>(
    Number(localStorage.getItem(headerHeightKey))
  );

  // update local storage
  useEffect(() => {
    localStorage.setItem(headerHeightKey, headerHeight.toString());
  }, [headerHeight]);

  return (
    <HeaderContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderContext.Provider>
  );
}
