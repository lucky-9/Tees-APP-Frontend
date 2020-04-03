import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Base from './../core/Base';
import { signin, isAuthenticated, authenticate } from './../auth/helper/index';



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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const signInWrappepr = () =>{
    const [values, setValues] = useState({
        email:"",
        password:"", 
        loading:false,
        didRedirect:false,
        error:""
        
    });
    const {email, password, error, loading} = values;
    const {user} = isAuthenticated();


    const handleChange = (name) => event =>{
        setValues({...values, error:false, [name]:event.target.value})
    }

    const performRedirect = () =>{
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
        
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false, loading:true});
         signin({email, password})
         .then(data =>{
            console.log("got response")
            if(data.err){
                console.log("inside data.error block")
                setValues({...values, error:data.err})
                console.log(`error message ${data.err}`)
            }
            else{
               authenticate(data, ()=>{
                   console.log("inside authenticate block")
                    setValues({...values, didRedirect:true})
               })
           
            }
        })
        .catch(console.log("Error in signin"))
         
    }

    const loadingMessage =() =>{
        return(
        loading &&
            <div className="d-flex flex-horizantal justify-content-center">
                <div className="alert alert-success  col-4 text-cente">
               loading...
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

function SignIn(props) {


    const classes = useStyles();
    const handleClick  = async (props) => {
       
        // let isAuthenticated;
        // try {
        //     isAuthenticated = await loginService.login(username, password);
        // } catch (ex) {
        //     if(isAuthenticated === false) {
        //         toast('User is not authorized. Please sign up');
        //     }
        //     return;
        // }

        // if(isAuthenticated) {
        //     localStorage.setItem('isAuthenticated', 'true');
        //     props.history.push({
        //         pathname: '/home'
        //     });
        // }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange("email")}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange("password")}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={ handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link to='/signup' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}
return(
    <Base title="SignIn" description="Please signin below">

        {SignIn()}
        {loadingMessage()}
        {performRedirect()}
        {errorMessage()}
    </Base>
)
}
export default signInWrappepr;