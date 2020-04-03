import React from 'react';
import Base from './../core/Base';
import { isAuthenticated } from './../auth/helper/index';

const UserDashBoard = () => {
    const {user} = isAuthenticated();
    const {name} = user;
    return ( <Base title="UserDashBoard page">
    <div className="d-flex flex-column" style={{textAlign:"center"}}>
        <h1 className="heading">{`Hey, ${name}`}</h1>
        <p className="heading">this is your Dashboard</p>
    </div>
    </Base> );
}
 
export default UserDashBoard;