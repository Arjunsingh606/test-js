let addTicketHeading = document.getElementById("add-ticket-heading");
let editTicket = document.getElementById("edit-ticket");
let submit_ticketBtn = document.getElementById("submit-ticket");
let update_ticketBtn = document.getElementById("update-ticket");
let deleteIcon = document.getElementById("delete-btn");
const ticketCard = document.getElementById("ticket-card");
const searchInput = document.getElementById("search-ticket");
let filteredTickets;
// let firstName;
let getStatus;




let ticketDisplay = document.getElementById("ticket-printing");
let currentUsers = [];
let allTickets = [];

const displayTickets = async (filteredTicket) => {
  try {
    const ticketresponse = await fetch("http://localhost:3000/ticket");
    const userResponse = await fetch("http://localhost:3000/user");
    const currentUserEmail = sessionStorage.getItem("currentUser");

    if (!ticketresponse.ok || !userResponse.ok) {
      throw new Error(`HTTP error! status: ${ticketresponse.status}`);
    }
    const ticketList = await ticketresponse.json();
    const userList = await userResponse.json();

    userList.find((item) => {
      if (currentUserEmail === item.email) {
        currentUsers.push(item);
        filteredTickets = item.roles;
        firstName = item.firstName;
        return;
      }
    });

    let ticketTable =
      filteredTickets === "Admin"
        ? ticketList
        : ticketList.filter((ticket) => ticket.created_by === firstName);

    const ticketsTable = filteredTicket || ticketTable;
    ticketDisplay.innerHTML = ticketsTable
      .map((item, index) => {
        return `<tr>
          <td>${index + 1}</td>
          <td>${item.created_by}</td>
          <td>TN : 0${index + 1}</td>
          <td><span class="ticket-tags ${
            item.tags === "Replace"
              ? "blue-color"
              : item.tags === "New"
              ? "yellow-color"
              : item.tags === "Issue"
              ? "red-color"
              : item.tags === "Repair"
              ? "green-color"
              : ""
          }">${item.tags}</span><b> ${item.title}</b> 
          <p>${item.description}</p>
          </td>
          <td>${item.assignee}</td>
          <td><span class="ticket-tags ${
            item.priority === "High"
              ? "blue-color"
              : item.priority === "Medium"
              ? "red-color"
              : item.priority === "Low"
              ? "green-color"
              : ""
          }">${item.priority}
          </span>
          </td>
          <td>${item.statuss}</td>
          <td><i class="fa-solid fa-pen-to-square"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          aria-label="Close"
          onclick="editTickets(${item.id})"></i> 
          <span data-bs-toggle="modal" data-bs-target="#hello" id="delete-modal" class="btn delete-icon" onclick="deletModal(${
            item.id
          })"><i class="fa-solid fa-trash"></i></span>
          </tr>`;
      })
      .join("");
  } catch (error) {
    console.error(error);
  }
};

let deleteId;
const deletModal = (id)=>{
  deleteId = id;
}

deleteIcon.addEventListener("click",()=>{
  deleteTicket(deleteId);
  displayTickets();
})

const deleteTicket = async (ticketId) => {
  try {
    if (filteredTickets === "Admin") {
      const deleteResponse = await fetch(
        `http://localhost:3000/ticket/${ticketId}`,
        {
          method: "DELETE",
        }
      );

      if (deleteResponse.ok) {
        displayTickets();
        ticketCardsDetails();
      } else {
        console.log("Failed to delete ticket.");
      }
    } else {

      alert("User is not allowed to delete ticket.");
    }
  } catch (error) {
    console.error(error);
  }
};



searchInput.addEventListener("input", async (e) => {
  const searchString = e.target.value.toLowerCase();
  const ticketresponse = await fetch("http://localhost:3000/ticket");
  const ticketList = await ticketresponse.json();

  let ticketTable =
    filteredTickets === "Admin"
      ? ticketList
      : ticketList.filter((ticket) => ticket.created_by === firstName);

  const filteredTicket = ticketTable.filter((ticket) => {
    if (ticket) {
      return (
        ticket.title.toLowerCase().includes(searchString) ||
        ticket.description.toLowerCase().includes(searchString) ||
        ticket.tags.toLowerCase().includes(searchString) ||
        ticket.assignee.toLowerCase().includes(searchString)
      );
    }
  });
  if (filteredTicket.length == 0) {
    document.getElementById(
      "error"
    ).innerHTML = `<p class="search-error">Tickets does not Found !!!</p>`;
  } else {
    document.getElementById("error").innerHTML = ``;
  }

  displayTickets(filteredTicket);

  ticketCard.innerHTML = filteredTicket
    .map((item) => {
      return `
   <div class="card-body details" >
   <div>
   <p class="ticket-heading ${
     item.tags === "New"
       ? "yellow-color"
       : item.tags === "Replace"
       ? "green-color"
       : item.tags === "Issue"
       ? "red-color"
       : item.tags === "Repair"
       ? "blue-color"
       : ""
   } ">${item.tags} Ticket</p></div>
   <div class="ticket-title">
   <p >Title </p>
   <p >${item.title}</p>
   </div>
   <div class=" ticket-title ">
   <p>Tags</p>
   <p class="ticket-txt">${item.tags}</p>
   </div>
   <div class=" ticket-title ">
   <p >Assignee </p>
   <p class="ticket-txt">${item.assignee}</p>
   </div>
   <div class=" ticket-title ">
   <p >Priority  </p>
   <p class="ticket-txt">${item.priority}</p>
   </div>
   <div class=" ticket-title ">
   <p >Status  </p>
   <p class="ticket-txt"> ${item.statuss}</p>
   </div>
   <div class=" ticket-title ">
   <p>Description  </p>
   <p> ${item.description}</p>
   </div>

   <div class="edit-btn-details">
   <button class="btn btn-primary"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      aria-label="Close"
      onclick="editTickets(${item.id})">Edit
      </button> 
      <span class="btn btn-primary" onclick="deleteTicket(${
        item.id
      })">Delete</span>
    </div>
   </div>
   `;
    })
    .join("");
});

// filter fn
const filterTicketsTable = async () => {
  const filterValue = document.getElementById("ticket-filter").value;
  const ticketresponse = await fetch("http://localhost:3000/ticket");
  const ticketList = await ticketresponse.json();
  const ticketTable = ticketList;

  const filteredTicket = filterValue
    ? ticketTable.filter((ticket) => ticket.tags === filterValue)
    : ticketTable;

  let filteredticketTable =
    filteredTickets === "Admin"
      ? filteredTicket
      : filteredTicket.filter((ticket) => ticket.created_by === firstName);

  const ticketsTable = filteredticketTable || filteredTicket;
  ticketDisplay.innerHTML = ticketsTable
    .map((item, index) => {
      return `<tr>
      <td>${index + 1}</td>
      <td>${item.created_by}</td>
      <td>TN : 0${index + 1}</td>
      <td><span class="ticket-tags ${
        item.tags === "Replace"
          ? "blue-color"
          : item.tags === "New"
          ? "yellow-color"
          : item.tags === "Issue"
          ? "red-color"
          : item.tags === "Repair"
          ? "green-color"
          : ""
      }">${item.tags}</span><b> ${item.title}</b> 
      <p>${item.description}</p>
      </td>
      <td>${item.assignee}</td>
      <td><span class="ticket-tags ${
        item.priority === "High"
          ? "blue-color"
          : item.priority === "Medium"
          ? "red-color"
          : item.priority === "Low"
          ? "green-color"
          : ""
      }">${item.priority}
      </span>
      </td>
      <td>${item.statuss}</td>
      <td><i class="fa-solid fa-pen-to-square"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      aria-label="Close"
      onclick="editTickets(${item.id})"></i> 
      <span class="btn delete-icon" onclick="deleteTicket(${
        item.id
      })"><i class="fa-solid fa-trash"></i></span>
      
      </tr>`;
    })
    .join("");

  ticketCard.innerHTML = ticketsTable
    .map((item) => {
      return `
   <div class="card-body details" >
   <div>
   <p class="ticket-heading ${
     item.tags === "New"
       ? "yellow-color"
       : item.tags === "Replace"
       ? "blue-color"
       : item.tags === "Issue"
       ? "red-color"
       : item.tags === "Repair"
       ? "green-color"
       : ""
   } ">${item.tags} Ticket</p></div>
   <div class="ticket-title">
   <p >Title </p>
   <p >${item.title}</p>
   </div>
   <div class=" ticket-title ">
   <p>Tags</p>
   <p class="ticket-txt">${item.tags}</p>
   </div>
   <div class=" ticket-title ">
   <p >Assignee </p>
   <p class="ticket-txt">${item.assignee}</p>
   </div>
   <div class=" ticket-title ">
   <p >Priority  </p>
   <p class="ticket-txt">${item.priority}</p>
   </div>
   <div class=" ticket-title ">
   <p >Status  </p>
   <p class="ticket-txt"> ${item.statuss}</p>
   </div>
   <div class=" ticket-title ">
   <p>Description  </p>
   <p> ${item.description}</p>
   </div>
   <div class="edit-btn-details">
     <button class="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        aria-label="Close"
        onclick="editTickets(${item.id})">Edit
        </button> 
        <span class="btn btn-primary" onclick="deleteTicket(${
          item.id
        })">Delete</span>
      </div>

   </div>
   `;
    })
    .join("");

  if (filteredTicket.length == 0) {
    document.getElementById(
      "error"
    ).innerHTML = `<p class="search-error">Tickets does not Found !!!</p>`;
  } else {
    document.getElementById("error").innerHTML = ``;
  }
};

document.getElementById("ticket-filter").addEventListener("change", filterTicketsTable);

// details card ticket
const ticketCardsDetails = async (filteredTicket) => {
  try {
    const response = await fetch("http://localhost:3000/ticket");
    const userResponse = await fetch("http://localhost:3000/user");
    const currentUserEmail = sessionStorage.getItem("currentUser");

    if (!response.ok || !userResponse.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ticketList = await response.json();
    const userList = await userResponse.json();
    userList.map((item) => {
      if (currentUserEmail === item.email) {
        currentUsers.push(item);
        filterRoles = item.roles;
        firstName = item.firstName;
        return;
      }
    });

    let ticketTable =
      filterRoles === "Admin"
        ? ticketList
        : ticketList.filter((ticket) => ticket.created_by === firstName);

    const detailsTicketsTable = filteredTicket || ticketTable;
    ticketCard.innerHTML = detailsTicketsTable.map((item) => {
        return `
       <div class="card-body details" >
       <div>
       <p class="ticket-heading ${
         item.tags === "New"
           ? "yellow-color"
           : item.tags === "Replace"
           ? "green-color"
           : item.tags === "Issue"
           ? "red-color"
           : item.tags === "Repair"
           ? "blue-color"
           : ""
       } ">${item.tags} Ticket</p></div>
       <div class="ticket-title">
       <p >Title </p>
       <p >${item.title}</p>
       </div>
       <div class=" ticket-title ">
       <p>Tags</p>
       <p class="ticket-txt">${item.tags}</p>
       </div>
       <div class=" ticket-title ">
       <p >Assignee </p>
       <p class="ticket-txt">${item.assignee}</p>
       </div>
       <div class=" ticket-title ">
       <p >Priority  </p>
       <p class="ticket-txt">${item.priority}</p>
       </div>
       <div class=" ticket-title ">
       <p >Status  </p>
       <p class="ticket-txt"> ${item.statuss}</p>
       </div>
       <div class=" ticket-title ">
       <p>Description  </p>
       <p> ${item.description}</p>
       </div>

       <div class="edit-btn-details">
       <button class="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          aria-label="Close"
          onclick="editTickets(${item.id})">Edit
          </button> 
          <span class="btn btn-primary" onclick="deleteTicket(${
            item.id
          })">Delete</span>
        </div>
       </div>
       `;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
  displayTickets();
};

ticketCardsDetails();
