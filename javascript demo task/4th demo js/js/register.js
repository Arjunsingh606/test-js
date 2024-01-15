let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let roles = document.getElementById("roles");
let formData = document.getElementById("submit-form");
let allUserDetail = [];
let alreadyExits = false;

const getAllUser = async () => {
  try {
    const allUser = await fetch("http://localhost:3000/user");
    if (!allUser.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userInfo = await allUser.json();
    userInfo.map((item) => {
      allUserDetail.push(item);
    });
  } catch (error) {
    console.error(error);
  }
};
getAllUser();


let userRegistrationObj = {};

const userRegistration = async (event) => {
  event.preventDefault();
  registerFormValidation();

  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !roles.value
  ) {
    return false;
  } else {
    payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      roles: roles.value,
    };

    try {
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        resetField() // check this line
        // .then((data) => data && ); // check this line
    } catch (error) {
      console.error(error);
    }
    sessionStorage.setItem("currentUser", data.email);
    sessionStorage.setItem("role", data.roles);
  }
};

formData.addEventListener("submit", userRegistration);

// validation part
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const registerFormValidation = (values = "temp") => { // change temp variable name

  if (values == "fName" || values == "temp") {
    if (!firstName.value.trim()) {
      setError(firstName, "Please enter your first name");
    } else {
      const checkName = /[a-zA-Z]/;
      if (!checkName.test(String(firstName.value))) {
        setError(firstName, "Invalid first name");
        return false;
      } else if (checkName.test(String(firstName.value))) {
        setSuccess(firstName);
      }
    }
  }

  if (values == "lName" || values == "temp") {
    if (!lastName.value.trim()) {
      setError(lastName, "Please enter your last name ");
    } else {
      const checkName = /[a-zA-Z]/;
      if (!checkName.test(String(lastName.value))) {
        setError(lastName, "Invalid last name");
      } else if (checkName.test(String(lastName.value))) {
        setSuccess(lastName);
      }
    }
  }

  if (values == "email" || values == "temp") {
    if (!email.value.trim()) {
      setError(email, "Please enter your email");
    } else {
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmail.test(String(email.value).toLowerCase())) {
        setError(email, "please enter a valid email address");
      }
      if (email.value) {
        allUserDetail.find((item) => {
          if (email.value === item.email) {
            setError(
              email,
              "An account using this email address already exist"
            );
            alreadyExits = true;
          }
        });
      }
      if (!alreadyExits) {
        if (checkEmail.test(String(email.value).toLowerCase())) {
          setSuccess(email);
        }
      }
    }
  }

  if (values == "password" || values == "temp") {
    if (!password.value.trim()) {
      setError(password, "Please enter password");
    } else {
      const checkPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (!checkPassword.test(password.value.trim())) {
        setError(password, "Please Choose a strong password, min length 8 character");
      } else if (checkPassword.test(password.value.trim())) {
        setSuccess(password);
      }
    }
  }

  if (values == "roles" || values == "temp") {
    if (!roles.value) {
      setError(roles, "Please select role");
    } else if(roles.value){
      setSuccess(roles);
    }
    
  }
};

//reset all field
const resetField = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  roles.value = "";

  window.location.replace("index.html");
};
