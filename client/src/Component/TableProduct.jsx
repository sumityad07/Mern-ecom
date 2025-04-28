import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const TableProduct = ({ cart }) => {


    const { deleteQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)


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
            <table className="table table-bordered border-primary bg-dark text-center">
                <thead>
                    <tr className='text-center'>
                        <th scope="col" className='bg-dark text-light' >Product Img</th>
                        <th scope="col" className='bg-dark text-light text-center' >Tittle</th>
                        <th scope="col" className='bg-dark text-light' >Price</th>
                        <th scope="col" className='bg-dark text-light' >qty</th>
                        <th scope="col" className='bg-dark text-light text-center' > qty++</th>
                        <th scope="col" className='bg-dark text-light' > qty--</th>
                        <th scope="col" className='bg-dark text-light' >remove</th>
                    </tr>
                </thead>
                <tbody>

                    {cart?.items?.map((product) => (
                        <tr key={product._id}>
                            <th scope="row" className='bg-dark text-light' >1</th>
                            <td className='bg-dark text-light' >
                                <img src={product.imgSrc} style={{ width: "100px", height: "100px" }} alt="" />
                            </td>
                            <td className='bg-dark text-light' >{product.title}</td>
                            <td className='bg-dark text-light' >{product.price}</td>
                            <td className='bg-dark text-light' onClick={() => deleteQty(product.productId, 1)}   >➖</td>
                            <td className='bg-dark text-light' >
                                <span onClick={() => {
                                    addToCart(
                                        product.productId,
                                        product.title,
                                        product.price / product.qty,
                                        1,
                                        product.imgSrc
                                    )
                                }} className="material-symbols-outlined">➕
                                </span>
                            </td>
                            <td className='bg-dark text-light' onClick={() => {
                                if (confirm("are you sure you want to remove the product")) {
                                    removeFromCart(product.productId)
                                }
                            }} >💀</td>
                        </tr>
                    ))}

                    <tr >
                        <th scope="row" className='bg-dark text-light' >1</th>
                        <td className='bg-dark text-light' >
                            <button className='btn btn-primary' style={{ fontWeight: "bold" }}>Total</button>

                        </td>
                        <td className='bg-dark text-light'>
                            <button className='btn btn-warning' style={{ fontWeight: "bold" }}>{price}</button>
                        </td>
                        <td className='bg-dark text-light'>
                            <button className='btn btn-info' style={{ fontWeight: "bold" }}>{qty}</button>
                        </td>
                        <td className='bg-dark text-light' ></td>
                        <td className='bg-dark text-light' ></td>
                        <td className='bg-dark text-light' ></td>
                    </tr>


                </tbody>
            </table>


        </>
    )
}

export default TableProduct