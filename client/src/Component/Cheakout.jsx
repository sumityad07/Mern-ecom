import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';
import TableProduct from './TableProduct';

const Cheakout = () => {
    const { cart, userAddress } = useContext(AppContext);
    console.log("user", userAddress);

    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let qty = 0
        let price = 0;
        if (cart?.items) {
            for (let i = 0; i < cart.items?.length; i++) {
                qty += cart.items[i].qty
                price += cart.items[i].price
            }

        }
        setPrice(price)
        setQty(qty)
    }, [cart])

    return (
        <>
            <div className="container text-centerllll my-3" style={{ color: "white" }}>
                <h1>Order summery</h1>

                <table className="table table-bordered border-primary bg-dark">
                    <thead>
                        <tr>
                            <th className='bg-dark text-light' scope="col">Prodcut details</th>

                            <th className='bg-dark text-light' scope="col">shipping address</th>
                        </tr>
                    </thead>
                    <tbody className='bg-dark'>
                        <tr>

                            <td className='bg-dark text-light'>
                                <TableProduct cart={cart} />

                            </td>
                            <td className='bg-dark text-light'>
                                <ul style={{ fontWeight: "bold", textDecoration: "none" }}>
                                    <li>Name : {userAddress?.fullName}</li>
                                    <li>Phone : {userAddress?.phoneNumber}</li>
                                    <li>Country : {userAddress?.country}</li>
                                    <li>State : {userAddress?.state}</li>
                                    <li>PinCode : {userAddress?.pincode}</li>
                                    <li>Near By : {userAddress?.address}</li>
                                </ul>
                            </td>

                        </tr>


                    </tbody>
                </table>
            </div>
             
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          
        >
          Procced To Pay
        </button>
      </div>

        </>
    )
}


export default Cheakout