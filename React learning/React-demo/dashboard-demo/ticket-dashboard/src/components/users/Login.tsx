import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import formBanner from "../../banner/form-banner-1.jpg";
import "../../styles/form.css";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



interface FormValues {
    email?: string;
    password?: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});


const Login: React.FC<{}> = () => {
    const navigate = useNavigate();

    const HandleSubmitForm = async (Values: FormValues) => {
        try {
            const response = await fetch("http://localhost:3001/users");
            const users = await response.json();
            const loggedInUser = users.find(
                (users: FormValues) => users.email === Values.email && users.password === Values.password
            );
            if (loggedInUser) {
                sessionStorage.setItem('loginUser', JSON.stringify(loggedInUser))
                navigate("/dashboard")
            }
        } catch (error) {
            console.log("error getting user", error);
        }


    }

    const initialValues: FormValues = {
        email: "",
        password: "",
    };

    return (
        <div className="container-fluid form-body">
            <div className="row user-form">
                <div className="col-md-6 form-size form-banner">
                    <div className="form-banner">
                        <img className="img-fluid form-image" src={formBanner} alt="loading" />
                    </div>
                </div>
                <div className="col-md-4 form-size">
                    <div className="main-form">
                        <h1>Login</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={LoginSchema}
                            onSubmit={HandleSubmitForm}
                        >

                            {({ errors, touched }) => (

                                <Form className="signup-form">
                                    <div className="form-field">
                                        <label htmlFor="email">Email</label>
                                        <Field id="email" name="email" placeholder="" type="email" />
                                        {errors.email && touched.email ? (<div className="error-text">{errors.email}</div>) : null}
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="password">Password</label>
                                        <Field id="password" name="password" placeholder="" />
                                        {errors.password && touched.password ? (<div className="error-text">{errors.password}</div>) : null}
                                    </div>

                                    <button type="submit" className="btn form-btn">Login</button>
                                    <div className="sign-up-link">
                                        <p>
                                            Not a member?
                                            <span>
                                                <Link to="/registration"> Registration</Link>
                                            </span>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
