let randomNumber = document.getElementById("random-number");
let resendButton = document.getElementById("resend-button");
let digitInput = document.getElementById("input-digit");
let verifyButton = document.getElementById("verify-btn");

let intervalId;
let randomDigit;

function generateRandomNumber() {
  clearInterval(intervalId);
  randomDigit = Math.floor(100000 + Math.random() * 900000);
  randomNumber.innerHTML = randomDigit;
}
generateRandomNumber();


verifyButton.addEventListener("click", () => {
  if (digitInput.value === String(randomDigit)) {
    setTimeout(() => {
      window.location.replace("resetpassword.html");
    });
  } else {
    alert("invalid otp");
  }

});


function displayTimer() {
  let timeLeft = 9;
  let elem = document.getElementById("timer");
  function updateTimer() {
    if (timeLeft > -1) {
      elem.innerHTML = timeLeft + " sec remaining";
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      resendButton.style.display = "block"; 
    }
  }

  elem.style.display = "block";
  resendButton.style.display = "none";
  updateTimer();

  let timerInterval = setInterval(updateTimer, 1000); 
  resendButton.addEventListener("click", function (e) {
    e.preventDefault()
    intervalId = setTimeout(generateRandomNumber, 1000);
    timeLeft = 9; 
    resendButton.style.display = "none"; 
    timerInterval = setInterval(updateTimer, 1000);
    
  
  });
}

displayTimer();
