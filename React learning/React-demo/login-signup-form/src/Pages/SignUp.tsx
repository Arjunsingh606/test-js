import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../store/hooks";
import { userPostData } from "../store/userSlice";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginUser } from "../store/userSlice";

interface formBannerProps {
  image: string;
}

const SignUp: React.FC<formBannerProps> = (props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const userData = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    dispatch(loginUser());
  }, [loginUser]);

  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmail.test(String(email).toLowerCase())) {
        newErrors.email = "Invalid format of  email address ";
      }
      if (email) {
        userData.find((user) => {
          if (user.email === email) {
            newErrors.email =
              "This email is already exist ! try with different email";
          }
        });
      }
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const checkPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!checkPassword.test(password)) {
        newErrors.password = " Passwords should be like 'test@1234' ";
      }
    }

    if (!confirmPass.trim()) {
      newErrors.confirmPass = "Password is required";
    }
    if (confirmPass !== password) {
      newErrors.confirmPass = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    switch (fieldName) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPass":
        setConfirmPass(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData: any = { firstName, lastName, email, confirmPass };

      try {
        await dispatch(userPostData(formData));

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        alert("Registration is successfull, You can login now");
      } catch (error) {
        console.error("Error while saving data", error);
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
            <Form className=" ">
              <h3 className="text-start">SignUp</h3>
              <Form.Group className="form-field">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  type="text"
                  name="firstName"
                  placeholder=""
                />
                <span className="error-text">{errors.firstName}</span>
              </Form.Group>
              <Form.Group className="form-field">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  type="text"
                  name="lastName"
                  placeholder=""
                />
                <span className="error-text">{errors.lastName}</span>
              </Form.Group>
              <Form.Group className="form-field">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  type="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                />
                <span className="error-text">{errors.email}</span>
              </Form.Group>
              <Form.Group className="form-field">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  type="password"
                  name="password"
                  placeholder=""
                />
                <span className="error-text">{errors.password}</span>
              </Form.Group>
              <Form.Group className="form-field">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={confirmPass}
                  onChange={(e) =>
                    handleFieldChange("confirmPass", e.target.value)
                  }
                  type="password"
                  name="confirmPass"
                  placeholder=""
                />
                <span className="error-text">{errors.confirmPass}</span>
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
                <span>
                  <Link to="/"> Login now </Link>
                </span>
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
