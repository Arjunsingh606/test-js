const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-input error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-input success";
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Enail is not valid");
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});





// nbxvjjjjjmhghnbcnxvcnbnxvcbnxvcdghh

const userDetailsArr = JSON.parse(localStorage.getItem("user")) || [];

// let userName = document.querySelector("#name");
// let email = document.querySelector("#email").value.trim();
// let phoneNumber = document.querySelector("#phone").value.trim();
// let selectButton = document.querySelector("#selectButton").value;

// let genderRadios;

// const radioButtons = document.querySelectorAll('input[type="radio"]');
// radioButtons.forEach((radioButton) => {
//   if (radioButton.checked) {
//     genderRadios = radioButton.getAttribute("value");
//   }
// });

const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", setInput);

function setInput(e) {
  e.preventDefault();

  let userName = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let phoneNumber = document.querySelector("#phone").value.trim();
  let selectPosition = document.querySelector("#selectButton").value;

  let genderRadios;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      genderRadios = radioButton.getAttribute("value");
    }
  });

  if (!userName) {
    const inputName = document.querySelector(".input-form");
    inputName.classList.add("error");
    const error = document.querySelector("#error-msg");
    error.innerHTML = "username is required";
    error.style.color = "red";
  } else {
    let regName = /^[a-zA-Z]+$/;
    if (!regName.test(userName)) {
      const error = document.querySelector("#error-msg");
      error.innerHTML = "username not right";
      error.style.color = "red";
      return false;
    } else {
      const inputName = document.querySelector(".input-form");
      inputName.classList.add("success");
      const error = document.querySelector("#error-msg");
      error.style.display = "none";
    }
  }

  if (!email) {
    const emailInput = document.querySelector("#email");
    emailInput.classList.add("error");
    const error = document.querySelector("#error-email");
    error.innerHTML = "Email is required";
    error.style.color = "red";
  } else {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!mailformat.test(email)) {
      const error = document.querySelector("#error-email");
      error.innerHTML = "Invalid email";
      error.style.color = "red";
      return false;
    } else {
      const emailInput = document.querySelector("#email");
      emailInput.classList.add("success");
      const error = document.querySelector("#error-email");
      error.style.display = "none";
    }
  }

  if (phoneNumber === "") {
    const phoneInput = document.querySelector("#phone");
    phoneInput.classList.add("error");
    const error = document.querySelector("#error-phone");
    error.innerHTML = "Phone number is required";
    error.style.color = "red";
  } else {
    const phoneFormat = /^(0|91)?[6-9][0-9]{9}$/;
    if (!phoneFormat.test(phoneNumber)) {
      const error = document.querySelector("#error-phone");
      error.innerHTML = "Invalid phone Number";
      error.style.color = "red";
      return false;
    } else {
      const phoneInput = document.querySelector("#phone");
      phoneInput.classList.add("success");
      const error = document.querySelector("#error-phone");
      error.style.display = "none";
    }
  }

  if (genderRadios == undefined) {
    const error = document.querySelector("#error-gender");
    error.innerHTML = "Select gender";
    error.style.color = "red";
  } else if (genderRadios !== "") {
    const error = document.querySelector("#error-gender");
    error.style.display = "none";
  }

  if (selectPosition === "") {
    const selectoptions = document.querySelector("#selectButton");
    selectoptions.classList.add("error");
    const error = document.querySelector("#error-select");
    error.innerHTML = "Select is required";
    error.style.color = "red";
  } else if (selectPosition !== "") {
    const selectoptions = document.querySelector("#selectButton");
    selectoptions.classList.add("success");
    const error = document.querySelector("#error-select");
    error.style.display = "none";
  }

  if (
    userName == "" ||
    email == "" ||
    phoneNumber == "" ||
    genderRadios == undefined ||
    selectPosition== ""
  ) {
    console.log("testing....");

    return false;
  } else {
    const userDetails = {
      userName,
      email,
      phoneNumber,
      genderRadios,
      selectPosition,
    };

    userDetailsArr.push(userDetails);
    userDetailsArr.map((user, index) => {
      user.id = index + 0;
    });
    // console.log(userDetails);
    // console.log(userDetailsArr);
    localStorage.setItem("user", JSON.stringify(userDetailsArr));
    resetFields()
  }
  displayData();
}

// for color and heading change for edit form
document.getElementById("addBtn").addEventListener("click", function () {
  document.getElementById("editLabel").style.display = "none";
  document.getElementById("update-btn").style.display = "none";
  document.getElementById("AddLabel").style.display = "block";
  document.getElementById("submit-btn").style.display = "block";
  document.getElementById("color").style.backgroundColor = "#212529";
  console.log("jsjdhfjsgjfhsg");
});

// printing data coming from local storage
function displayData() {
  document.getElementById("printData").innerHTML = userDetailsArr
    .map((item) => {
      return ` <tr>
  <td>${item.id}</td>
  <td>${item.userName}</td>
  <td>${item.email}</td>
  <td>${item.phoneNumber}</td>
  <td>${item.genderRadios}</td>
  <td>${item.selectButton}</td>
  <td class="delButton">
   <button onclick="updateUser(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn edit-btn " id="edit"><i class="fa-solid fa-pen"></i></button>
   <button onclick="deleteItem(${item.id})" class="btn del-btn "><i class="fa-solid fa-trash"></i></button>
  </td>
  </tr>`;
    })
    .join("");
}
displayData();

// delete an item
function deleteItem(item) {
  if (confirm("Are you sure to delete this record ?")) {
    const userDetailsArr = JSON.parse(localStorage.getItem("user"));
    const delItem = userDetailsArr.splice(item, 1);
    localStorage.setItem("user", JSON.stringify(userDetailsArr));
    console.log("deleted item", delItem);

    document.getElementById("printData").innerHTML = userDetailsArr
      .map((item) => {
        return ` <tr>
  <td>${item.id}</td>
  <td>${item.userName}</td>
  <td>${item.email}</td>
  <td>${item.phoneNumber}</td>
  <td>${item.genderRadios}</td>
  <td>${item.selectButton}</td>
  <td class="delButton">
   <button onclick="updateUser(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn edit-btn " id="edit"><i class="fa-solid fa-pen"></i></button>
   <button onclick="deleteItem(${item.id})" class="btn del-btn "><i class="fa-solid fa-trash"></i></button>
  </td>
  </tr>`;
      })
      .join("");
    // window.location.replace("index.html");
  }
}

// update form items
function updateUser(id) {
  document.getElementById("editLabel").style.display = "block";
  document.getElementById("editLabel").style.color = "#212121";
  const updatebutton = document.getElementById("update-btn");
  updatebutton.style.display = "block";
  document.getElementById("update-btn").style.color = "#212121";

  document.getElementById("AddLabel").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.querySelector(".user-header").style.backgroundColor = "#fdac41";

  const userDetailsArr = JSON.parse(localStorage.getItem("user")) || [];

  document.querySelector("#name").value = userDetailsArr[id].userName;
  document.querySelector("#email").value = userDetailsArr[id].email;
  document.querySelector("#phone").value = userDetailsArr[id].phoneNumber;
  const genderRadioButtons = document.querySelectorAll('input[type="radio"]');
  genderRadioButtons.forEach((radioButton) => {
    if (radioButton.getAttribute("value") === userDetailsArr[id].genderRadios) {
      radioButton.checked = true;
    }
  });
  document.querySelector("#selectPosition").value =
    userDetailsArr[id].selectPosition;

  updatebutton.addEventListener("click", function (e, userDetails) {
    e.preventDefault();

    let editName = (userDetailsArr[id].userName =
      document.querySelector("#name").value);
    let editEmail = (userDetailsArr[id].email =
      document.querySelector("#email").value);
    let editPhone = (userDetailsArr[id].phoneNumber =
      document.querySelector("#phone").value);

    let editRadio = (userDetailsArr[id].genderRadios = document.querySelector(
      'input[name="gender"]:checked'
    ).value);

    let editPosition = (userDetailsArr[id].selectPosition =
      document.querySelector("#selectPosition").value);

    const newObj = {
      ...userDetails,
      userName: editName,
      email: editEmail,
      phoneNumber: editPhone,
      genderRadios: editRadio,
      selectPosition: editPosition,
    };
    console.log(newObj);
    localStorage.setItem("user", JSON.stringify(userDetailsArr));
    resetFields()
  });
}

// reset fields 
function resetFields() {
  document.querySelector("#name").value = "";
  document.querySelector("#email").value= "";
  document.querySelector("#phone").value= "";
  document.querySelector("#selectButton").value= "";
}
