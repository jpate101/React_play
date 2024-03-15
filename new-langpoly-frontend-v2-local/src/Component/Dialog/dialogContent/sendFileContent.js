import React, { useState, useEffect, useContext } from 'react'
import {
	DialogContent,
	DialogActions,
	Button,
	FormGroup,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextField,
} from "@mui/material";
import { Check, Close } from '@mui/icons-material'
import { localStorageKey, localFilesArr, localSavePaths } from "src/constant";
import { 
	saveAllDataToLocal,
	fetchFromStorage
} from 'src/helpers/saveStorage';
import { isEmpty } from 'lodash';
import { URLS } from 'src/constant';
import axiosInstance from 'src/helpers/axiosInstance';
import { setMessage } from 'src/helpers/setMessage';
import { LanguageContext } from 'src/Pages/newMain';

//update or upload file
const SendFile = ({ handleDialog, selectedName, setRefresh, open }) => {  
	const savePaths = fetchFromStorage(localSavePaths)
	const allFilesName = fetchFromStorage(localFilesArr);
	const [path, setPath] = useState('');
	const [newContent, setNewContent] = useState("")

	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;

	const handleChange = (event) => {
		setPath(event.target.value);
	}

	const checkName = (newName, checkList) => {
		let regex = /^\w+.json$/;
		if(!regex.test(newName)) {
			setMessage('warning', 'Invalid file name input');
			return false;
		}
		for (let index = 0; index < checkList.length; index++) {
			if (newName === checkList[index]) {
				setMessage('warning', message.fileNameExist);
				return false;
			}
		}
		return true;
	}

	const changeContent = (e) => {
		setNewContent(e.target.value);
	};

	const uploadCurrentFile = async (fileName) => {
		if(!checkName(fileName, Object.keys(allFilesName))) return
		let sendData = {};
		let localData = fetchFromStorage(localStorageKey)
		Object.keys(localData).forEach((key)=>{
			sendData[key] = localData?.[key]?.[fileName]
		});
		if(isEmpty(allFilesName[fileName])) {
			try {
				const response = await axiosInstance.post(`${URLS.createFile}?fileName=${fileName}`,{ 
					fileData: sendData,
					filePath: path
				});
				if(response.status === 200) {
					saveAllDataToLocal(response.data);
					setRefresh(pre => !pre);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await axiosInstance.post(`${URLS.updateFile}?fileName=${fileName}`, {
					filePath: allFilesName[fileName],
					fileData: sendData
				});
			} catch (err) {
				console.log(err);
			}
		};
	}

	useEffect(()=>{
		if(savePaths.length === 0) {
			setPath('');
		} else {
			if(isEmpty(allFilesName[selectedName])) {
				setPath(savePaths[0]);
			} else {
				setPath(allFilesName[selectedName])
			}
		}
	},[allFilesName, open, savePaths, selectedName]);

	return (
		<>
			<DialogContent>
				<TextField
					label="file name here"
					value={newContent}
					variant="standard"
					onChange={(e) => {
						changeContent(e);
					}}
				/>
				<FormGroup>
					{path.length === 0? <></> :
						(
						<RadioGroup value={path} onChange={handleChange}>
							{savePaths.map((path, index) => (
								<FormControlLabel value={path} control={<Radio />} label={path} key={index}/>
							))}
						</RadioGroup>
						)
					}

				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						uploadCurrentFile(`${newContent}.json`);
						handleDialog();
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
		</>
	)
}

export default SendFile