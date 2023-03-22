import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	CircularProgress,
	MenuItem,
	MenuList,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
	getAllCars,
	addCar,
	deleteCar,
	editCar,
} from "../../services/carsAuth";

function Home({ token }) {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const typesEngine = [
		{ value: "DIESEL", label: "DIESEL" },
		{ value: "GASOLINE", label: "GASOLINE" },
		{ value: "HYBRID", label: "HYBRID" },
		{ value: "ELECTRIC", label: "ELECTRIC" },
	];
	const typesGearBox = [
		{ value: "MANUAL", label: "MANUAL" },
		{ value: "AUTOMATIC", label: "AUTOMATIC" },
	];
	const typesCondition = [
		{ value: "NEW", label: "NEW" },
		{ value: "USED", label: "USED" },
		{ value: "PARTS", label: "PARTS" },
	];

	useEffect(() => {
		getAllCars()
			.then((res) => res.json())
			.then((res) => {
				setIsLoading(true);
				setTableData(res);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setIsError(true);
			});
	}, [isLoading]);

	const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
		let user = JSON.parse(localStorage.getItem("userData"));
		let token = localStorage.getItem("token");

		if (!Object.keys(validationErrors).length) {
			tableData[row.index] = values;
			values.id = row.original.id;
			//send/receive api updates here, then refetch or update local table data for re-render
			editCar(user, values, token)
				.then((res) => {
					setIsLoading(true);
				})
				.catch((err) => setIsError(true));

			exitEditingMode(); //required to exit editing mode and close modal
		}
	};

	const handleCancelRowEdits = () => {
		setValidationErrors({});
	};

	const handleDeleteRow = useCallback((row, token) => {
		let carId = row.original.id;
		let userId = row.original.user.id;

		if (
			!window.confirm(
				`Are you sure you want to delete ${row.getValue(
					"make"
				)}-${row.getValue("model")}-${row.getValue("year")}`
			)
		) {
			return;
		}

		deleteCar(carId, userId, token)
			.then((res) => setIsLoading(true))
			.catch((err) => setIsError(true));
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: "make",
				header: "Make",
				size: 50,
			},
			{
				accessorKey: "model",
				header: "Model",
				size: 50,
			},
			{
				accessorKey: "year",
				header: "Year",
				size: 50,
			},
			{
				accessorKey: "engineType",
				header: "Engine Type",
				size: 50,
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: ["DIESEL", "GASOLINE", "HYBRID", "ELECTRIC"].map(
						(typeEngine) => (
							<MenuItem key={typeEngine} value={typeEngine}>
								{typeEngine}
							</MenuItem>
						)
					),
				},
			},
			{
				accessorKey: "gearBox",
				header: "Gear Box",
				size: 50,
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: ["MANUAL", "AUTOMATIC"].map((typeEngine) => (
						<MenuItem key={typeEngine} value={typeEngine}>
							{typeEngine}
						</MenuItem>
					)),
				},
			},
			{
				accessorKey: "condition",
				header: "Condition",
				size: 50,
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: ["NEW", "USED", "PARTS"].map((typeEngine) => (
						<MenuItem key={typeEngine} value={typeEngine}>
							{typeEngine}
						</MenuItem>
					)),
				},
			},
			{
				accessorKey: "horsePower",
				header: "Horse Power",
				size: 50,
			},
			{
				accessorKey: "color",
				header: "Color",
				size: 50,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 50,
			},
			{
				accessorKey: "city",
				header: "City",
				size: 50,
			},
			{
				accessorKey: "mileage",
				header: "Mileage",
				size: 50,
			},
			{
				accessorKey: "extras",
				header: "Extras",
				size: 50,
			},
		],
		[]
	);

	return (
		<>
			{isError && <h1>Error!!</h1>}
			<MaterialReactTable
				displayColumnDefOptions={{
					"mrt-row-actions": {
						muiTableHeadCellProps: {
							align: "left",
						},
						size: 120,
					},
				}}
				columns={columns}
				data={tableData}
				editingMode="modal" //default
				enableColumnOrdering
				enableEditing
				onEditingRowSave={handleSaveRowEdits}
				onEditingRowCancel={handleCancelRowEdits}
				renderRowActions={({ row, table }) =>
					row.original.user.id ===
						JSON.parse(localStorage.getItem("userData")).id && (
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Tooltip arrow placement="left" title="Edit">
								<IconButton
									onClick={() => table.setEditingRow(row)}
								>
									<Edit />
								</IconButton>
							</Tooltip>
							<Tooltip arrow placement="right" title="Delete">
								<IconButton
									color="error"
									onClick={() => handleDeleteRow(row, token)}
								>
									<Delete />
								</IconButton>
							</Tooltip>
						</Box>
					)
				}
				renderTopToolbarCustomActions={() =>
					isLoading ? (
						<CircularProgress />
					) : (
						<Button
							color="info"
							onClick={() => setCreateModalOpen(true)}
							variant="contained"
						>
							Add New Car
						</Button>
					)
				}
			/>
			<CreateNewCarModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				token={token}
				setIsLoading={setIsLoading}
			/>
		</>
	);
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewCarModal = ({
	open,
	columns,
	onClose,
	token,
	setIsLoading,
	setIsError,
	typesEngine,
}) => {
	let user = JSON.parse(localStorage.getItem("userData"));
	const [values, setValues] = useState(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ""] = "";

			return acc;
		}, {})
	);

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
			<DialogTitle textAlign="center">Add New Car</DialogTitle>
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
								onChange={(e) =>
									setValues({
										...values,
										[e.target.name]: e.target.value,
									})
								}
							/>
						))}
					</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ p: "1.25rem" }}>
				<Button onClick={onClose}>Cancel</Button>
				<Button color="info" onClick={handleSubmit} variant="contained">
					Add New Car
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Home;
