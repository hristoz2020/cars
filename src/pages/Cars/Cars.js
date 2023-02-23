import { useState, useEffect } from "react";
import CarsTable from "../../components/CarsTable/CarsTable";
import * as carsAuth from "../../services/carsAuth";

import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";

const Cars = () => {
	const [cars, setCars] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		carsAuth.getAllCars().then((res) => {
			setLoading(false);
			setCars(res);
		});
	}, [cars]);

	return (
		<>
			<h1>Cars Page!</h1>
			{loading ? (
				<LoadingSpiner />
			) : (
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Make</th>
							<th scope="col">Model</th>
							<th scope="col">Year</th>
							<th scope="col">Condition</th>
							<th scope="col">Engine Type</th>
							<th scope="col">Color</th>
							<th scope="col">Gear Box</th>
							<th scope="col">Horse Power</th>
							<th scope="col">Mileage</th>
							<th scope="col">Extras</th>
							<th scope="col">Price</th>
						</tr>
					</thead>
					{cars.map((x) => (
						<CarsTable key={x.id} cars={x} />
					))}
				</table>
			)}
		</>
	);
};

export default Cars;
