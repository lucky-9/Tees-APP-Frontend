import React,{Fragment} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Link, withRouter, Redirect } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { singout, isAuthenticated } from './../auth/helper/index';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    //display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const handleSignIn = (props) =>{
    props.history.push({
        pathname:"/signin"
    })
}


const handleSignUp = (props) =>{
    props.history.push({
        pathname:"/signup"
    })
}
const handleSignOut = (props) =>{
  singout();
  props.history.push({
      pathname:"/"
  })
}

const handleProfile = (props) =>{
  props.history.push({
      pathname:"/user/dashboard"
  })
}

const handleCart = (props) =>{
  props.history.push({
      pathname:"/user/cart"
  })
}

const PrimarySearchAppBar = (props) =>{
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const logout = () => {
  //   console.log('sksk');
  //   singout();
  //   return <Redirect to="/" />
  // };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
 );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
       <MenuItem>
        <IconButton onClick={() => handleCart(props)} aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Your Cart</p>
      </MenuItem>
      {isAuthenticated() && <MenuItem>
        <p onClick={()=>handleSignOut(props)}>SIGN OUT</p>
      </MenuItem>}
      {isAuthenticated() && <MenuItem>
        <p onClick={()=>handleProfile(props)}>PROFILE</p>
      </MenuItem>}
      {!isAuthenticated() && <Fragment>
        <MenuItem>
          <p onClick={()=>handleSignIn(props)}>SIGN IN</p>
        </MenuItem>
      
        <MenuItem>
          <p onClick={()=>handleSignUp(props)}>SIGN UP</p>
        </MenuItem>
      </Fragment>}
    </Menu>
  );

  return (
    
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" noWrap>
           <Link to="/" className="text-white footer-navbar-heading" style={{fontSize:"5vh", textDecoration: "none"}}>TeesApp</Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={()=>handleCart(props)} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
         {!isAuthenticated() && ( <Fragment>
          <Button onClick={() => handleSignIn(props)} color="inherit">SignIn</Button>
          <Button onClick={() => handleSignUp(props)} color="inherit">SignUP</Button>
          </Fragment>)
          }
          {isAuthenticated() && <Button onClick=
         {()=>handleSignOut(props)}
          color="inherit">Signout</Button>}

          {isAuthenticated() && <Button onClick=
          {() =>{handleProfile(props)}} 
          color="inherit">Profile</Button>} 
          </div>
          
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


export default withRouter(PrimarySearchAppBar);