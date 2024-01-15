let randomNumber = document.getElementById("random-number");
let resendButton = document.getElementById("resend-button");
let digitInput = document.getElementById("input-digit");
let verifyButton = document.getElementById("verify-btn");
let timer = document.getElementById("timer");
let intervalId;
let randomDigit;

function generateRandomNumber() {
  clearInterval(intervalId);
  randomDigit = Math.floor(100000 + Math.random() * 900000);
  randomNumber.innerHTML = randomDigit;
 
  resendButton.style.display = "block";
}

resendButton.addEventListener("click", () => {
  resendButton.style.display = "none"; 
  generateRandomNumber();
  startTimer();
});

generateRandomNumber();

function startTimer() {
  let timeLeft = 9;
  let elem = document.getElementById("timer");

  let vv = setInterval(() => {
    if (timeLeft == -1) {
      clearInterval(vv);
      resendButton.style.display = "block";
    } else {
      elem.innerHTML = timeLeft + " sec remaining";
      timeLeft--;
    }
  }, 1000);
}

verifyButton.addEventListener("click", () => {
  if (digitInput.value === String(randomDigit)) {
    console.log(randomDigit, "otp matched");
    setTimeout(() => {
      window.location.replace("resetpassword.html");
    });
  } else {
    alert("invalid otp");
  }
});

startTimer();




// bjdhsgjhsdfjhfdgjh
function displayTimer() {
  let timeLeft = 9;
  let elem = document.getElementById("timer");
  let resendButton = document.getElementById("resendButton"); // Assuming there is a button with the id "resendButton"

  function updateTimer() {
    if (timeLeft > 0) {
      elem.innerHTML = timeLeft + " sec remaining";
      timeLeft--;
    } else {
      clearInterval(timerInterval); // Stop the timer
      resendButton.style.display = "block"; // Display the resend button
    }
  }

  // Initially, show the timer and hide the resend button
  elem.style.display = "block";
  resendButton.style.display = "none";

  updateTimer(); // Update the timer immediately

  let timerInterval = setInterval(updateTimer, 1000); // Update the timer every 1 second

  // Attach a click event listener to the resend button
  resendButton.addEventListener("click", function () {
    timeLeft = 9; // Reset the timer to 9 seconds
    resendButton.style.display = "none"; // Hide the resend button again
    timerInterval = setInterval(updateTimer, 1000); // Start the timer again
  });
}

// Call the function to start the timer
displayTimer();



// sdkhfgsdjghjgj
const forgetPasswordData = JSON.parse(localStorage.getItem("user"));
let forgetEmail = document.getElementById("email");
let forgetBtn = document.getElementById("forget-btn");


forgetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  forgetPasswordData.some((item) => {
    console.log(item);
    if (forgetEmail.value === item.email) {
      window.location.replace("otp.html");
      sessionStorage.setItem("matchdata", JSON.stringify(item.email));
    } else if (forgetEmail.value !== item.email) {
      alert("Email does not exist")
    } else {
      // console.log("Invalid");
    }
  });
});

// jkfnbkj
function validation() {
  if (forgetEmail.value.trim() === "") {
    let errorMsg = document.querySelector(".error");
    errorMsg.innerHTML = "Enter Email";
    errorMsg.style.color = "red";
    return false
  }
}