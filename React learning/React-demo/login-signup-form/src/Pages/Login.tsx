import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

interface formBannerProps {
  image: string;
}

const Login: React.FC<formBannerProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const user = useAppSelector((state: RootState) => state.user.data);
  const loggedInUser = user.find((user) => user.email === email && user.confirmPass === password);
 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmail.test(String(email).toLowerCase())) {
        newErrors.email = "Invalid format of email address ";
      }
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const checkPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!checkPassword.test(password)) {
        newErrors.password = "Enter correct password";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    switch (fieldName) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await dispatch(loginUser());
      if (loggedInUser) {
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userPassword", password);
        navigate('/home');
      }
    }
  };

  return (
    <>
     <div className="container-fluid form-body">
        <div className="row user-form">
          <div className="col-md-6 form-size form-banner">
            <div className="form-banner">
              <img className="img-fluid" src={props.image} alt="loading" />
            </div>
          </div>
          <div className="col-md-4 form-size">
          <div className=" main-form">
              <Form>
                <h3 className="text-start">Login</h3>
                <p className="text-start border-bottom">
                  Enter your credentials to access your account
                </p>
                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                  <span className="error-text">{errors.email}</span>
                </Form.Group>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicPassword"
                >
                  <div className="password-title">
                    <Form.Label>Password</Form.Label>
                    <p>
                      <Link to="/forgetPassword"> Forget Password?</Link>
                    </p>
                  </div>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=""
                    value={password}
                    onChange={(e) =>
                      handleFieldChange("password", e.target.value)
                    }
                  />
                  <span className="error-text">{errors.password}</span>
                </Form.Group>

                <Button
                  onClick={handleLogin}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
                <div className="sign-up-link">
                  <p>
                    Not a member?
                    <span>
                      <Link to="/signUp"> Sign up</Link>
                    </span>
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

export default Login;
