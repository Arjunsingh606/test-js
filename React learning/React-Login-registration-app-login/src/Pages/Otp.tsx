import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";

interface formBannerProps{
  image:string
}

const Otp:React.FC<formBannerProps> = (props) => {

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };



  return (
    <>
     <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-5 main-form">
            <Form >
              <h3 className="text-start">OTP verification</h3>
           
              <Form.Group
                className="mb-3 form-field"
                controlId="formBasicEmail"
              >
                <Form.Label>Enter 6 digit OTP</Form.Label>
                <Form.Control type="text" name="otp"  placeholder=""/>
              </Form.Group>
              
              <Button className="form-btn" variant="primary" type="submit">
                Submit
              </Button>
              <div className="sign-up-link">
                <p >
                  Not a member?
               
                  <span><Link to="/signUp"> Sign up</Link></span>  
               
                </p>
              </div>
            </Form>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
