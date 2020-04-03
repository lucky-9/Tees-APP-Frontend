import { API } from './../../backend';


export const giveProducts = () =>{
    return (
        fetch(`${API}/products`)
        .then(res => {return res.json()})
        .catch(err =>console.log("Error getting Products", err))
    )
}
