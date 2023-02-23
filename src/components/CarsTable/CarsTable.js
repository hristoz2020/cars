const CarsTable = ({ cars }) => {
	return (
		<tbody>
			<tr>
				<td>{cars.make}</td>
				<td>{cars.model}</td>
				<td>{cars.year}</td>
				<td>{cars.condition}</td>
				<td>{cars.engineType}</td>
				<td>{cars.color}</td>
				<td>{cars.gearBox}</td>
				<td>{cars.horsePower}</td>
				<td>{cars.mileage}</td>
				<td>{cars.extras}</td>
				<td>{cars.price}</td>
			</tr>
		</tbody>
	);
};

export default CarsTable;
