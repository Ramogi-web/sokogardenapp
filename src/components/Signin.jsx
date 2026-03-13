import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  // Define the two hooks for capturing /storing the users inputs
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");

  //Declare three addiyional hooks
  const [loading, setLoading] =useState("");
  const [success, setSuccess] =useState("");
  const [error, setError] =useState("");

  //below we have the useNavigate hook to redirect us to another page on success login/signin
  const navigate =useNavigate()

  // function to handle the sign in action
  const handlesubmit =async (e) =>{
    //prevent the site fro reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we auntheticate your account..")

    try {
      // create a form data object that will hold the email nad password
      const formdata = new FormData()

      // insert /append email and password
      formdata.append("email",email);
      formdata.append("password", password);

      //interact with the axios for the responce
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      //set the loading book back default
      setLoading("");

      // CHECK whether the user exists as part of your response
      if(response.data.user){
        // if user is there details entered are correct
        //setSuccess("Log in successful")
        // if it is successful let a person get redirected to another page
        navigate("/");
      }
      else{
        //user  not there definately thre details are incorrect
        setError("Login failed. Please try again..")
      }
   
    } catch (error) {
      // set loading back to default
      setLoading("");
      
      //update the error with a message
      setError("Oops, something went wrong .Try again..")
      
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
        <div className="col-md-6 card shadow p-4">
          <h1 className='text-primary text-center'>Sign In</h1>

          <h5 className='text-info'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className="text-danger">{error}</h4>
          
          
          <form onSubmit={handlesubmit}>
            <input type="email"
            placeholder='Enter the email address here'
            className='form-control'
            required
            value={email}
            onChange={(e) =>setEmail(e.target.value)} /> <br />

            {/*email*/}

            <input type="password"
            placeholder='Enter the password here'
            className='form-control'
            required
            value={password}
            onChange={(e) =>setPassword(e.target.value)} /> <br />

            {/*password*/}

            <input type="submit"
            value="Signin"
            className='btn btn-primary form-control' />
          </form>

        </div>
    </div>
  )
}

export default Signin;