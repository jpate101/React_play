import React, { useState, useContext } from "react";
import {
	DialogActions,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Dialog,
	DialogTitle,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { localStorageKey, localKeys } from "src/constant";
import { fetchFromStorage } from "src/helpers/saveStorage";
import { setMessage } from "src/helpers/setMessage";
import { LanguageContext } from "src/Pages/newMain";
import { removeKeys } from "langpoly-frontend-core";

//Confirmation pop up when delete keywords
const DeleteConfirm = ({
	open,
	handleDeleteDialog,
	deleteArr,
	handleDialog,
}) => {
	const [check, setCheck] = useState(false);

	const localData = fetchFromStorage(localStorageKey);
	const keysList = fetchFromStorage(localKeys);

	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;

	return (
		<Dialog
			onClose={() => {
				handleDeleteDialog();
			}}
			open={open}
			disableEnforceFocus
		>
			<DialogTitle>{message?.["deleteConfirm"]}</DialogTitle>
			<FormGroup>
				<FormControlLabel
					control={<Checkbox checked={check} />}
					onChange={() => {
						setCheck((pre) => !pre);
					}}
					label={message?.["checkBoxDelete"]}
				/>
			</FormGroup>
			<DialogActions>
				<Button
					onClick={() => {
						if (check === true) {
							removeKeys(deleteArr, localData, keysList);
							handleDeleteDialog();
							handleDialog();
							setMessage("warning", message.keyDelSuccess);
						} else {
							setMessage("warning", message.keyDelError);
							handleDeleteDialog();
						}
					}}
				>
					<Check />
				</Button>
				<Button
					onClick={() => {
						handleDeleteDialog();
					}}
				>
					<Close />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirm;
