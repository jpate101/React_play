import React, { useState, useEffect, useMemo } from "react";
import {
	DialogContent,
	DialogActions,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Pagination
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { localKeys } from "src/constant";
import { fetchFromStorage } from "src/helpers/saveStorage";
import DeleteConfirm from "./deleteConfirm";

const DeleteContent = ({ handleDialog }) => {
	const dataPerPage = 10;
	const [page, setPage] = useState(1);
	const allKeys = useMemo(() => fetchFromStorage(localKeys), []);
	let keysList = useMemo(() => {
		let displayedKeys = allKeys.slice(
			(page - 1) * dataPerPage,
			(page - 1) * dataPerPage + dataPerPage
		);
		let keysList = {};
		Object.values(displayedKeys).forEach((key) => {
			keysList[key] = false;
		});
		return keysList;
	}, [allKeys, page]);
	const [openDelDialog, setOpenDelDialog] = useState(false);
	const [keysState, setKeysState] = useState({});
	const [countPage] = useState(() => Math.ceil(allKeys.length / dataPerPage));
	const [deleteArr, setDeleteArr] = useState([]);

	// when the page number, then invoke this func
	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handleDeleteDialog = () => {
		setOpenDelDialog((pre) => !pre);
	};

	// when click checkbox, then invoke this func
	const handleCheckBoxChange = (event) => {
		let newDeleteArr = [...deleteArr];
		// if the option ticked, then add it into the deletion array
		if (event.target.checked === true) {
			if (newDeleteArr.indexOf(event.target.name) < 0) {
				newDeleteArr.push(event.target.name);
			}
		} else {
			// if cancel the ticked, then delete it from the deletion array
			newDeleteArr.splice(newDeleteArr.indexOf(event.target.name), 1);
		}
		//change the state
		setKeysState({
			...keysState,
			[event.target.name]: event.target.checked,
		});
		setDeleteArr(newDeleteArr);
	};

	// if page number changed, then need to calculate the data to show in this page.
	useEffect(() => {
		setKeysState(keysList);
	}, [keysList]);

	return (
		<>
			<DialogContent>
				<FormGroup>
					{Object.keys(keysState).map((item, index) => (
						<FormControlLabel
							control={
								<Checkbox
									checked={keysState[item]}
									onChange={handleCheckBoxChange}
									name={item}
								/>
							}
							label={item}
							key={index}
						/>
					))}
					<Pagination
						count={countPage}
						page={page}
						onChange={handlePageChange}
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						handleDeleteDialog();
					}}
				>
					<Check />
				</Button>
				<Button
					onClick={() => {
						handleDialog();
					}}
				>
					<Close />
				</Button>
			</DialogActions>
			<DeleteConfirm
				open={openDelDialog}
				handleDeleteDialog={handleDeleteDialog}
				deleteArr={deleteArr}
				handleDialog={handleDialog}
			/>
		</>
	);
};

export default DeleteContent;
