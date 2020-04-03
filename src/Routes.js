import React from 'react';
import Home from './core/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SingUpWrapper from './user/Signup';
import SignInWrapper from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import CartPage from './core/cartPage';
import './styles.css'
import './index.css';

const Routes = () => {
    return ( <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signin" exact component={SignInWrapper}/>
        <Route path="/signup" exact component={SingUpWrapper}/>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <PrivateRoute path="/user/cart" exact component={CartPage}/>

    </Switch>
    </BrowserRouter> );
}
 
export default Routes;