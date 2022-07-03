/*
  IMPLEMENTATION BASED ON "useFetch() react hook" by
  https://usehooks-ts.com/react-hook/use-fetch
*/

import { useEffect, useReducer, useRef } from 'react';
import api from 'services/api';

const useFetchData = (url = '', onMount = true, refresh = 0) => {
  const cache = useRef({});
  const cancelRequest = useRef(false);
  const isMounted = useRef(false);
  const refreshCounter = useRef(0);

  const initialState = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (url === '') return;
    cancelRequest.current = false;

    if (!onMount && !isMounted.current) {
      isMounted.current = true;
      return;
    }

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (refreshCounter.current === refresh && cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await api.get(url);
        if (!response.data) {
          throw new Error(response.data.error);
        }

        const { data } = response;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, onMount, refresh]);

  return state;
};

export default useFetchData;
