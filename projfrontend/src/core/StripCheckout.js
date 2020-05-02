import React, {useEffect, useState} from 'react';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';


const StripeCheckout = ({products, setReload = f => f, eload = undefined}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });


    const token = isAutheticated() && isAutheticated().token
    const userId = isAutheticated() && isAutheticated().user._id
    
    const getFinalPrice = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount;
    }

    const showStripeButton = () => {
        return isAutheticated() ? (
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
            <Link to = "/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        ) 
    }





    return (
        <div>
            <h3 className="text-white">Stripe checkout {getFinalPrice()}
            </h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;
    