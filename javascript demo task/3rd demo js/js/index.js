const loginUserData = JSON.parse(sessionStorage.getItem("userDetails")) ;


loginUserData.map((item) => {
  const userName = document.getElementById("user-name");
  const registerButton = document.getElementById("register-btn")
  registerButton.style.display = "none"
  userName.innerHTML = item.firstName + " " + item.lastName;
});

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.style.display = "block";
logoutBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Logout`;
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("userDetails");
  window.location.replace("index.html");
});



