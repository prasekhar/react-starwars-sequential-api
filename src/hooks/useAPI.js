import { useState, useEffect, useCallback } from 'react';
import { getAPIRequest } from 'api';

const useAPI = (url) => {
	const [apiData, setApiData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const getData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await getAPIRequest(url);
			const {
				data: { results },
			} = response;
			setApiData(results);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		getData();
	}, [getData]);

	return [apiData, loading, error];
};

export default useAPI;
