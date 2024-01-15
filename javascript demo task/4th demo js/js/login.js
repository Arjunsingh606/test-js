let loginEmail = document.getElementById("email");
let loginPassword = document.getElementById("password");
let loginButton = document.getElementById("login-btn");
let loginForm = document.getElementById("submit-form");
let allUserDetail = [];

const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/user");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userInfo = await response.json();
    userInfo.map((item) => {
      allUserDetail.push(item);
    });
  } catch (error) {
    console.error(error);
  }
};
getUserData();

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fromValidation();

  const user = allUserDetail.find((user) => user.email === loginEmail.value);

  if (user && user.password === loginPassword.value) {
    sessionStorage.setItem("currentUser", user.email);
    sessionStorage.setItem("role", user.roles);
    window.location.href = "index.html";
  } else {
    return false
  }
});

// validation part
const fromValidation = (values='temp') => {
  allUserDetail.find((item) => {
  
    if (values == "email" || values=='temp') {
      if (!loginEmail.value) {
        setError(email, "Email can't be blank");
      } else {
        const checkEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!checkEmail.test(String(email.value).toLowerCase())) {
          setError(email, "Invalid email");
        }
      }
      if (loginEmail.value === item.email) {
        setSuccess(email, "");
      }
    }

    if (values == "password" || values=='temp') {
      if (!loginPassword.value) {
        setError(password, "Password can't be blank");
      } else {
        const checkPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!checkPassword.test(password.value.trim())) {
          setError(password, "enter correct password");
        }
      }
      if (loginPassword.value === item.password) {
        setSuccess(password, "");
      }
      
    }
 
  });
};

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
