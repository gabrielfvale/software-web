import { useEffect, useState, useCallback } from 'react';
import api from 'services/api';

export const useFetchData = (url = '', callback = () => {}) => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCallback = useCallback(
    async url => {
      setError('');
      setLoading(true);

      try {
        const { data: res } = await api.get(url);
        setData({ ...res });
        callback(res);
      } catch (e) {
        setError(e.response.data.error);
      }

      setLoading(false);
    },
    [callback]
  );

  useEffect(() => {
    fetchCallback(url);
  }, [url]);

  return [data, loading, error];
};
