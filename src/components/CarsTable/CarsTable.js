const CarsTable = ({ car }) => {
	return (
		<tbody>
			<tr>
				<td>{car.make}</td>
				<td>{car.model}</td>
				<td>{car.year}</td>
				<td>{car.condition}</td>
				<td>{car.engineType}</td>
				<td>{car.color}</td>
				<td>{car.gearBox}</td>
				<td>{car.horsePower}</td>
				<td>{car.mileage}</td>
				<td>{car.extras}</td>
				<td>{car.price}</td>
			</tr>
		</tbody>
	);
};

export default CarsTable;