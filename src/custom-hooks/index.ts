import { useEffect, useReducer } from "react";

export interface IApi<T> {
  data?: T;
  error?: Error;
}

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(
  url?: string,
  transformData?: (data: any) => {},
  options?: RequestInit
): IApi<T> {
  const fetchReducer = (state: IApi<T>, action: Action<T>): IApi<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const initialState: IApi<T> = {
    error: undefined,
    data: undefined,
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, options);

        if (response.status !== 200 || !response.ok) {
          throw new Error(response.statusText);
        }

        let data = await response.json();
        data = (transformData?.(data) as T) || (data as T);
        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error as Error });
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
