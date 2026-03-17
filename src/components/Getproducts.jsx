import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const Getproducts = () => {

    //initialize hooks to help you manage the states of your application
    const [products,setProducts] =useState([]);
    const [loading,setLoading] =useState(false);
    const [error,setError] =useState("");

    //specify the image base url
    const img_url = "https://ramogi-web.alwaysdata.net/static/images/"

    //create a function to help you fetch the products from the api
    const fetchProducts = async()=>{
      try {
        //update the loading hook
        setLoading(true)
        
        //  Interact with your endpoint for fetching the products
        const response = await axios.get("http://ramogi-web.alwaysdata.net/api/get_products")

        // update the products hook with the response given from the api
        setProducts(response.data)

        //set the loading hook back to default
        setLoading(false)
      } 
      catch (error) {
        // if there is an error
        //set the loading hook back to default
        setLoading(false)

        //update the error hook with a message
        setError(error.message)
        
      }
    }

    // we shall use the useEffect hook. This hook enablesus to automatically re-render new features incase of any changes.
    useEffect(() =>{
      fetchProducts()
    },[])

    // console.log(products)

  return (
    <div className='row'>
        <h3 className='text-primary text-center'>Available products</h3>
        {loading && <Loader/>}
        <h4 className='text-danger'>{error}</h4>
        
        {/* map the products fetched from the api to the user interface */}
        {products.map((product) => (
          <div className="col-md-3 justify-content-center mb-3" >
          <div className="card shadow">
            <img
            src={img_url + product.product_photo} 
            alt="productname"  
            className='product_img mt-3'/>
            <div className="card-body">
              <h5 className="text-primary">{product.product_name}</h5>

              <p className="text-dark">{product.product_description.slice(0,100)}...</p>

              <h4 className="text-warning">Kes {product.product_cost}</h4>
            </div>
          </div>
        </div>
        ) )}
    </div>
  )
}

export default Getproducts;