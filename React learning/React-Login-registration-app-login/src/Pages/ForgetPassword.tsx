import React, { FC, ReactElement } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../style/login.css'
import { Link } from "react-router-dom";

interface FormBannerProps {
  image: string;
}

const ForgetPassword: React.FC<FormBannerProps> = (props) => {

  
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-5 main-form">
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
                />
              </Form.Group>
              <Button className="form-btn" variant="primary" type="submit">
                Submit
              </Button>
              <div className="sign-up-link">
                <p>Not a member?
                   <span><Link to="/signUp"> Sign up</Link></span>
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









// import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import '../style/login.css'

// interface formBannerProps{
//   image:JSX.Element
// }

// const ForgetPassword: React.FC<formBannerProps> = (props) => {
//   return (
//     <div>
//       <div className="container ">
//         <div className="row">
//           <div className="form-wrapper">
//             <div className="col-md-5 form-banner">
//               <img src={props.image} alt="loading"></img>
//             </div>
//             <Form className=" col-md-4">
//               <h3 className="text-start">Forget Your Password</h3>
//               <p className="text-start border-bottom">
//                 Enter the email address assciated with your account and We'll
//                 help you to reset password.
//               </p>

//               <Form.Group className="mb-3 form-field">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="xyz@gmail.com"
//                 />
//               </Form.Group>

//               <Button className="form-btn" variant="primary" type="submit">
//                 Submit
//               </Button>
//               <div className="sign-up-link">
//                 <p>
//                   Already a member?
//                   <a href="forget.html" className="link-underline-light ">
//                     Login now
//                   </a>
//                 </p>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
