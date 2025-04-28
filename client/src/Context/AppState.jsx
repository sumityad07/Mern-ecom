import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from "axios"
import { ToastContainer, toast, Bounce } from "react-toastify";


const AppState = (props) => {
    const [products, setproducts] = useState([])
    const [token, settoken] = useState("")
    const [isAuthenticate, setisAuthenticate] = useState(false)
    const [filterproducts, setfilterproducts] = useState()
    const [user, setuser] = useState()
    const [cart, setCart] = useState([])
    const [userAddress, setUserAddress] = useState("")
   

    const [reload, setReload] = useState(false);
    const url = "http://localhost:1001/api"

    useEffect(() => {
        const fetchProducts = async () => {
            const api = await axios.get(`${url}/product/all`, { headers: { "Content-Type": "Application/json" }, withCredentials: true })


            setproducts(api?.data?.product)
            setfilterproducts(api?.data?.product)


        }
        fetchProducts()
        userCart()
        getAddress()
        // userCart()
    }, [token,reload])

    //gettokenfromLS
    useEffect(() => {
        let ls = localStorage.getItem("token");
        if (ls) {
            settoken(ls);
            setisAuthenticate(true);
            //    console.log("Token set from localStorage:", ls);
        } else {
            console.log("No token found in localStorage.");
        }
    }, []);


    //register
    const register = async (name, email, password) => {
        const api = await axios.post(
            `${url}/user/register`,
            { name, email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        // alert(api.data.message)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        return api.data;
    };
    //login
    //
    const login = async (email, password) => {
        const api = await axios.post(
            `${url}/user/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        // alert(api.data.message)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        settoken(api.data.token);
        setisAuthenticate(true)
        localStorage.setItem("token", api.data.token)


        return api.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        setisAuthenticate(false);
        toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };


    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: { "Authorization": `Bearer ${token}` },
            withCredentials: true,
        });
        setuser(api.data.user);

    };


    const addToCart = async (productId, title, price, qty, imgSrc) => {
        // console.log("product id = ", productId);
        const api = await axios.post(
          `${url}/cart/add`,
          { productId, title, price, qty, imgSrc },
          {
            headers: {
              "Content-Type": "Application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        setReload(!reload);
        //  console.log("my cart ",api)
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      };

      const userCart = async()=>{
        const api = await axios.get(
            `${url}/cart/usercart`,
           
            {
              headers: {
                "Content-Type": "Application/json",
                Auth: token,
              },
              withCredentials: true,
            }
          );
         
        //   console.log("user cart" , api.data.cart);
          setCart(api?.data?.cart)
          
          
          
      }

      //delete
      
    const deleteQty = async (productId, qty) => {
        // console.log("product id = ", productId);
        const api = await axios.post(
          `${url}/cart/--qty`,
          { productId, qty },
          {
            headers: {
              "Content-Type": "Application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        setReload(!reload);
        //  console.log("my cart ",api)
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      };

      //remove from cart
      const removeFromCart = async (productId) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`, {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setReload(!reload);
        // console.log("remove item from cart ",api);
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
      };

      //clear cart
      const clearCart = async () => {
        const api = await axios.delete(`${url}/cart/clear`, {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setReload(!reload);
        console.log("remove item from cart ",api);
        toast.success(api.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
      };

       //  Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  // get User latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
     console.log("user address ", api);
    setUserAddress(api?.data.address[api?.data.address.length - 1]);
  };

    return (
        <>

            <AppContext.Provider value={{ products, register, login, token, setisAuthenticate, isAuthenticate, filterproducts, setfilterproducts, logout, user, userProfile ,addToCart,userCart,cart,deleteQty,removeFromCart,clearCart,shippingAddress,setUserAddress,userAddress}}>{props.children}</AppContext.Provider>
        </>

    )
}

export default AppState;