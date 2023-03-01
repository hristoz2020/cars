import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
const data = [
	{
		id: "3141412412",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "31fdwf1412412",
		make: "AUDI",
		model: "A6",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "White",
		price: 12000,
		city: "Sofia",
		mileage: 98120,
	},
	{
		id: "3141s412",
		make: "BMW",
		model: "320",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "3141412v12",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "314e12412",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "314141h12",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "31s412412",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "31414f412",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "314141241s",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
	{
		id: "31414d412",
		make: "BMW",
		model: "330",
		year: "2005",
		enginType: "DIESEL",
		gearBox: "MANUAL",
		condition: "NEW",
		horsePower: 150,
		color: "Black",
		price: 10000,
		city: "Sofia",
		mileage: 159492,
	},
];

const states = [
	"Alabama",
	"Alaska",
	"Arizona",
	"Arkansas",
	"California",
	"Colorado",
	"Connecticut",
	"Delaware",
	"Florida",
	"Georgia",
	"Hawaii",
	"Idaho",
	"Illinois",
	"Indiana",
];

const Home = () => {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [tableData, setTableData] = useState(() => data);
	const [validationErrors, setValidationErrors] = useState({});

	const handleCreateNewRow = (values) => {
		tableData.push(values);
		setTableData([...tableData]);
	};

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
				alert(
					`Are you sure you want to delete ${row.getValue(
						"firstName"
					)}`
				)
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
				size: 100,
			},
			{
				accessorKey: "model",
				header: "Model",
				size: 140,
			},
			{
				accessorKey: "year",
				header: "Year",
				size: 140,
			},
			{
				accessorKey: "enginType",
				header: "Engin Type",
				size: 80,
			},
			{
				accessorKey: "gearBox",
				header: "Gear Box",
				size: 80,
			},
			{
				accessorKey: "condition",
				header: "Condition",
				size: 80,
			},
			{
				accessorKey: "horsePower",
				header: "Horse Power",
				size: 80,
			},
			{
				accessorKey: "color",
				header: "Color",
				size: 80,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 80,
			},
			{
				accessorKey: "city",
				header: "City",
				size: 80,
			},
			{
				accessorKey: "mileage",
				header: "Mileage",
				size: 80,
			},
			{
				accessorKey: "state",
				header: "State",
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: states.map((state) => (
						<MenuItem key={state} value={state}>
							{state}
						</MenuItem>
					)),
				},
			},
		],
		[]
	);

	return (
		<>
			<MaterialReactTable
				displayColumnDefOptions={{
					"mrt-row-actions": {
						muiTableHeadCellProps: {
							align: "center",
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
			<CreateNewAccountModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onSubmit={handleCreateNewRow}
			/>
		</>
	);
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
	const [values, setValues] = useState(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ""] = "";
			return acc;
		}, {})
	);

	const handleSubmit = () => {
		//put your validation logic here
		onSubmit(values);
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
					Add New Car
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Home;
