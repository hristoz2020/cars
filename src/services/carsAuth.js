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
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(carInfo),
	});

	return response;
};

export const deleteCar = async (id, userId, token) => {
	let response = await fetch(`${baseUrl}/cars/${id}/${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

export const editCar = async (user, carInfo, token) => {
	carInfo.user = user;
	
	let response = await fetch(`${baseUrl}/cars/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(carInfo),
	});

	return response;
};
