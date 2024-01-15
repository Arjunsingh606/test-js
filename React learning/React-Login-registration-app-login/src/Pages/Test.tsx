// import React, { useState } from "react";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     roles: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     const checkName = /[a-zA-Z]/;
//     const checkEmail =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const checkPassword =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

//     // Validate First Name
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First Name is required";
//       isValid = false;
//     } else if (!checkName.test(formData.firstName)) {
//       newErrors.firstName = "Invalid first name";
//       isValid = false;
//     }

//     // Validate Last Name
//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last Name is required";
//       isValid = false;
//     } else if (!checkName.test(formData.lastName)) {
//       newErrors.lastName = "Invalid last name";
//       isValid = false;
//     }

//     // Validate Email
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!checkEmail.test(formData.email.toLowerCase())) {
//       newErrors.email = "Invalid email";
//       isValid = false;
//     }

//     // Check if email already exists (assuming allUserDetail is a state variable)
//     const alreadyExists = allUserDetail.some((item) => item.email === formData.email);
//     if (alreadyExists) {
//       newErrors.email = "Email already exists";
//       isValid = false;
//     }

//     // Validate Password
//     if (!formData.password.trim()) {
//       newErrors.password = "Create Password";
//       isValid = false;
//     } else if (!checkPassword.test(formData.password.trim())) {
//       newErrors.password = "Choose a strong password, like Apple@929";
//       isValid = false;
//     }

//     // Validate Roles
//     if (!formData.roles) {
//       newErrors.roles = "Choose role";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform form submission only if validation passes
//     if (validateForm()) {
//       // Add logic to handle form submission
//       console.log("Form submitted successfully:", formData);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         {errors.firstName && <span>{errors.firstName}</span>}
//       </div>

//       <div>
//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         {errors.lastName && <span>{errors.lastName}</span>}
//       </div>

//       <div>
//         <label>Email:</label>
//         <input
//           type="text"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors.email && <span>{errors.email}</span>}
//       </div>

//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors.password && <span>{errors.password}</span>}
//       </div>

//       <div>
//         <label>Roles:</label>
//         <select name="roles" value={formData.roles} onChange={handleChange}>
//           <option value="">Select Role</option>
//           {/* Add options for roles */}
//         </select>
//         {errors.roles && <span>{errors.roles}</span>}
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default RegisterForm;
