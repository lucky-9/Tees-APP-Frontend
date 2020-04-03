import React, { Component } from 'react';
import DisplayCard from './displayCard';


class Carts extends Component {

    cartNumberUpdater = () =>{
        if(this.state.cartProductsNumber !== JSON.parse(localStorage.getItem("cart")).length){
            this.setState({cartProductsNumber: JSON.parse(localStorage.getItem("cart")).length})
        }
    }
   
    handleRemove = () =>{
        this.setState({cartProducts : JSON.parse(localStorage.getItem("cart")).length});
    }
    costCalculator = () =>{
        let cost = 0;
        let ItemsToCalculateCost = JSON.parse(localStorage.getItem("cart"));
        ItemsToCalculateCost.map((product) => cost+=parseInt(product.price));
        return cost;
    }

    state = { cartProducts:[], cartProductsNumber: JSON.parse(localStorage.getItem("cart")).length};
  
    componentDidMount(){
        console.log("count got from props ", this.props.count);
       if(localStorage.getItem("cart")){
        let local = JSON.parse(localStorage.getItem("cart")).length;
        console.log("the length of local storage is ", local);
        if(window !== "undefined"){
            if(localStorage.getItem("cart")){
                const cartProducts = JSON.parse(localStorage.getItem("cart"));

                this.setState({cartProducts : cartProducts});
                console.log(`after setting state ${this.state.cartProducts}`)
                }
            }
       }
}

   
    render() {
       

        console.log(`${this.state.cartProducts}`)
        if(this.state.cartProducts.length === 0){
            return (<>
                <div className="d-flex mx-auto">
                    <h1>Sorry, There are no Items in your Cart!</h1>
                </div>
            </>)
        } 
        return ( 
       <div className="mx-auto">
        <div className="d-flex flex-row flex-wrap justify-content-center">
        
                <div className="d-flex flex-column flex-wrap">
                <h1 className="heading">There are {this.state.cartProductsNumber} Items in your Cart!</h1>
                    {this.state.cartProducts.map((product, index )=>
                        <DisplayCard product={product} showAddToCart={{button:false}} key={index}/>
                    )}
                </div>
                {/* <Button onClick={this.handleRemove}>Remove</Button> */}
            
            <div className="d-flex flex-column mx-auto heading order-summery" style={{textAlign:"center"}}>
                <h1>Order Summary</h1>
                    <p>Total Items: {JSON.parse(localStorage.getItem("cart")).length}</p>
                    <p>Total Cost: {this.costCalculator()}</p>
                    <p className="btn btn-primary btn-large">BUY</p>
            </div>
        </div>
        </div>
            );
    }
}
 
export default Carts;