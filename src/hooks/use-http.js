// Our custom http hook which we'll use in two places within our app
import { useState, useCallback } from 'react';

const useHttp = () => {   
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // requestConfig is going to be an object that we pass in that has the url property 
    // applyData() is going to be a function we pass in
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                    // If requestCongig.method is set by passing it in then apply it here,
                    // otherwise set the method to 'GET' as a default method
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    // If requestConfig.headers are set by passing them in then apply them 
                    // here, otherwise pass in an empty object
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    // If requestConfig.body is set by passing it in then stringify it 
                    // here, otherwise set it to null
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );

        if (!response.ok) {
            throw new Error('Request failed!');
        };

        const data = await response.json();
        applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    // Returning an object that includes the isLoading state, the error state, and a
    // pointer to the sendRequest function
    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
};

export default useHttp;