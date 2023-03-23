import { createContext, createElement, useContext, useRef } from "react";
import { useStore } from "zustand";
import { ReaderStore, ReaderStoreParams, createReaderStore } from "./store";

const ReaderContext = createContext<ReaderStore | null>(null);

type ReaderProviderProps = React.PropsWithChildren<Partial<ReaderStoreParams>>;

export function ReaderProvider({ children, ...props }: ReaderProviderProps) {
  const storeRef = useRef<ReaderStore>();
  if (!storeRef.current) {
    storeRef.current = createReaderStore(props);
  }
  return createElement(
    ReaderContext.Provider,
    {
      value: storeRef.current,
    },
    children
  );
}

export function useReaderContext<T>(
  selector: (state: ReaderStoreParams) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(ReaderContext);
  if (!store) throw new Error("Missing ReaderContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}
