import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {
  // Introduce the hooks
  const[product_name,setProductName] =useState("");
  const[product_description,setProductDescription] =useState("");
  const[product_cost,setProductCost] =useState("");
  const[product_photo,setProductPhoto] =useState("");

  //declare the addition hooks to manage the the state of application
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const [error,setError] = useState("");

  //create a function that will handle the submit function
  const handlesubmit = async (e) =>{
    //prevent the site from reloading
    e.preventDefault()

    //set loading hook with a message(activate it)
    setLoading(true)
     
    try {
      // create a form data
      const formdata = new FormData()
      
      //append the details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // interact with the axios to help with method post
      const response =await axios.post("http://ramogi-web.alwaysdata.net/api/add_product",formdata)

      //set the loading hook back to default
      setLoading(false)

      //update the success hook with a message
      setSuccess(response.data.message)

      //clearing the hooks
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      //set timeout
       setTimeout(() => {
    setSuccess("");
  }, 5000);

    } catch (error) {
      //set the loading hook back to default
      setLoading(false);
      
      //update the setError with amessage
      setError(error.message)
    }

  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3 className='text-center text-primary'>Welcome to Add products</h3>

        {/* {bind the loading hook} */}
        {loading && <Loader/>}
        <h3 className="text-success">{success}</h3>
        <h2 className="text-danger">{error}</h2>


        <form onSubmit={handlesubmit}>
          <input type="text" 
          placeholder='Enter the product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) =>setProductName(e.target.value)}/> <br />

          {/* {product_name} */}

          <input type="text"
          placeholder='Enter the product description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) =>setProductDescription(e.target.value)} /> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter the product cost'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) =>setProductCost(e.target.value)} /> <br />

          {/* {product_cost} */}

          <label className='text-center text-primary'>Product photo</label>
          <input type="file"
          className='form-control'
          required 
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

          <input type="submit"
          value="Add product"
          className='btn btn-primary' />

        </form>

      </div>
    </div>
  )
}

export default Addproducts;