import React, { useContext} from "react";
import {
	Dialog,
	DialogTitle,
} from "@mui/material";
import { dialogMode } from "src/constant";
import TextContent from './dialogContent/textContent'
import Notice from "./dialogContent/notice-log";
import DeleteContent from "./dialogContent/deleteContent";
import SendFile from "./dialogContent/sendFileContent"
import { LanguageContext } from "src/Pages/newMain";

const NewDialog = ({ open, handleDialog, mode, selectedName, setRefresh }) => {

	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;

	const modalContent = {
		title: {
			[dialogMode.newFile]: message.addNewFile,
			[dialogMode.newKey]: message.addNewKey,
			[dialogMode.delKey]: message.deleteKeys,
			[dialogMode.delCol]: 'Delete file',
			[dialogMode.uploadFile]: 'Upload file',
			[dialogMode.updateFile]: 'Update file'
		}
	}

	const switchContent = (mode) => {
		// eslint-disable-next-line default-case
		switch(mode) {
			case(dialogMode.delKey):
				return <DeleteContent handleDialog={handleDialog} />
			case(dialogMode.newKey):
				return <TextContent handleDialog={handleDialog} mode={mode} />
			case(dialogMode.newFile):
				return <SendFile handleDialog={handleDialog} selectedName={selectedName} setRefresh={setRefresh} mode={mode} open={open}/>
			case(dialogMode.updateFile):
				return <SendFile handleDialog={handleDialog} selectedName={selectedName} setRefresh={setRefresh} mode={mode} open={open}/>
			case(dialogMode.delCol):
				return <Notice handleDialog={handleDialog} mode={mode} selectedName={selectedName} setRefresh={setRefresh}/> 
		}
	}

	return (
		<Dialog
			onClose={() => {
				handleDialog();
			}}
			open={open}
		>
			<DialogTitle>{modalContent.title[mode]}</DialogTitle>
			{switchContent(mode)}

		</Dialog>
	);
};

export default NewDialog;
