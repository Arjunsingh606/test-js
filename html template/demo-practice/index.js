const arr = JSON.parse(localStorage.getItem("user")) || [];
document.getElementById("submit-btn").addEventListener("click", formDetail)

function formDetail() {
  const fName = document.querySelector("#fname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
 

//   if(fName == ""){
//     alert('enter name first');
//     return false
//   }

  const userDetails = {
    fName,
    email,
    password,
    confirmPassword,
  };
  arr.push(userDetails);
  console.log(userDetails);
  console.log(arr);
  localStorage.setItem("user", JSON.stringify(arr));
};
