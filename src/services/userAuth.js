const baseUrl = "http://161.35.202.170:8080";

export const loginUser = async (username, password) => {
	let response = await fetch(`${baseUrl}/users/login`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	let login = response.json();

	return login;
};

export const registerUser = async (registerData) => {
	let response = await fetch(`${baseUrl}/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(registerData),
	});

	let register = response.json();
   
	return register;
};
