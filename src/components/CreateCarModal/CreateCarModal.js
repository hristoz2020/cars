import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	MenuItem,
} from "@mui/material";
import { addCar } from "../../services/carsAuth";
import {
	typesCondition,
	typesEngine,
	typesGearBox,
} from "../../constants/constants";

const CreateCarModal = ({
	open,
	columns,
	onClose,
	token,
	setIsLoading,
	setIsError,
}) => {
	let user = JSON.parse(localStorage.getItem("userData"));
	const [values, setValues] = useState(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ""] = "";

			return acc;
		}, {})
	);

	const generateSelectOptions = (selectType) => {
		let currentType = [];
		switch (selectType) {
			case "engineType":
				currentType = typesEngine;
				break;
			case "gearBox":
				currentType = typesGearBox;
				break;
			case "condition":
				currentType = typesCondition;
				break;
			default:
				return [""];
		}

		return currentType.map((type) => (
			<MenuItem key={type} value={type}>
				{type}
			</MenuItem>
		));
	};

	const handleSubmit = () => {
		//put your validation logic here
		addCar(values, user, token)
			.then((res) => {
				setIsLoading(true);
			})
			.catch((err) => setIsError(true));
		onClose();
	};

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">Add Car</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => e.preventDefault()}>
					<Stack
						sx={{
							width: "100%",
							minWidth: { xs: "300px", sm: "360px", md: "400px" },
							gap: "1.5rem",
						}}
					>
						{columns.map((column) => (
							<TextField
								key={column.accessorKey}
								label={column.header}
								name={column.accessorKey}
								select={
									column.muiTableBodyCellEditTextFieldProps
										?.select
								}
								onChange={(e) =>
									setValues({
										...values,
										[e.target.name]: e.target.value,
									})
								}
							>
								{column.muiTableBodyCellEditTextFieldProps &&
									generateSelectOptions(column.accessorKey)}
							</TextField>
						))}
					</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ p: "1.25rem" }}>
				<Button onClick={onClose}>Cancel</Button>
				<Button color="info" onClick={handleSubmit} variant="contained">
					Add Car
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateCarModal;
