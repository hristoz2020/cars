const baseUrl = "http://161.35.202.170:8080";

export const getAllCars = async () => {
	let response = await fetch(`${baseUrl}/cars/all`);

	let allCars = response.json();

	return allCars;
};

export const addCar = async (carInfo) => {
	let response = await fetch(`${baseUrl}/cars`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(carInfo),
	});

	let addCar = response.json();

	return addCar;
};

export const deleteCar = async (id, userId) => {
	let response = await fetch(`${baseUrl}/cars/${id}/${userId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(),
	});

	let deleteCar = response.json();

	return deleteCar;
};