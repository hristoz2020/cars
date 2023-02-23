const baseUrl = 'http://161.35.202.170:8080';


export const getAllCars = async () => {
    let response = await fetch(`${baseUrl}/cars/all`);

    let allCars = response.json();

    return allCars;
}