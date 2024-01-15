let title = document.getElementById("title");
let description = document.getElementById("description");
let tags = document.getElementById("tags");
let assignee = document.getElementById("assignee");
let priority = document.getElementById("priority");
let ticketStatus = document.getElementById("status");
let submitForm = document.getElementById("submit-form");
let userName = document.getElementById("user-name"); 
let userRoles = document.getElementById("user-roles");
let statusUpdated = document.getElementById("status-dropdown");
let addTicketBtn = document.getElementById("add-ticket"); 
let currentUser = [];
let getTicketData = {};
let firstName;

addTicketBtn.addEventListener("click", (e) => {
  addTicketHeading.style.display = "block";
  submit_ticketBtn.style.display = "block";
  editTicket.style.display = "none";
  update_ticketBtn.style.display = "none";
  statusUpdated.style.display = "none";

  resetField();
  resetValidation()
});

const getUserData = async () => { 
  try {
    const currentUserEmail = sessionStorage.getItem("currentUser");
    const response = await fetch("http://localhost:3000/user");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userInfo = await response.json();
    userInfo.find((item) => {
      if (item.email === currentUserEmail) {
        currentUser.push(item);
        userName.innerHTML = `${item.firstName}  ${item.lastName}`;
        userRoles.innerHTML = item.roles;
      }
      if (item.roles == "Admin") {
        const option = document.createElement("option");
        option.value = `${item.firstName}  ${item.lastName}`;
        option.text = `${item.firstName}  ${item.lastName}`;
        assignee.appendChild(option);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
getUserData();

const addTicket = async (e) => {
  e.preventDefault();
  ticketFormValidation();

  if (
    !title.value ||
    !description.value ||
    !tags.value ||
    !assignee.value ||
    !priority.value
  ) {
    return false;
  } else {
    getTicketData = {
      title: title.value,
      description: description.value,
      tags: tags.value,
      assignee: assignee.value,
      priority: priority.value,
      ticketStatus: ticketStatus.value,
      created_by: currentUser[0].firstName,
    };

    const data = getTicketData;
    try {
      await fetch("http://localhost:3000/ticket", {
        method: "POST",
        headers: {
          "content-type": "application/json charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.error(error);
    }
    displayTickets();
    ticketCardsDetails();
    resetField();

  }
};
submitForm.addEventListener("submit", addTicket);

// logout function
const logout = () => {
  sessionStorage.removeItem("currentUser");
  window.location.href = "login.html";
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const ticketFormValidation = (values = "temp") => {
  if (values == "title"|| values=="temp") {
    if (!title.value.trim()) {
      setError(title, "Please enter title");
    } else {
      setSuccess(title);
    }
  }
  
  if (values=="description"|| values=="temp") {
    if (!description.value.trim()) {
      setError(description, "Please enter description");
    } else {
      setSuccess(description);
    }
  }

  if (values=="tags" || values=="temp") {
    if (!tags.value.trim()) {
      setError(tags, "please select tag");
    } else {
      setSuccess(tags);
    }
  }
 
  if (values=="assignee" || values=="temp") {
    if (!assignee.value.trim()) {
      setError(assignee, "please select assignee");
    } else {
      setSuccess(assignee);
    }
  }
 
  if (values=="priority" || values=="temp") {
    if (!priority.value.trim()) {
      setError(priority, "please select priority");
    } else {
      setSuccess(priority);
    }
  }
 
};

const resetField = () => {
  title.value = "";
  description.value = "";
  tags.value = "";
  assignee.value = "";
  priority.value = "";
};

const resetValidation = () => {
  setSuccess(title);
  setSuccess(description);
  setSuccess(tags);
  setSuccess(assignee);
  setSuccess(priority);
};

// edit function

let ticketIndex;
const editTickets = async (index) => {
  ticketIndex = index;
  addTicketHeading.style.display = "none";
  submit_ticketBtn.style.display = "none";
  editTicket.style.display = "block";
  update_ticketBtn.style.display = "block";

  const allTicket = await fetch(`http://localhost:3000/ticket/${ticketIndex}`);
  const ticketList = await allTicket.json();

  const role = currentUser[0].roles;
  if (role == "Admin") {
    statusUpdated.style.display = "block";
  } else {
    statusUpdated.style.display = "none";
  }

  document.getElementById("title").value = ticketList.title;
  document.getElementById("description").value = ticketList.description;
  document.getElementById("tags").value = ticketList.tags;
  document.getElementById("assignee").value = ticketList.assignee;
  document.getElementById("priority").value = ticketList.priority;
  document.getElementById("status").value = ticketList.ticketStatus;

  
  update_ticketBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ticketList.title = document.getElementById("title").value;
    ticketList.description = document.getElementById("description").value;
    ticketList.tags = document.getElementById("tags").value;
    ticketList.assignee = document.getElementById("assignee").value;
    ticketList.priority = document.getElementById("priority").value;
    ticketList.ticketStatus = document.getElementById("status").value;

    fetch(`http://localhost:3000/ticket/${ticketIndex}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketList),
    }).then((data) => console.log(data));
    displayTickets();
    ticketCardsDetails()
  });
};
