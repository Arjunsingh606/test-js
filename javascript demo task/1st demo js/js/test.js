// const form  = document.querySelector("#form");

// form.addEventListener("submit", function(e){
//   e.preventDefault();
//   setInput();
// })

const userDetailsArr = JSON.parse(localStorage.getItem("user")) || [];

const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", setInput);

function setInput(e) {
  e.preventDefault();

  const userName = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phoneNumber = document.querySelector("#phone").value.trim();
  const selectButton = document.querySelector("#selectButton").value;
  // const genderRadios = document.querySelector(
  //   'input[name="gender"]:checked'
  // ).value;


  const userDetails = {
    userName,
    email,
    phoneNumber,
    // genderRadios,
    selectButton,
  };
  userDetailsArr.push(userDetails);
  userDetailsArr.map((user, index) => {
    user.id = index + 1;
  });
  console.log(userDetails);
  console.log(userDetailsArr);
  localStorage.setItem("user", JSON.stringify(userDetailsArr));
  displayData();

  if(userName === ""){
  //  showError(userName, "username is required")
  document.getElementById("name-error").innerHTML="username is required"
  }
  // else{
  //   showSuccess(userName)
  // }

  if(email === ""){
    //  showError(userName, "username is required")
    document.getElementById("email-error").innerHTML="email is required"
    }

  // if(phoneNumber === ""){
  //   showError(phoneNumber, "Phone is required")
  // }else{
  //   showSuccess(phoneNumber)
  // }
 
  
}

function showError( message){
  const formInput = document.querySelector(".form-input");
  formInput.className = "form-input error";
  const small = formInput.querySelector("small");
  small.innerText = message;
}
// function showSuccess( message){
//   const formInput = document.querySelector(".form-input");
//   formInput.className = "form-input success";
// }

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
  <td class="delButton"> <button class="btn edit-btn "><i class="fa-solid fa-pen"></i></button> <button onclick="deleteItem(${item.id})" class="btn del-btn "><i class="fa-solid fa-trash"></i></button> </td>
  </tr>`;
    })
    .join("");
}
displayData();

//validation part

// delete an item
function deleteItem(item) {
  if (confirm("Are you sure to delete this record ?")) {
    const userDetailsArr = JSON.parse(localStorage.getItem("user"));
    const delItem = userDetailsArr.splice(item, 1);
    localStorage.setItem("user", JSON.stringify(userDetailsArr));
    console.log(delItem);
  }
}


if (phoneNumber === "") {
  const phoneInput = document.querySelector("#phone");
  phoneInput.classList.add("error");
  const error = document.querySelector("#error-phone");
  error.innerHTML = "Phone number is required";
  error.style.color = "red"
} else if (phoneNumber !== "") {
  const phoneInput = document.querySelector("#phone");
  phoneInput.classList.add("success");
  const error = document.querySelector("#error-phone");
  error.style.display = "none"
}

if (selectButton === "Select Position") {
  const selectoptions = document.querySelector("#selectButton");
  selectoptions.classList.add("error");
  const error = document.querySelector("#error-select");
  error.innerHTML = "Select Option";
  error.style.color = "red"
} else  if (selectButton !== "") {
  const selectoptions = document.querySelector("#selectButton");
  selectoptions.classList.add("success");
  const error = document.querySelector("#error-select");
  error.style.display = "none"
}




for (i = 0; i < genderRadios.length; i++) {
  if (genderRadios[i].checked) {
    var genderValue = genderRadios[i].value;

  }
}


function showError(message) {
  console.log(message);
  const formInput = document.querySelectorAll(".form-input");
  formInput.forEach((item) => {
    item.className = "form-input error";
  });
  const small = document.querySelectorAll(".error-msg");
  small.forEach((item) => {
    item.classList.add("small-error");
    item.innerHTML = message;
  });
}
function showSuccess() {
  const formInput = document.querySelector(".form-input");
  formInput.className = "form-input success";
}
function validateForm() {
  let userName = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let phoneNumber = document.querySelector("#phone").value.trim();
  let selectPosition = document.querySelector("#selectPosition").value;

  let genderRadios;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      genderRadios = radioButton.getAttribute("value");
    }
  });
  console.log("error");
  checkName();
  checkmail();
  if (!userName) {
    showError("Name is required");
  } else {
    let regName = /^[a-zA-Z]+$/;
    if (!regName.test(userName.value)) {
      showError("Name is not valid");
    } else {
      showSuccess(userName);
    }
  }

  if (!email) {
    showError("Email is required");
  } else {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
      showError("Invalid email");
    }else{
      showSuccess();
    }

  }
  if (!phoneNumber) {
    showError("Number is required");
  } else {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
   if(re.test(String(phone).toLowerCase())){
    showError("Invalid number");
   }else{
    showSuccess();
   }
  }
  if (!genderRadios) {
    showError("Select gender");
  } else {
    showSuccess();
  }
  if (!selectPosition) {
    showError("Select Position");
  } else {
    showSuccess();
  }
}




modalBg = document.getElementsByClassName("modal-backdrop")[0];
modalBg.style.display = "none";
closemodal.style.display = "none";


//erdgjhsgfjhsdgfjhdgjh backup
let userFormArray = JSON.parse(localStorage.getItem("user")) || [];
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", setInput);
const closemodal = document.getElementById("exampleModal");
let modalBg;

function setInput(e) {
  e.preventDefault();
  let userName = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let phoneNumber = document.querySelector("#phone").value.trim();
  let selectPosition = document.querySelector("#selectPosition").value;

  let genderRadios;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      genderRadios = radioButton.getAttribute("value");
    }
  });

  validateForm();

  if (
    userName === "" ||
    email === "" ||
    phoneNumber === "" ||
    genderRadios === undefined ||
    selectPosition === ""
  ) {
    return false;
  } else {
    const formValuesObj = {
      userName,
      email,
      phoneNumber,
      genderRadios,
      selectPosition,
    };

    userFormArray.push(formValuesObj);
    userFormArray.map((user, index) => {
      user.id = index + 1;
    });
    localStorage.setItem("user", JSON.stringify(userFormArray));
    resetFields();
   
  }
  displayData();
}

// for color and heading change for edit form
document.getElementById("addBtn").addEventListener("click", function () {
  resetFields();
  document.getElementById("editLabel").style.display = "none";
  document.getElementById("update-btn").style.display = "none";
  document.getElementById("AddLabel").style.display = "block";
  document.getElementById("submit-btn").style.display = "block";
  document.getElementById("color").style.backgroundColor = "#212529";
});

// printing data coming from local storage
function displayData() {
  const userFormArray = JSON.parse(localStorage.getItem("user")) || [];
  document.getElementById("printData").innerHTML = userFormArray
    .map((item, index) => {
      // console.log(item);
      return ` <tr>
  <td>${index + 1}</td>
  <td>${item.userName}</td>
  <td>${item.email}</td>
  <td>${item.phoneNumber}</td>
  <td>${item.genderRadios}</td>
  <td>${item.selectPosition}</td>
  <td class="delButton">
   <button onclick="updateUser(${
     item.id
   })" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn edit-btn " id="edit"><i class="fa-solid fa-pen"></i></button>
   <button onclick="deleteItem(${
     item.id
   })" class="btn del-btn "><i class="fa-solid fa-trash"></i></button>
  </td>
  </tr>`;
    })
    .join("");
}
displayData();

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

  const userFormArray = JSON.parse(localStorage.getItem("user")) || [];
  if (id < 0 || id >= userFormArray.length) {
    return true;
  }
  let test = document.querySelector("#name");
  test.value = userFormArray[id].userName;
  document.querySelector("#email").value = userFormArray[id].email;
  document.querySelector("#phone").value = userFormArray[id].phoneNumber;
  const genderRadioButtons = document.querySelectorAll('input[type="radio"]');
  genderRadioButtons.forEach((radioButton) => {
    if (radioButton.getAttribute("value") === userFormArray[id].genderRadios) {
      radioButton.checked = true;
    }
  });
  document.querySelector("#selectPosition").value =
    userFormArray[id].selectPosition;

  updatebutton.addEventListener("click", function (e, formValuesObj) {
    e.preventDefault();
    validateForm();
    let editName = (userFormArray[id].userName =
      document.querySelector("#name").value);
    let editEmail = (userFormArray[id].email =
      document.querySelector("#email").value);
    let editPhone = (userFormArray[id].phoneNumber =
      document.querySelector("#phone").value);

    let editRadio = (userFormArray[id].genderRadios = document.querySelector(
      'input[name="gender"]:checked'
    ).value);

    let editPosition = (userFormArray[id].selectPosition =
      document.querySelector("#selectPosition").value);

    const updatedFormObject = {
      ...formValuesObj,
      userName: editName,
      email: editEmail,
      phoneNumber: editPhone,
      genderRadios: editRadio,
      selectPosition: editPosition,
    };
    console.log(updatedFormObject);
    localStorage.setItem("user", JSON.stringify(userFormArray));

    displayData();
    // resetFields();
  });
}

// delete an item
function deleteItem(items) {
  let deletedItem = userFormArray.filter((item, index) => item.id !== items);
  localStorage.setItem("user", JSON.stringify(deletedItem));
  userFormArray = deletedItem;
  displayData();
}

// reset fields
function resetFields() {
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#selectPosition").value = "";
  let genderRadios = false;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      genderRadios = false;
    }
  });
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-input";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
  small.style.color = "red";
}

function showSuccess() {
  const small = document.querySelectorAll("small");
  small.forEach((item) => {
    item.style.display = "none";
  });
}

function validateForm() {
  let userName = document.querySelector("#name");
  let email = document.querySelector("#email");
  let phoneNumber = document.querySelector("#phone");
  let selectPosition = document.querySelector("#selectPosition").value;

  let genderRadios;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      genderRadios = radioButton.getAttribute("value");
    }
  });

  // Reset all input fields to success class
  document.querySelectorAll(".form-input").forEach((formInput) => {
    formInput.classList.remove("error", "success");
  });

  if (!userName.value.trim()) {
    showError(userName, "Name is required");
  } else {
    let regName = /^[a-zA-Z]+$/;
    if (!regName.test(userName.value)) {
      showError(userName, "Name is not valid");
    } else if (regName.test(userName.value)) {
      showSuccess(userName);
    }
  }

  if (!email.value.trim()) {
    showError(email, "Email is required");
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email.value).toLowerCase())) {
      showError(email, "Invalid email");
    } else {
      showSuccess(email);
      return true;
    }
  }

  if (!phoneNumber.value.trim()) {
    showError(phoneNumber, "Number is required");
  } else {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!re.test(String(phoneNumber.value).toLowerCase())) {
      showError(phoneNumber, "Invalid number, only type number");
    } else {
      showSuccess(phoneNumber);
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
    const selectoptions = document.querySelector("#selectPosition");
    selectoptions.classList.add("error");
    const error = document.querySelector("#error-select");
    error.innerHTML = "Select is required";
    error.style.color = "red";
  } else if (selectPosition !== "") {
    const selectoptions = document.querySelector("#selectPosition");
    selectoptions.classList.add("success");
    const error = document.querySelector("#error-select");
    error.style.display = "none";
  }
}
