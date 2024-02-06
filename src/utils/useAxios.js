import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    // console.log(axiosParams);
    const fetchData = async (params) => {
      try {
        const result = await axios.request({
          ...params,
          method: params.method || 'GET',
          headers: {
            accept: 'application/json',
            authorization:
              'Bearer '+localStorage.getItem('login-token'),
          },
        });
        // console.log(result.data);
        setResponse(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if(!axiosParams) return;
      fetchData(axiosParams);
    }, [axiosParams]);
  
    return { response, error, loading };
  };