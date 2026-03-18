import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Makepayment = () => {
//destructure  the  details passed from the Get products
// the use loation  hook allows us to get/ destructure the properties passed from the previous component
const {product} = useLocation().state || {}

    // Declare the navigate hook
      const navigate =useNavigate()


// console.log("the details of the product passed are;" ,product)
 //specify the image base url
 const img_url = "https://ramogi-web.alwaysdata.net/static/images/"

//  initialize hooks to manage the state of your application
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    //create a function that will handle the submit function
    const handlesubmit =async(e) =>{
        //prevent site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)
        try {
            // create  a formdata hook
            const formdata = new FormData()

            // append the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response= await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment",formdata)

            //set loading back to default
            setLoading(false)

            //update the success hook
            setSuccess(response.data.message)

        } catch (error) {
      //set the loading hook back to default
      setLoading(false);
      
      //update the setError with amessage
      setError(error.message)

        }
    }

  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-primary'>Back to Products</button> */}
        <h1 className='text-success text-center'>Make Payment- Lipa na Mpesa</h1>

        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="Back"
            onClick={ () => navigate("/")} />
        </div>

        <div className="card shadow p-4 col-md-6">
            <img src={img_url + product.product_photo} alt="Product name" className='product_img' />

            <div className="card-body">
                <h2 className="text-info">{product.product_name}</h2>

                <p className="text-dark">{product.product_description}</p>

                <h3 className="text-warning">Kes {product.product_cost}</h3> <br /> 

                <form onSubmit={handlesubmit}>

                 {/* bind the loading hook */}
              {loading && <Loader />}
               <h3 className="text-success"> {success} </h3>
              <h4 className="text-danger"> {error} </h4>

                    <input type="number"
                    className='form-control'
                    placeholder='Enter the Phone number 254xxxxxxxxxx'
                    required
                    onChange={(e) =>setNumber(e.target.value)} /> <br />

                    {/* {number} */}

                    <input type="submit"
                    value="Make payment"
                    className='btn btn-success' />
                </form>
            </div>
        </div>

    </div>
  )
}

export default Makepayment