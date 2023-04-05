import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
	Box,
	Button,
	IconButton,
	Tooltip,
	CircularProgress,
	MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
	getAllCars,
	deleteCar,
	editCar,
} from "../../services/carsAuth";
import {
	typesCondition,
	typesEngine,
	typesGearBox,
} from "../../constants/constants";
import CreateCarModal from "../../components/CreateCarModal/CreateCarModal";

function Home() {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [validationErrors, setValidationErrors] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const user = JSON.parse(localStorage.getItem("userData"));
	const token = localStorage.getItem("token");

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
		if (
			!window.confirm(
				`Are you sure you want to delete ${row.getValue(
					"make"
				)}-${row.getValue("model")}-${row.getValue("year")}`
			)
		) {
			return;
		}

		deleteCar(row.original.id, row.original.user.id, token)
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
					children: typesEngine.map((typesEngine) => (
						<MenuItem key={typesEngine} value={typesEngine}>
							{typesEngine}
						</MenuItem>
					)),
				},
			},
			{
				accessorKey: "gearBox",
				header: "Gear Box",
				size: 50,
				muiTableBodyCellEditTextFieldProps: {
					select: true, //change to select for a dropdown
					children: typesGearBox.map((typesGearBox) => (
						<MenuItem key={typesGearBox} value={typesGearBox}>
							{typesGearBox}
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
					children: typesCondition.map((typesCondition) => (
						<MenuItem key={typesCondition} value={typesCondition}>
							{typesCondition}
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
		<div className="min-height">
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
							Add Car
						</Button>
					)
				}
			/>
			<CreateCarModal
				columns={columns}
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				setIsLoading={setIsLoading}
				setIsError={setIsError}
			/>
		</div>
	);
}

export default Home;