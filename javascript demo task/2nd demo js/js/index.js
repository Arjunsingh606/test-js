const loginUserData = JSON.parse(sessionStorage.getItem("data")) ;

loginUserData.map((item) => {
  const userName = document.getElementById("user-name");
  const welcome = document.getElementById("welcome");
  userName.innerHTML = item.firstName + " " + item.lastName;
  welcome.innerHTML = ` Welcome  ${item.firstName} ${item.lastName} `;
});

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.style.display = "block";
logoutBtn.innerHTML = "Logout";
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("data");
  window.location.replace("index.html");
});
