import React  from "react";
import Header from '../Component/header';
import Footer from '../Component/footer';
import { Avatar, Box, Card, CardContent, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

import data from './../data/contributorData.json';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const LanguageContext = React.createContext()

const carouselTestData = [
  { title: 'Card 1', description: 'This is card 1' },
  { title: 'Card 2', description: 'This is card 2' },
  { title: 'Card 3', description: 'This is card 3' },
];

function Contributor() {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    return (
      <div>
        <Header/>
        <Typography padding="0 100px" margin="0 auto" paddingTop="20px" style={{ fontSize: "2.2rem" }}> Contributors </Typography>
        <Box padding="0 100px" margin="0 auto" paddingTop="20px">
        
        <Carousel responsive={responsive}>
        {data.contributor.map((person) => (
          <div className="card" >
            <img className="product--image" src = {person.cardImage} alt="product image"  width="500" height="300" />
            <ListItemText primary={<Typography style={{ fontSize: "1.8rem" }}> {person.name} </Typography>} secondary={person.description}/>
            <ListItemText primary={'Contact Information'} secondary={         
                <div>
                  <div>Email: {person.email}</div>
                  <div>Phone Number: {person.phoneNumber}</div>
                </div>
                }              
                secondaryTypographyProps={{ component: 'div' }}/>
                {person.linkin ? (
            <IconButton
                aria-label="LinkedIn profile"
                href={person.linkin}
                target="_blank"
                rel="noopener">
            <LinkedInIcon/>
            </IconButton> ) : null}
              {person.facebook? (
              <IconButton 
                aria-label="Facebook profile"
                href={person.facebook}
                target="_blank"
                rel="noopener"><FacebookIcon/>
            </IconButton>) : null}
          </div>
        
        ))}
        </Carousel>
        </Box>



        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'black'}}>
          <Footer/>
        </div>

      </div>
    );
  }
  
  export default Contributor;
  export {LanguageContext}