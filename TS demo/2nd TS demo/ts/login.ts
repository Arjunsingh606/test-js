let loginEmail = document.getElementById("email") as HTMLInputElement;
let loginPassword = document.getElementById("password") as HTMLInputElement;
let loginForm = document.getElementById("submit-form") as HTMLFormElement;
let allUserDetail: UserData[] = [];

interface UserData {
  email: string;
  password: string;
  roles: string;
}

const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/user");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.status, "response");
    const userInfo = await response.json();
    allUserDetail = userInfo;
  } catch (error) {
    console.error(error);
  }
};
getUserData();


loginForm.addEventListener("submit", (e:any) => {
  e.preventDefault();
  loginFormValidation();

  const loginUser = allUserDetail.find((user:UserData) => user.email === loginEmail.value )
  if (loginUser && loginUser.password === loginPassword.value) {
    sessionStorage.setItem("currentUser", loginUser.email);
    sessionStorage.setItem("role", loginUser.roles);
    window.location.href = "index.html";
  } else {
    return false;
  }
});

// validation part
const showError = (element: HTMLInputElement, message: string) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const removeError = (element: HTMLInputElement) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const loginFormValidation = (values: string = "default") => {

  allUserDetail.forEach((item:any) => {
    if (values == "email" || values == "default") {
      if (!loginEmail.value) {
        showError(loginEmail, "Email can't be blank");
      } else {
        const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!checkEmail.test(String(loginEmail.value).toLowerCase())) {
          showError(loginEmail, "Invalid email");
        }
      }
      if (loginEmail.value === item.email) {
        removeError(loginEmail);
      }
    }

    if (values == "password" || values == "default") {
      if (!loginPassword.value) {
        showError(loginPassword, "Password can't be blank");
      } else {
        const checkPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!checkPassword.test(loginPassword.value.trim())) {
          showError(loginPassword, "Enter correct password");
        }
      }
      if (loginPassword.value === item.password) {
        removeError(loginPassword);
      }
    }
  });
};