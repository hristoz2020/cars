import { useState, useEffect } from "react";
import CarsTable from "../../components/CarsTable/CarsTable";
import { getAllCars } from "../../services/carsAuth";

import LoadingSpiner from "../../components/LoadingSpiner/LoadingSpiner";

const Cars = () => {
	const [cars, setCars] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getAllCars()
			.then((res) => res.json())
			.then((res) => {
				setIsLoading(false);
				setCars(res);
			})
			.catch((err) => {
				setIsError(true);
			});
	}, []);

	return (
		<>
			<h1>Cars Page!</h1>

			{isError && <h1>Error!!!!</h1>}

			{isLoading ? (
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
						<CarsTable key={x.id} car={x} />
					))}
				</table>
			)}
		</>
	);
};

export default Cars;
