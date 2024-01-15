let firstName = document.getElementById("first-name") as HTMLInputElement;
let lastName = document.getElementById("last-name") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let password = document.getElementById("password") as HTMLInputElement;
let roles = document.getElementById("roles") as HTMLInputElement;
let formSubmit = document.getElementById("submit-form") as HTMLFormElement;
const getAllUserDetails: string[] = [];
let alreadyExits: boolean = false;

interface user {
  firstName: string;
  lastName: string;
  email: string ;
  password: string;
  roles: string;
  id?: number;
  
}

formSubmit.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  registerFormValidation();

  const fName = firstName.value;
  const lName = lastName.value;
  const emailValue = email.value;
  const passwordVaue = password.value;
  const rolesValue = roles.value;

  if (!fName || !lName || !emailValue || !passwordVaue || !rolesValue) {
    return false;
  } else {
    const payload: user = {
      firstName: fName,
      lastName: lName,
      email: emailValue,
      password: passwordVaue,
      roles: rolesValue,
      
    };

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        resetField();
        sessionStorage.setItem("currentUser", data.email);
        sessionStorage.setItem("role", data.roles);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

const getAllUser = async () => {
  try {
    const allUser = await fetch("http://localhost:3000/user");
    if (!allUser.ok) {
      throw new Error(`HTTP error! status: ${allUser.status}`);
    }
    const userInfo = await allUser.json();
    userInfo.forEach((item: string) => {
      getAllUserDetails.push(item);
    });
  } catch (error) {
    console.error(error);
  }
};
getAllUser();

// validation part
const setError = (element: HTMLInputElement, message: string) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const setSuccess = (element: HTMLInputElement) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const registerFormValidation = (values: string = "default") => {
  if (values == "fName" || values == "default") {
    if (!firstName.value) {
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

  if (values == "lName" || values == "default") {
    if (!lastName.value) {
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

  if (values == "email" || values == "default") {
    if (!email.value) {
      setError(email, "Please enter your email");
    } else {
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!checkEmail.test(String(email.value).toLowerCase())) {
        setError(email, "please enter a valid email address");
      }
      if (email.value) {
        getAllUserDetails.find((item:any) => {
          if (email.value === item.email) {
            setError(email, "An account using this email address already exist");
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

  if (values == "password" || values == "default") {
    if (!password.value) {
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

  if (values == "roles" || values == "default") {
    if (!roles.value) {
      setError(roles,"Please select role");
    } else if(roles.value){
      setSuccess(roles);
    }
  
  }
};


// reset all field
const resetField = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  roles.value = "";
  
  window.location.replace("index.html");
};
