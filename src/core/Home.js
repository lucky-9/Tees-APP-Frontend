import React from 'react';
import "../styles.css";
import {API} from '../backend';
import Base from './Base';
import CardList from './cardList';

const Home = () => {
    console.log("API is ", API);
    return (
        <Base title="Home Page" description="It is Home page!!" >
            
            <div>
              <CardList />  
            </div>
        </Base>
      );
}
 
export default Home;


