import { useState, useEffect, useId, useMemo } from 'react';
import { Container, Row, Col, Form, Stack, Alert } from 'react-bootstrap';
import { useAPI, useSequentialAPI } from 'hooks';
import List from 'components/List';
import { PEOPLE_API_URL } from 'api';
import starwars from 'assets/logo.png';

const StarWars = () => {
	const id = useId();
	const [characters, setCharacters] = useState([]);
	const [films, setFilms] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [starShips, setStarShips] = useState([]);
	const [starWarsData, loading, error] = useAPI(PEOPLE_API_URL);
	const [vehiclesData, vehiclesLoading] = useSequentialAPI(vehicles);
	const [filmsData, filmsLoading] = useSequentialAPI(films);
	const [starShipsData, starShipsLoading] = useSequentialAPI(starShips);

	useEffect(() => {
		const getData = async () => {
			const charactersArray = [];
			starWarsData.map((character) => charactersArray.push(character.name));
			setCharacters(charactersArray);
		};
		getData();
	}, [starWarsData]);

	const onCharacterChange = (e) => {
		const { value } = e.currentTarget;
		if (!value) {
			setFilms([]);
			setVehicles([]);
			setStarShips([]);
		}
		const selectedCharacterInfo = starWarsData?.filter(
			(character) => character.name === value
		);
		const { films, vehicles, starships } = selectedCharacterInfo?.[0] || {
			films: [],
			vehicles: [],
			starShips: [],
		};
		setFilms(films);
		setVehicles(vehicles);
		setStarShips(starships);
	};

	const isLoading = useMemo(() => {
		return filmsLoading || vehiclesLoading || starShipsLoading;
	}, [filmsLoading, vehiclesLoading, starShipsLoading]);

	return (
		<Container>
			<Stack gap={3}>
				<Row>
					<Col>
						<h1 className='display-2'>
							<img src={starwars} alt='Star Wars' />
						</h1>

						{error ? (
							<Alert variant='danger'>
								An error occured. Please try later.
							</Alert>
						) : loading ? (
							<h3 className='display-4' data-text='Fetching Data....'>
								Fetching Data....
							</h3>
						) : (
							<Form.Select
								aria-label='Select Character'
								onChange={onCharacterChange}
								size='sm'
								disabled={isLoading}
							>
								<option value=''>Select a Character</option>
								{characters?.map((character) => {
									return (
										<option value={character} key={`${character}-${id}`}>
											{character}
										</option>
									);
								})}
							</Form.Select>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{filmsLoading ? (
							<h3 className='display-4' data-text='Fetching Films...'>
								Fetching Films...
							</h3>
						) : (
							<List
								list={filmsData}
								heading='Films'
								columns={{
									title: 'Title',
									director: 'Director',
									producer: 'Producer',
									release_date: 'Release Date',
								}}
								rowKey='title'
							/>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{vehiclesLoading ? (
							<h3 className='display-4' data-text='Fetching Vehicles...'>
								Fetching Vehicles...
							</h3>
						) : (
							<List
								list={vehiclesData}
								heading='Vehicles'
								columns={{
									name: 'Name',
									model: 'Model',
									cargo_capacity: 'Cargo Capacity',
								}}
								rowKey='name'
							/>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{starShipsLoading ? (
							<h3 className='display-4' data-text='Fetching Starships...'>
								Fetching Starships...
							</h3>
						) : (
							<List
								list={starShipsData}
								heading='Starships'
								columns={{
									name: 'Name',
									model: 'Model',
									passengers: 'Passengers',
								}}
								rowKey='name'
							/>
						)}
					</Col>
				</Row>
			</Stack>
		</Container>
	);
};

export default StarWars;
