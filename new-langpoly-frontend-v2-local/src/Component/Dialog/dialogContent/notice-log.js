import React, { useState } from "react";
import {
	DialogContent,
	DialogActions,
	Button,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import {
	localStorageKey,
	localFilesArr,
	dialogMode,
	URLS,
} from "src/constant";
import { saveAllDataToLocal, fetchFromStorage } from "src/helpers/saveStorage";
import axiosInstance from "src/helpers/axiosInstance";
import { setMessage } from "src/helpers/setMessage";
import { isEmpty } from "lodash";
import { removeFileFromStorage } from "langpoly-frontend-core";

//Confirmation pop up when delete file
const Notice = ({ handleDialog, mode, selectedName, setRefresh }) => {
	const [check, setCheck] = useState(false);
	const localTable = fetchFromStorage(localStorageKey);
	const localFiles = fetchFromStorage(localFilesArr);

	const deleteFile = async (fileName) => {
		let path = localFiles[fileName] ? localFiles[fileName] : "";
		try {
			let response = await axiosInstance.post(
				`${URLS.deleteFile}?fileName=${fileName}`,
				{ filePath: path }
			);
			if (response.status === 200) {
				saveAllDataToLocal(response.data);
				setMessage("success", "Delete file successfully");
			} else {
				setMessage("err", "cannot delete this file");
			}
		} catch (err) {
			setMessage("err", "cannot delete this file");
		}
		setRefresh((pre) => !pre);
	};

	const switchContents = (mode) => {
		switch (mode) {
			case dialogMode.delCol:
				return (
					<>
						<DialogContent>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={check}
											disabled={
												isEmpty(
													localFiles[selectedName]
												)
													? true
													: false
											}
										/>
									}
									onChange={() => {
										setCheck((pre) => !pre);
									}}
									label="Do you want to delete this file permanently?"
								/>
							</FormGroup>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									if (check === false) {
										removeFileFromStorage(
											selectedName,
											localTable,
											localFiles
										);
									} else {
										deleteFile(selectedName);
									}
									handleDialog();
								}}
							>
								<Check />
							</Button>
							<Button onClick={handleDialog}>
								<Close />
							</Button>
						</DialogActions>
					</>
				);
			default:
				break;
		}
	};

	return <>{switchContents(mode)}</>;
};

export default Notice;
