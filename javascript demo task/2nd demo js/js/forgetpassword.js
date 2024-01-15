const forgetPasswordData = JSON.parse(localStorage.getItem("user"));

let forgetEmail = document.getElementById("email");
let forgetBtn = document.getElementById("forget-btn");

forgetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let checkEmail = forgetPasswordData.filter(
    (i) => i.email == forgetEmail.value
  );
  if (checkEmail == "") { 
    alert("Email does not exist");
  } else {
    sessionStorage.setItem("matchdata", JSON.stringify(checkEmail[0].email));
    window.location.replace("otp.html");
    
  }
});


