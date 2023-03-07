const baseUrl = "http://161.35.202.170:8080";

export const getAllCars = async () => {
	let response = await fetch(`${baseUrl}/cars/all`);

	return response;
};

export const addCar = async (carInfo, user, token) => {
	carInfo.user = user;

	let response = await fetch(`${baseUrl}/cars`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authentication": `Bearer ${token}`,
		},
		body: JSON.stringify(carInfo),
	});

	return response;
};

export const deleteCar = async (id, userId) => {
	let response = await fetch(`${baseUrl}/cars/${id}/${userId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(),
	});

	return response;
};
