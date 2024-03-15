import React, { useEffect, useState } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import { localStorageKey } from 'src/constant'
import { fetchFromStorage } from 'src/helpers/saveStorage'

const PREFIX = 'Single-Line'
const classes = {
	text_area: `${PREFIX}-root`,
}
const Textarea = styled('textarea')(() => ({
	[`&.${classes.text_area}`]: {
		minHeight: "36px",
		minWidth: "167px"
	},
}))

const SingleLine = ({ rowValue, pathName, allFilesName }) => {
	const [singleRow, setSingleRow] = useState(() => {
		if (rowValue) return rowValue
		return rowValue.toString()
	})

	useEffect(() => {
		setSingleRow(rowValue)
	}, [rowValue])

	// when input part lost focus, it will save the value to the website
	const saveValue = (pathName) => {
		let newContent = fetchFromStorage(localStorageKey)
		newContent[pathName] = singleRow
		localStorage.setItem(localStorageKey, JSON.stringify(newContent))
	}

	const changeValue = (e, singleRow, setSingleRow, file) => {
		let newRows = { ...singleRow }
		newRows[file] = e.target.value
		setSingleRow(newRows)
	}


	return (
		<>
			<TableRow key={`tb-row-${pathName}`}>
				<TableCell key={pathName}>{pathName}</TableCell>
				{React.Children.toArray(
					Object.keys(allFilesName).map((file, fileIndex) => {
						return (
							<>
								<TableCell
									key={`tbcell-file-${fileIndex}`}
									align="center"
								>
									<Textarea
										key={`tb-area-${fileIndex}`}
										value={singleRow[file]}
										className={classes.text_area}
										role="textbox"
										rows={singleRow[file]?.length ? singleRow[file].length / 10 : 2}
										// when the textarea lost focus, then it will save to localstorage
										onBlur={() => {
											saveValue(pathName)
										}}
										// if the textarea changed its value, then it will change value
										onChange={(e) => {
											changeValue(e, singleRow, setSingleRow, file)
										}}
									></Textarea>
								</TableCell>
							</>
						)
					})
				)}
				{ }
			</TableRow>
		</>
	)
}

export default SingleLine