import { useState, useEffect, useCallback } from 'react';
import { getAPIRequest } from 'api';

const useSequentialAPI = (lists) => {
	const [apiData, setApiData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const getCharacterData = useCallback(async () => {
		const dataToMap = [];
		setLoading(true);
		Promise.all(lists?.map((listItem) => getAPIRequest(listItem)))
			.then((results) => {
				results.map((result) => {
					const { data } = result;
					dataToMap.push(data);
					return result;
				});
				setApiData(dataToMap);
			})
			.catch((e) => {
				setError(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [lists]);

	useEffect(() => {
		getCharacterData();
	}, [getCharacterData]);

	return [apiData, loading, error];
};

export default useSequentialAPI;
