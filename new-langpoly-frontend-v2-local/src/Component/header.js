import React from "react"
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
	Box,
	Grid,
	Typography,
} from "@mui/material"
import "./component.scss"
import PropTypes from 'prop-types'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { blue } from '@mui/material/colors'
import PersonIcon from '@mui/icons-material/Person'
import ListItemText from '@mui/material/ListItemText'

import { Link } from "react-router-dom";



const contributors = ['John James', 'Ray', 'Test']
function SimpleDialog (props) {
	const { onClose, open } = props

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Contributor</DialogTitle>
			<List sx={{ pt: 0 }}>
				{contributors.map((contributor) => (
					<ListItem >
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={contributor} />
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
}

function SimpleDialogDemo () {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = (value) => {
		setOpen(false)
	}

	const HandleClickToContributorPage = () => {
		//console.log('handleClickToContributorPage')
	}

	return (
		<div>
			<Grid container spacing={2}>
      			<Grid item>
				  <Button variant="contained" color="secondary" onClick={HandleClickToContributorPage}>
					<Link style={{color: 'white' , textDecoration: 'none'}} to = "/ContributorPage" >contributor page</Link>
				  </Button>
      			</Grid>
      			<Grid item>
				  <Button variant="contained" color="secondary" onClick={handleClickOpen}>
					contributor
					</Button>
      			</Grid>
    		</Grid>
		</div>
	)
}

const Header = () => {

	return (
		<Box className="header-container">
			<Box>
				<Typography> <Link style={{color: 'white', textDecoration: 'none'}}  to = "/" >LangPoly v2</Link></Typography>
			</Box>
			<SimpleDialogDemo />
		</Box>
	)
}


export default Header
