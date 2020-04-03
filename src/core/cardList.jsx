import React,{Component} from 'react';
import DisplayCard from './displayCard';
import { API } from './../backend';
import MDSpinner from "react-md-spinner";



const sizeOfLoader = 150;
const loaderColor = "#3f51b5";

class CardList extends Component {
    constructor(props){
        super(props);
        this.state={
            products:[],
            noProducts:null
        }
    }
    async componentDidMount(){
        try{
            
            const products_call = await fetch(`${API}products`);
            const products = await products_call.json();
            this.setState({products:products});
            console.log(this.state.products);
        }
        catch(err){
            console.log("error: ", err);
            this.setState({noProducts:true})
        }
    }
   
    render() { 
        if (this.state.noData === true) {
            return (
              <div className="err-message">
                Sorry, There are No products
                               <br />
                please try again
              </div>
            );
          }
          if(!this.state.products.length){
            return(<div style={{textAlign:"center", marginTop:"30vh"}}>
              <MDSpinner size={sizeOfLoader} singleColor={loaderColor}/>
            </div>) 
          }

        return (
        <div className="d-flex flex-row flex-wrap justify-content-center">
            
            {this.state.products.map(product =>  <DisplayCard
                product={product} showRemoveFromCart={{button:false}}/>)}
            
        </div>);
    }
}
 
export default CardList;
