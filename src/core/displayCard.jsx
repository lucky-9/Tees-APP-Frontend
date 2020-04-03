import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { API } from './../backend';
import {isAuthenticated} from '../auth/helper/index';
import {withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        width: 345,
        minHeight: 200,
        margin: 10,
        padding: 10
    },
    cardContent: {
        backgroundColor: '#f5f5f5'
    },
    media: {
        height: 140,
    },

});

function DisplayCard(props) {
  const {showAddToCart={}, showRemoveFromCart={}, product} = props;
  const { name, description, _id, price} = product;
  const [buttonContent, setButtonContent] = useState('');
    const classes = useStyles();

   const addtoCard=(product, props) =>{
     if(!isAuthenticated()){
        props.history.push('/signin')
     }
     else{
      let cart=[];
      if(window !== "undefined"){
          if(localStorage.getItem("cart")){
              cart = JSON.parse(localStorage.getItem("cart"));
          }
          cart.push({...product, count:1})
          localStorage.setItem("cart", JSON.stringify(cart));
          setButtonContent('ADDED TO CART')
      }
     }
  }

  const  removeFromCart =(productId, props)=>{
    let cartProducts = []
    if(window !== "undefined"){
        if(localStorage.getItem("cart")){
             cartProducts = JSON.parse(localStorage.getItem("cart"));
        }
        cartProducts.map((product, i) =>{
            if(product._id === productId){
                cartProducts.splice(i,1)
            }
        })
        props.history.push({pathname:'/user/cart'})
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        

    }
    return cartProducts;

}


    return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`${API}product/photo/${_id}`}
              title="T-shirt photo"
            />
            <CardContent>
            <h4 className="heading">{name}</h4>
            <div className="heading">{description}</div>
            <h4 className="heading">₹{price}</h4>
            </CardContent>
          </CardActionArea>
          <CardActions>
           
            <div className="d-flex flex-column justify-space-around m-auto ">
              {showAddToCart.button === false ? null:<Button className="m-1 font" variant="contained" size="large" color="primary" onClick={()=>addtoCard(product, props)}>
               {buttonContent?buttonContent:'ADD TO CART'}<ShoppingCartIcon/>
                </Button>}
               {showRemoveFromCart.button === false ? null:  <Button className="m-1 font" variant="outlined" color="secondary" size="large" onClick={() => removeFromCart(product._id, props)}>
                <ShoppingCartIcon/>REMOVE FROM CART
                </Button>}
            </div>
            
          </CardActions>
        </Card>
      );
    }

    export default withRouter(DisplayCard);