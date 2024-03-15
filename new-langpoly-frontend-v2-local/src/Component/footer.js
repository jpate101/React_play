import React from "react"
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
	Box,
	Grid,
	Icon,
	Typography,
} from "@mui/material"
import "./component.scss"
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system"
import PhoneIcon from '@mui/icons-material/Phone';



const contributors = ['John James', 'Ray', 'Test']

function SimpleDialogDemo () {
	//const [open, setOpen] = React.useState(false)

	const HandleClickToContributorPage = () => {
		//console.log('handleClickToContributorPage')
	}

	return (
		<div>
			<Grid container spacing={2}>
      			<Grid item>
				  <Button variant="contained" color="secondary" onClick={HandleClickToContributorPage}>
					Contact Us
				  </Button>
      			</Grid>
                <Grid item>
				  <Button variant="contained" color="secondary" onClick={HandleClickToContributorPage}>
					FAQ
				  </Button>
      			</Grid>
                <Grid item>
				  <Button variant="contained" color="secondary" onClick={HandleClickToContributorPage}>
					Company Infomation
				  </Button>
      			</Grid>
    		</Grid>
		</div>
	)
}

const Footer = () => {

	return (
		<div className="main-footer">
			<div className="container">
			<Grid container spacing={2} padding="0 100px" margin="0 auto" paddingTop="0px">
      			<Grid item flex = {1} >
					{/* col 1*/}
						<h4>Company Name</h4>
						<Typography variant="body1">
  							<Icon component={PhoneIcon} fontSize="small" color="secondary" /> + 0123 456 789
						</Typography>
						<p>Suite 302, Level 3/2 Elizabeth Plaza, North Sydney NSW 2060</p>
				</Grid >
				<Grid item flex = {1}>
					{/* col 2*/}
					<ul className="list-unstyled">
						<p>Contact Us</p>
						<p>FAQ</p>
						<p>About Company</p>
					</ul>
				</Grid>
				<Grid item flex = {2}>
					{/* col 3*/}
					<h4>Website Feedback</h4>
					<p>Help us improve the content on out website or tell us what is working well</p>
					<Button variant="outlined" style={{ color: 'purple', borderColor: 'purple' }}>Leave your Feedback</Button>

				</Grid>
			</Grid>
			</div>
			<hr />
			<div className="row" style={{ textAlign: 'center'}}>
				<p className="col-sm" >
					&copy;{new Date().getFullYear} Company Name All rights reserved 2023 | Terms of Service | Privacy
				</p>
			</div>
		</div>
		
)}




export default Footer