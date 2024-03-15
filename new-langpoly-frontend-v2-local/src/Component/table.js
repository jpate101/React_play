import React, { Fragment, useEffect, useState, useContext } from "react";
import { isEmpty } from "lodash";
import {
	Box,
	Button,
	Typography,
	TableContainer,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	MenuItem,
	Table,
} from "@mui/material";
import {
	Add,
} from "@mui/icons-material";
import { localStorageKey, localFilesArr, localKeys, localSavePaths, URLS, dialogMode } from "src/constant";
import { saveAllDataToLocal, fetchFromStorage } from "src/helpers/saveStorage";
import axiosInstance from "src/helpers/axiosInstance";
import SingleLine from "./singleLine/singleLine";
import NewDialog from "./Dialog/dialog";
import SplitButton from "./buttonGroup/buttonGroup";
import './component.scss'
import { setMessage } from "src/helpers/setMessage";
import { LanguageContext } from "src/Pages/newMain";
import ReactCountryFlag from "react-country-flag";
import { downloadFile } from "langpoly-frontend-core";
import { clearAllKeysFromFile } from "langpoly-frontend-core";
import SearchBar from "./search/searchBar";

const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

const WebTable = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [mode, setMode] = useState('');
	const [selectedName, setSelectedName] = useState('')
	const [, setRefresh] = useState(false);
	const [loader, setLoader] = useState(true);

	const storage = fetchFromStorage(localStorageKey)

	const allFilesName = fetchFromStorage(localFilesArr)

	const pathKeys = fetchFromStorage(localKeys)

	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;
	const changeLanguage = lngContext?.changeLanguage;
	const [allKeys, setAllKeys] = useState(pathKeys);

	const manageLanguage = [
		<MenuItem
			key={'english'}
			onClick={() => {
				changeLanguage('en')
			}}
		>
			<ReactCountryFlag 
				className="emojiFlag"
                countryCode="GB"
				svg
			/>
			{message?.['english']}
		</MenuItem>,
		<MenuItem
			key={'thai'}
			onClick={() => {
				changeLanguage('th')
			}}
		>
			<ReactCountryFlag 
				className="emojiFlag"
                countryCode="TH"
				svg
			/>
			{message?.['thai']}
		</MenuItem>
	]

	const manageKeys = [
		<MenuItem
			key={'create'}
			onClick={() => {
				setMode(dialogMode.newKey);
				handleDialog();
			}}
		>
			{message?.['createKey']}
		</MenuItem>,
		<MenuItem
			key={'delete'}
			onClick={
				() => {
					setMode(dialogMode.delKey);
					handleDialog();
				}
			}
		>
			{message?.['deleteKeys']}
		</MenuItem>,
	]

	// send request to backend and get language json files
	const getAllInfo = async () => {
		localStorage.clear()
		try {
			let { data, status } = await axiosInstance.get(URLS.getFiles);
			if (status === 200) {
				localStorage.setItem(localStorageKey, JSON.stringify(data.fileStorage));
				localStorage.setItem(localFilesArr, JSON.stringify(data.allFilesName));
				localStorage.setItem(localKeys, JSON.stringify(data.allKeys));
				localStorage.setItem(localSavePaths, JSON.stringify(data.savePaths));
				setLoader(false);
			} else {
				console.log("will jump to the 404 page, implement later");
			}
		} catch (err) { };
	};

	// send current file into backend
	const saveFile = async (fileName) => {
		if (Object.keys(allFilesName).indexOf(fileName) === -1) return;
		let sendData = {};
		let localData = fetchFromStorage(localStorageKey)
		Object.keys(localData).forEach((key) => {
			sendData[key] = localData?.[key]?.[fileName]
		});
		try {
			const response = await axiosInstance.post(`${URLS.updateFile}?fileName=${fileName}`, {
				filePath: allFilesName[fileName],
				fileData: sendData
			});
			if (response.status === 200) {
				saveAllDataToLocal(response.data);
				setMessage('success', 'Save file successfully');
			} else {
				setMessage('warning', 'Save file failed');
			}
		} catch (err) {
			console.log(err);
		}

	};

	// handle dialog window
	const handleDialog = () => {
		setOpenDialog((pre) => !pre);
	};

	// clear current column content
	const clearColumn = (fileName, storage) => {
		clearAllKeysFromFile(fileName, storage);
		setRefresh(pre => !pre)
	};

	const mangeButtons = (fileName) => (
		[
			<MenuItem
				key='download'
				color="primary"
				size="small"
				onClick={() => {
					downloadFile(fileName, storage);
				}}
			>
				{message?.['download']}
			</MenuItem>,

			<MenuItem
				key='save'
				color="secondary"
				disabled={isEmpty(allFilesName[fileName]) ? true : false}
				onClick={() => {
					saveFile(fileName);
				}}
			>
				{message?.['saveFile']}
			</MenuItem>,

			<MenuItem
				key='clear'
				onClick={() => {
					clearColumn(fileName, storage);
				}}
			>
				{message?.['clearFiles']}
			</MenuItem>,

			<MenuItem
				key='delete'
				color="secondary"
				onClick={() => {
					setMode(dialogMode.delCol)
					setSelectedName(fileName)
					handleDialog()
				}}
			>
				{message?.['delete']}

			</MenuItem>,
		]
	)

	useEffect(() => {
		getAllInfo();
	}, []);

	return (
		<>
			<Box className="table-body">
				<Button
					onClick={() => {
						setLoader(true);
						getAllInfo();
					}}
				>
					{message?.['fetch']}
				</Button>
				<SplitButton
					options={manageLanguage}
					title= 'language'
				/>
				<SearchBar 
					setAllKeys={setAllKeys}
					pathKeys={pathKeys}
				/>
				{loader ? (
					<></>
				) : (
					<>
						<TableContainer component={Paper} className={"table-container"}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>{message?.['keyName']} {space}
											<SplitButton
												options={manageKeys}
												title='manageKeys'
											/>
										</TableCell>
										{React.Children.toArray(
											!isEmpty(allFilesName) &&
											//  get all file names
											Object.keys(allFilesName).map((fileName, index) => {
												return (
													<TableCell key={`tb-header-${index}`}>
														<Box className="cell-line">
															<Typography className="tb-cell-filename">
																{fileName}
															</Typography>
															<Box className="button-container">
																<SplitButton
																	options={mangeButtons(fileName)}
																	title='manageFile'
																/>
															</Box>
														</Box>
													</TableCell>
												);
											})
										)}
										{/* Add button */}
										<TableCell>
											<Button
												color="secondary"
												variant="contained"
												onClick={() => {
													setMode(dialogMode.newFile);
													handleDialog();
												}}
											>
												<Add />
											</Button>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allKeys.map((pathName, index) => {
										return (
											<SingleLine
												key={index}
												rowValue={storage[pathName]}
												pathName={pathName}
												allFilesName={allFilesName}
											/>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				)}

				<NewDialog
					open={openDialog}
					handleDialog={handleDialog}
					mode={mode}
					selectedName={selectedName}
					setRefresh={setRefresh}
				/>
			</Box>
		</>
	);
};

export default WebTable;
