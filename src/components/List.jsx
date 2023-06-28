import { Fragment, useId } from 'react';
import { Table } from 'react-bootstrap';

const List = ({ list, heading, columns, rowKey }) => {
	const id = useId();
	const properties = Object.keys(columns);
	const titles = Object.values(columns);

	if (list.length === 0 || properties.length === 0 || titles.length === 0)
		return;
	return (
		<>
			<h4 className='display-4'>{heading}</h4>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						{titles?.map((title) => {
							return <th key={title}>{title}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{list?.map((data, index) => {
						return (
							<Fragment key={`${data[rowKey]}-${id}-${index}`}>
								<tr>
									{properties?.map((property, index) => {
										return (
											<td key={`${data[property]}-${index}`}>
												{data[property]}
											</td>
										);
									})}
								</tr>
							</Fragment>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default List;
