let registerFormArr = JSON.parse(localStorage.getItem("user"));
const matchData = JSON.parse(sessionStorage.getItem("matchdata"));


let newPassword = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", changePassword);

function changePassword(e) {
  e.preventDefault();
  registerFormArr.filter((item) => {
    if (matchData == item.email) {
    if (!newPassword.value.trim() && !confirmPassword.value.trim()) {
        alert("empty fields")
    }else{
        if (newPassword.value === confirmPassword.value) {
            item.confirmPassword = newPassword.value;
            localStorage.setItem("user", JSON.stringify(registerFormArr))
            alert("Password changed successfully");
            window.location.replace('login.html');
          } else {
            alert("Password  not matched");
          }
    }
     
    }
  });
}

