const registerFormArr = JSON.parse(localStorage.getItem("user")) || [];

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let submitButton = document.getElementById("submit-btn");
let randomNumber = Date.now()

const userRegister = (event)=> {
  event.preventDefault();
  registerFormValidation();

  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    return false;
  } else {
    if (!confirmPassword.value.trim()) {
      setError(confirmPassword, "Create Password");
    } else if (confirmPassword.value.trim() !== password.value.trim()) {
      setError(confirmPassword, "Password does not match");
    } else {
      setSuccess(confirmPassword);

      const registraionObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        confirmPassword: confirmPassword.value,
        userId:randomNumber
      };
      registerFormArr.push(registraionObj);
      registerFormArr.map((user, index) => {
        user.id = index + 1;
      });
      localStorage.setItem("user", JSON.stringify(registerFormArr));
      resetField();
      alert("register successfully, you can login now!!");
    }
  }
}
submitButton.addEventListener("click", userRegister);
// validation part
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const lebalDisplay = inputControl.querySelector(".form-label");
  lebalDisplay.style.color = "black";
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};

const registerFormValidation = () => {
  if (!firstName.value.trim()) {
    setError(firstName, "First Name is required");
  } else {
    const checkName = /[a-zA-Z]/;
    if (!checkName.test(String(firstName.value))) {
      setError(firstName, "Invalid  first name");
    } else {
      setSuccess(firstName);
    }
  }

  if (!lastName.value.trim()) {
    setError(lastName, "Last Name is required");
  } else {
    const checkName = /[a-zA-Z]/;
    if (!checkName.test(String(lastName.value))) {
      setError(lastName, "Invalid  last name");
    } else {
      setSuccess(lastName);
    }
  }

  if (!email.value.trim()) {
    setError(email, "Email is required");
  } else {
    const checkEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!checkEmail.test(String(email.value).toLowerCase())) {
      setError(email, "Invalid email");
    } else {
      setSuccess(email);
      return true;
    }
  }

  if (!confirmPassword.value.trim()) {
    setError(confirmPassword, "Create Password");
  } else if (confirmPassword.value.trim() !== password.value.trim()) {
    setError(confirmPassword, "Password does not match");
  } else {
    setSuccess(confirmPassword);
    return true;
   
  }

  if (!password.value.trim()) {
    setError(password, " Create Password");
  } else {
    const checkPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!checkPassword.test(password.value.trim().toLowerCase())) {
      setError(password, "Choose strong password, like Apple@929");
     
    } else {
      setSuccess(password);
      return true;
    }
  }
};

//reset all field
const resetField = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";

  setTimeout(() => {
    window.location.replace("login.html");
  }, 1000);
};
