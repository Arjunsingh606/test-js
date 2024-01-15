let fullName = document.getElementById("full-name") as HTMLInputElement;
let mobNumber = document.getElementById("mob-no") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let sportName = document.getElementById("sport-name") as HTMLSelectElement;
let experties = document.getElementById("experties") as HTMLSelectElement;
let sportForm = document.getElementById("sport-form") as HTMLFormElement;
let displayPlayerList = document.getElementById("display-sport-list") as HTMLBodyElement;
let editPlayerLable = document.getElementById("edit-player-Label") as HTMLHeadElement;
let addPlayerLable = document.getElementById("add-player-label") as HTMLHeadElement;
let addPlayerBTn = document.getElementById("add-player-btn") as HTMLButtonElement;
let updateBtn = document.getElementById("update-btn") as HTMLButtonElement;
let submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
let modalBody = document.getElementById("player-popup") as HTMLDivElement;

let playersData: string[] = [];

interface player {
  fullName: string;
  mobNumber: number;
  email: string | number;
  sportName: string;
  experties: string;
  id?: string;
}

addPlayerBTn.addEventListener("click", () => {
  resetFormFields();
  removeValidation();
  (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0.4";
  (document.querySelector(".modal-content") as HTMLDivElement).style.display = "block";
  editPlayerLable.style.display = "none";
  updateBtn.style.display = "none";
  submitBtn.style.display = "block";
  addPlayerLable.style.display = "block";
});

sportForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sportFormValidation();

  const playerName = fullName.value;
  const mobileNumber = mobNumber.value;
  const emailValue = email.value;
  const sportNameValue = sportName.value;
  const expertiesValue = experties.value;

  if (
    !playerName ||
    !mobileNumber ||
    !emailValue ||
    !sportNameValue ||
    !expertiesValue
  ) {
    return false;
  } else {
    if (playerName.length >= 3 && mobileNumber.length >= 10) {
      const playerList: player = {
        fullName: playerName,
        mobNumber: parseInt(mobileNumber),
        email: emailValue,
        sportName: sportNameValue,
        experties: expertiesValue,
      };

      try {
        await fetch("http://localhost:3000/players", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(playerList),
        });
      } catch (error) {
        console.error(error);
      }
      
      (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0";
      (document.querySelector(".modal-content") as HTMLDivElement).style.display = "none";

      displaySportList();
      resetFormFields();
    } else {
      return false;
    }
  }
});

const displaySportList = async () => {
  try {
    const response = await fetch("http://localhost:3000/players");
    playersData = await response.json();
  } catch (error) {
    console.log(error, "catch error");
  }

  displayPlayerList.innerHTML = playersData
    .map((item: any, index) => {
      return `
        <tr>
          <td class="serial-number">${index + 1}</td>
          <td>${item.fullName}</td>
          <td>${item.mobNumber}</td>
          <td>${item.email}</td>
          <td>${item.sportName}</td>
          <td>${item.experties}</td>
          <td class ="text-center">
            <button onclick="editPlayerDetails('${
              item.id
            }')" data-bs-toggle="modal" data-bs-target="#playerModal" class="btn edit-btn" id="edit">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deletePlayer('${item.id}')" class="btn del-btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>`;
    })
    .join("");
};

const deletePlayer = async (id: string) => {
  try {
    await fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE",
    });
    displaySportList();
  } catch (error) {
    console.error(error);
  }
};

let playerIndex: string;
const editPlayerDetails = async (id: string) => {
  playerIndex = id;
  (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0.4";
  (document.querySelector(".modal-content") as HTMLDivElement).style.display = "block";

  submitBtn.style.display = "none";
  addPlayerLable.style.display = "none";
  updateBtn.style.display = "block";
  editPlayerLable.style.display = "block";

  const response = await fetch(`http://localhost:3000/players/${playerIndex}`);
  const playerDetails = await response.json();

  fullName.value = playerDetails.fullName;
  mobNumber.value = playerDetails.mobNumber;
  email.value = playerDetails.email;
  sportName.value = playerDetails.sportName;
  experties.value = playerDetails.experties;

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      !fullName.value ||
      !mobNumber.value ||
      !email.value ||
      !sportName.value ||
      !experties.value
    ) {
      return false;
    } else {
      if (fullName.value.length >= 3 && mobNumber.value.length >= 10) {
        playerDetails.fullName = fullName.value;
        playerDetails.mobNumber = mobNumber.value;
        playerDetails.email = email.value;
        playerDetails.sportName = sportName.value;
        playerDetails.experties = experties.value;
  
        try {
          fetch(`http://localhost:3000/players/${playerIndex}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(playerDetails),
          }).then((data) => console.log(data));
        } catch (error) {
          console.log(error, "server issue");
        }

        (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0";
        (document.querySelector(".modal-content") as HTMLDivElement).style.display = "none";
        displaySportList();
        resetFormFields();
      } else {
        return false;
      }
    }
  });
};

const resetFormFields = () => {
  fullName.value = "";
  mobNumber.value = "";
  email.value = "";
  sportName.value = "";
  experties.value = "";
};

const removeValidation = () => {
  setSuccess(fullName);
  setSuccess(mobNumber);
  setSuccess(email);
  setSuccess(sportName);
  setSuccess(experties);
};

displaySportList();


const setError = (element: HTMLInputElement | HTMLSelectElement, message: string) => {
  const errorContainer = element.nextElementSibling as HTMLElement;
  errorContainer.innerHTML = message;
  errorContainer.classList.add("error");
};

const setSuccess = (element: HTMLInputElement | HTMLSelectElement) => {
  const errorContainer = element.nextElementSibling as HTMLElement;
  errorContainer.innerHTML = "";
  errorContainer.classList.remove("error");
};

const sportFormValidation = (values: string = "default") => {
  if (values === "fullname" || values === "default") {
    if (!fullName.value.trim()) {
      setError(fullName, "Please enter your full name");
    } else {
      const checkName = /^[a-zA-Z ]{3,20}$/;
      if (!checkName.test(fullName.value)) {
        setError(fullName, "Invalid name");
        return false;
      } else {
        setSuccess(fullName);
      }
    }
  }

  if (values === "mobilenumber" || values === "default") {
    if (!mobNumber.value.trim()) {
      setError(mobNumber, "Please enter your 10 digit mobile number");
    } else {
      const checkmobNumber = /^\d{10}$/;
      if (!checkmobNumber.test(mobNumber.value)) {
        setError(mobNumber, "Invalid mobile number");
      } else {
        setSuccess(mobNumber);
      }
    }
  }

  if (values === "email" || values === "default") {
    if (!email.value.trim()) {
      setError(email, "Please enter your email");
    } else {
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmail.test(email.value.toLowerCase())) {
        setError(email, "Please enter a valid email address");
      } else {
        setSuccess(email);
      }
    }
  }

  if (values === "sport" || values === "default") {
    if (sportName.value === "") {
      setError(sportName, "Please choose a sport");
    } else {
      setSuccess(sportName);
    }
  }

  if (values === "experties" || values === "default") {
    if (experties.value === "") {
      setError(experties, "Please choose expertise level");
    } else {
      setSuccess(experties);
    }
  }
  return true;
};
