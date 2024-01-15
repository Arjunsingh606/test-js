const loginUserData = JSON.parse(localStorage.getItem("user"));

let loginButton = document.getElementById("login-btn");
let errorInvalid = document.getElementById("error-invalid");

loginButton.addEventListener("click", userLogin);

function userLogin(e) {
  e.preventDefault();

  let userData = loginUserData.filter((item) => {
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;

    if (!loginEmail) {
      showError(document.getElementById("email"), "Email is required");
    } else if (loginEmail === item.email) {
      setSuccess(document.getElementById("email"), "");
    } else {
      showError(document.getElementById("email"), "invalid");
    }

    if (loginPassword == "") {
      showError(password, "Password is required");
    } else if (loginPassword !== item.password) {
      showError(password, " Invalid Password");
    } else {
      setSuccess(password);

      return true;
    }

    return item.email === loginEmail && item.confirmPassword === loginPassword;
  });

  if (userData.length === 1) {
    sessionStorage.setItem("data", JSON.stringify(userData));
    window.location.replace("index.html");
  }
}

// validation part
const showError = (element, message) => {
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
  // inputControl.classList.add("success");
  inputControl.classList.remove("error");
};
