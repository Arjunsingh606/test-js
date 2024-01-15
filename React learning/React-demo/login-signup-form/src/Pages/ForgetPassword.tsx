import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

interface FormBannerProps {
  image: string;
}

const ForgetPassword: React.FC<FormBannerProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggedInUser = user.find((user) => user.email === email);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
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
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await dispatch(loginUser());

      if (loggedInUser) {
        const userId: any = loggedInUser.id;
        sessionStorage.setItem("userId", userId);
        navigate('/otp');
      } else {
        console.log("This email is not registered ! try with valid email");
      }
    }
  };

  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-3 main-form">
              <Form>
                <h3 className="text-start">Forget Your Password</h3>
                <p className="text-start border-bottom">
                  Enter the email address associated with your account and We'll
                  help you to reset password.
                </p>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </Form.Group>
                <Button
                  onClick={handleSubmit}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Submit
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
    </div>
  );
};

export default ForgetPassword;
