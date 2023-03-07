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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAllCars, addCar } from "../../services/carsAuth";

function Home({ token }) {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [validationErrors, setValidationErrors] = useState({});

	useEffect(() => {
		getAllCars()
			.then((res) => res.json())
			.then((res) => {
				setTableData(res);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
		if (!Object.keys(validationErrors).length) {
			tableData[row.index] = values;
			//send/receive api updates here, then refetch or update local table data for re-render
			setTableData([...tableData]);
			exitEditingMode(); //required to exit editing mode and close modal
		}
	};

	const handleCancelRowEdits = () => {
		setValidationErrors({});
	};

	const handleDeleteRow = useCallback(
		(row) => {
			if (
				alert(`Are you sure you want to delete ${row.getValue("make")}`)
			) {
				return;
			}
			//send api delete request here, then refetch or update local table data for re-render
			tableData.splice(row.index, 1);
			setTableData([...tableData]);
		},
		[tableData]
	);

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
			},
			{
				accessorKey: "gearBox",
				header: "Gear Box",
				size: 50,
			},
			{
				accessorKey: "condition",
				header: "Condition",
				size: 50,
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
			<MaterialReactTable
				className="cars-table"
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
				renderRowActions={({ row, table }) => (
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
								onClick={() => handleDeleteRow(row)}
							>
								<Delete />
							</IconButton>
						</Tooltip>
					</Box>
				)}
				renderTopToolbarCustomActions={() => (
					<Button
						color="secondary"
						onClick={() => setCreateModalOpen(true)}
						variant="contained"
					>
						Add New Car
					</Button>
				)}
			/>
			<CreateNewCarModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				token={token}
				setTableData={setTableData}
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
	setTableData,
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
			.then((res) => res.json())
			.then((res) => {
				setTableData(res)
			})
			.catch((err) => console.log(err));

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
				<Button
					color="secondary"
					onClick={handleSubmit}
					variant="contained"
				>
					Add New Car+
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Home;
