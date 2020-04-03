import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Base from './../core/Base';
import { singup } from './../auth/helper/index';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SingUpWrapper =() =>{
    const [values, setValues] = useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        error:"",
        success:false
    })
    
    const {name, lastname, password,email, error, success} = values;
    const handleChange = (name) => event =>{
        setValues({...values, error:false, [name]:event.target.value})
    }

    const handleSubmit = (event) =>{
        console.log("button clicked!!")
        event.preventDefault();
        setValues({...values, error:false})
        singup({name, lastname, password, email})
        .then(data =>{
            console.log("got response")
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values,
                name:"",
                lastname:"",
                email:"",
                password:"",
                success:true
            })
            }
        })
        .catch(console.log("Error in signup"))
    }

    const successMessage =() =>{
        return(
        <div className="d-flex flex-horizantal justify-content-center">
            <div className="alert alert-success"
            style={{display:success ? "":"none"}}>
            Account Created Succesfully!!
        </div>
        </div>
        )
    }
    const errorMessage =() =>{
        return(
           <div className="d-flex flex-horizantal justify-content-center">
            <div className="alert alert-danger col-4 text-center"
                style={{display:error ? "":"none"}}>
                {error}
            </div>
           </div>
        )
    }
 const SignUp =(props) =>{
    const classes = useStyles();
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="First Name"
                                onChange={handleChange("name")}
                                value={name}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={handleChange("lastname")}
                                value={lastname}
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange("email")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange("password")}
                                value={password}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={ handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/signin' variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}
    return(
    <Base title="Sign Up" description="Please signup below">
        
        {SignUp()}
        {successMessage()}
        {errorMessage()}
    </Base> 
    )
}

export default SingUpWrapper;