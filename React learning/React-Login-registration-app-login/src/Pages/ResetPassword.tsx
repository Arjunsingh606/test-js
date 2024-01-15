import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css"
import { Link } from "react-router-dom";

interface formBannerProps{
  image:string
}


const ResetPassword:React.FC<formBannerProps>= (props) => {
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className=" form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-5 main-form">
            <Form >
              <h3 className="text-start">Reset Password</h3>

              <Form.Group
                className="mb-3 form-field"
              >
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="text"
                  name="reset-password"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-field"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="text"
                  name="reset-password"
                  placeholder=""
                />
              </Form.Group>

              <Button className="form-btn" variant="primary" type="submit">
                Submit
              </Button>
              <div className="sign-up-link">
                <p>
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

export default ResetPassword;
