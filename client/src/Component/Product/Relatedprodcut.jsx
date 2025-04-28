import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'

const Relatedprodcut = ({category}) => {
     const [realatedProduct, setrealatedProduct] = useState([])
    const {products} = useContext(AppContext)
    useEffect(() => {
      setrealatedProduct(products.filter((data)=>{
        return data?.category?.toLowerCase() == category?.toLowerCase()
      })
    )
    }, [products, category])
    console.log(realatedProduct);
    
    

  return (
    <>
      <div className="container text-center">
        <h1>Related Product</h1>
        <div className="container  d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {realatedProduct?.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 
            d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "10px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="my-3">
                      <button className="btn btn-primary mx-3">
                        {product.price} {"₹"}
                      </button>
                      <button className="btn btn-warning">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Relatedprodcut