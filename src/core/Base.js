import React from 'react';
import PrimarySearchAppBar from './appbar';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import TwitterIcon from '@material-ui/icons/Twitter';
// import MailIcon from '@material-ui/icons/Mail';

const Base = ({children}) => 
    ( 
    <div>
        <PrimarySearchAppBar/>
       <div>
            {children}
        </div>
        
        {/* <footer style={{backgroundColor:"#3f51b5", color:"#FFF"}} className="d-flex flex-column justify-content-center">
                <div>
                    <h1 className="footer-navbar-heading" style={{textAlign:"center"}}>TeesApp</h1>
                </div>
               <div style={{textAlign:"center"}}>
                    <a target="_blank" href="https://material-ui.com/components/material-icons/#material-icons">
                        <FacebookIcon color="action"/>
                        </a> 
                    <a target="_blank" href="https://www.instagram.com/pa.v_an/">
                        <InstagramIcon color="action"/>
                        </a>
                    <a target="_blank" href="https://material-ui.com/components/material-icons/#material-icons">
                        <TwitterIcon color="action"/>
                        </a>
                    <a target="_blank" href="https://material-ui.com/components/material-icons/#material-icons">
                        <MailIcon color="action"/>
                        </a>
               </div> 
          </footer> */}
           
    </div> 
    );

 
export default Base;