import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppDispatch , useAppSelector} from "../store/hooks";
// import { setUser } from '../store/userSlice';
import { userPostData } from "../store/userSlice";
// import { UserForm } from "../store/userSlice";
import "../style/login.css";
import { Link } from "react-router-dom";

interface formBannerProps{
  image:string,
}

const SignUp:React.FC<formBannerProps> = (props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmitBtn = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData:any= { firstName, lastName, email, password, confirmPass };
    // dispatch(setUser(formData)); 
    try {
      await dispatch(userPostData(formData)); 
      console.log(formData, 'Data saved successfully');
    } catch (error) {
      console.error('----Error while saving data----:', error);
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img className="img-fluid" src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-5 main-form">
            <Form className=" ">
              <h3 className="text-start">SignUp</h3>
              <Form.Group className="mb-3 form-field">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="LastName"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3 form-field">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="LastName"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3 form-field">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                />
              </Form.Group>
              <Form.Group className="mb-3 form-field">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3 form-field">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  type="password"
                  name="confirm-password"
                  placeholder=""
                />
              </Form.Group>
              <Button
                onClick={handleSubmitBtn}
                className="form-btn"
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="sign-up-link">
               
                  Already a member?
                 <span><Link to="/"> Login now </Link></span>
             
              </div>
            </Form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;


























