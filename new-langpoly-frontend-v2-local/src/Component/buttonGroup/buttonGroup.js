import React, { useState, useRef, useContext } from "react";
import {
	Button,
	Grow,
	Paper,
	Popper,
	MenuList,
	ClickAwayListener,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { LanguageContext } from "src/Pages/newMain";
import "./buttonGroup.scss";

const SplitButton = ({ options, title }) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const lngContext = useContext(LanguageContext);
	const message = lngContext?.msg;

	const handleToggle = () => {
		setOpen((pre) => !pre);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<Button
				onClick={handleToggle}
				color="primary"
				size="small"
				ref={anchorRef}
			>
				{message?.[title]}
				{title !== "language" ? <Edit /> : ""}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				className="btn-group-dropdown"
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom"
									? "center top"
									: "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu">
									{options.map((option, index) => option)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default SplitButton;
