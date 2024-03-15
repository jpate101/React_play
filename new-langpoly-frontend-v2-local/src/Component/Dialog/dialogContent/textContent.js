import React, {useState,useContext} from 'react'
import {
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from "@mui/material";
import { Check, Close } from '@mui/icons-material'
import { localStorageKey, localKeys, localFilesArr, dialogMode } from "src/constant";
import { setMessage } from "src/helpers/setMessage";
import { fetchFromStorage } from 'src/helpers/saveStorage'
import { LanguageContext } from 'src/Pages/newMain';
import { isValidFileName, isValidKey, checkIfKeyExist, checkIfFileExist } from 'langpoly-frontend-core';
import { addFileToLocalStorage, addNewKeyWordToLocalStorage } from 'langpoly-frontend-core';

//handle when create a new key and new file
const TextContent = ({handleDialog, mode}) => {
    const [newContent, setNewContent] = useState("");

	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;

    const changeContent = (e) => {
		setNewContent(e.target.value);
	};

	//use check file name fnc, if name is valid then add it to storage, otherwise show notification to users
	const submitNewContent = (newName) => {
		let allFileNames = fetchFromStorage(localFilesArr);
		let storage = fetchFromStorage(localStorageKey);
		let pathKeys = fetchFromStorage(localKeys);
		switch(mode) {
			case(dialogMode.newFile):
			let fileErrMessage;
				if(isValidFileName(newName) && !checkIfFileExist(newName, allFileNames)) {
					addNewKeyWordToLocalStorage(newName, allFileNames, storage, pathKeys);
					setMessage('warning',message.keySuccess);
					handleDialog();
					break;
				}
				if(!isValidFileName(newName)) {
					fileErrMessage='Invalid file name input!'
				}
				if(checkIfFileExist(newName, allFileNames)) {
					fileErrMessage='File name has existed, please change a new one'
				}
				setMessage('warning', fileErrMessage)
				break;
			case(dialogMode.newKey):
				let keyErrMessage;
				if (isValidKey(newName) && !checkIfKeyExist(newName, pathKeys)) {
					addFileToLocalStorage(newName, allFileNames, storage, pathKeys);
					setMessage('warning',message.keySuccess);
					handleDialog();
					break;
				}
				if(!isValidKey(newName)) {
					keyErrMessage='Invalid file name input!';
				}
				if(checkIfKeyExist(newName, pathKeys)) {
					keyErrMessage='Key name has existed, please change a new one'
				}
				setMessage('warning', keyErrMessage)
				break;
			default:
				return
		}  
	};
    return (
		<>
			<DialogContent>
				<TextField
					label={message.inputHere}
					value={newContent}
					variant="standard"
					onChange={(e) => {
						changeContent(e);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={(e) => {
						submitNewContent(newContent);
						setNewContent("");
					}}
				>
					<Check />
				</Button>
				<Button
					onClick={() => {
						setNewContent("");
						handleDialog();
					}}
				>
					<Close />
				</Button>
			</DialogActions>
		</>
	)
};

export default TextContent