const baseUrl = "http://161.35.202.170:8080";

export const getAllCars = async () => {
	let response = await fetch(`${baseUrl}/cars/all`);

	let allCars = response.json();

	return allCars;
};

export const addCar = async (userId, carInfo) => {
	let response = await fetch(`${baseUrl}/cars/${userId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(carInfo),
	});

	let addCar = response.json();

	return addCar;
};
