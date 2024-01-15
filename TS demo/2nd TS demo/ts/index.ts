let title = document.getElementById("title") as HTMLInputElement;
let description = document.getElementById("description") as HTMLTextAreaElement;
let tags = document.getElementById("tags") as HTMLSelectElement;
let assignee = document.getElementById("assignee") as HTMLSelectElement;
let priority = document.getElementById("priority") as HTMLSelectElement;
let defaultTicketStatus = document.getElementById(
  "status"
) as HTMLSelectElement;
let submitForm = document.getElementById("submit-form") as HTMLFormElement;
let userName = document.getElementById("user-name") as HTMLHeadingElement;
let userRoles = document.getElementById("user-roles") as HTMLParagraphElement;
let statusUpdated = document.getElementById(
  "status-dropdown"
) as HTMLDivElement;
let addTicketBtn = document.getElementById("add-ticket") as HTMLButtonElement;
let addTicketHeading = document.getElementById(
  "add-ticket-heading"
) as HTMLHeadingElement;
let editTicket = document.getElementById("edit-ticket") as HTMLHeadingElement;
let ticketSubmitBtn = document.getElementById(
  "submit-ticket"
) as HTMLButtonElement;
let ticketUpdateBtn = document.getElementById(
  "update-ticket"
) as HTMLButtonElement;
let deleteModalBtn = document.getElementById("delete-btn") as HTMLButtonElement;
const ticketCard = document.getElementById("ticket-card") as HTMLDivElement;
const searchInput = document.getElementById(
  "search-ticket"
) as HTMLInputElement;
let ticketDisplay = document.getElementById(
  "ticket-printing"
) as HTMLTableElement;

let filterUserRole: string;
let currentUser: user[] = [];
let userFirstName: string;

let getStatus: string;
let allTickets: ticket[] = [];
let filterTicketList: ticket[];

interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string;
  id?: number;
}

interface ticket {
  title: string;
  description: string;
  tags: string;
  assignee: string;
  priority: string;
  ticketStatus: string;
  created_by: string;
  id?: number;
}

addTicketBtn.addEventListener("click", (e) => {
  e.preventDefault();

  (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0.4";
  (document.querySelector(".modal-content") as HTMLDivElement).style.display ="block";

  addTicketHeading.style.display = "block";
  ticketSubmitBtn.style.display = "block";
  editTicket.style.display = "none";
  ticketUpdateBtn.style.display = "none";
  statusUpdated.style.display = "none";

  ticketFieldsReset();
  resetValidation();
});

const fetchUserData = async () => {
  try {
    const currentUserEmail = sessionStorage.getItem("currentUser");
    const response: Response = await fetch("http://localhost:3000/user");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userInfo: user[] = await response.json();
    userInfo.find((item: user) => {
      if (item.email === currentUserEmail) {
        currentUser.push(item);
        userFirstName = item.firstName;
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

fetchUserData();

const addTicket = async (e:Event) => {
  e.preventDefault();
  ticketFormValidation();

  const ticketTitle = title.value;
  const ticketDescription = description.value;
  const ticketTags = tags.value;
  const ticketAssignee = assignee.value;
  const ticketPriority = priority.value;
  const ticketStatus = defaultTicketStatus.value;

  if (
    !ticketTitle ||
    !ticketDescription ||
    !ticketTags ||
    !ticketAssignee ||
    !ticketPriority
  ) {
    return false;
  } else {
    const ticketPayload: ticket = {
      title: ticketTitle,
      description: ticketDescription,
      tags: ticketTags,
      assignee: ticketAssignee,
      priority: ticketPriority,
      ticketStatus: ticketStatus,
      created_by: currentUser[0].firstName,
    };

    try {
      await fetch("http://localhost:3000/ticket", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ticketPayload),
      }).then((res) => res.json());
    } catch (error) {
      console.error(error);
    }

    (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0";
    (document.querySelector(".modal-content") as HTMLDivElement).style.display ="none";

    displayTickets();
    ticketCardsDetails();
    ticketFieldsReset();
  }
};
submitForm.addEventListener("submit", addTicket);

// logout function
const logout = ():void => {
  sessionStorage.removeItem("currentUser");
  window.location.href = "login.html";
};

const formError = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, message: string) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const formSuccess = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
  const inputControl = element.parentElement as HTMLElement;
  const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  errorDisplay.innerHTML = "";
  inputControl.classList.remove("error");
};

const ticketFormValidation = (values: string = "default") => {
  if (values == "title" || values == "default") {
    if (!title.value.trim()) {
      formError(title, "Please enter title");
    } else {
      formSuccess(title);
    }
  }

  if (values == "description" || values == "default") {
    if (!description.value.trim()) {
      formError(description, "Please enter description");
    } else {
      formSuccess(description);
    }
  }

  if (values == "tags" || values == "default") {
    if (!tags.value.trim()) {
      formError(tags, "please select tag");
    } else {
      formSuccess(tags);
    }
  }

  if (values == "assignee" || values == "default") {
    if (!assignee.value.trim()) {
      formError(assignee, "please select assignee");
    } else {
      formSuccess(assignee);
    }
  }

  if (values == "priority" || values == "default") {
    if (!priority.value.trim()) {
      formError(priority, "please select priority");
    } else {
      formSuccess(priority);
    }
  }
};

const ticketFieldsReset = () => {
  title.value = "";
  description.value = "";
  tags.value = "";
  assignee.value = "";
  priority.value = "";
  defaultTicketStatus.value = "In progress";
};

const resetValidation = () => {
  formSuccess(title);
  formSuccess(description);
  formSuccess(tags);
  formSuccess(assignee);
  formSuccess(priority);
};

const displayTickets = async () => {
  try {
    const ticketresponse = await fetch("http://localhost:3000/ticket");
    const userResponse = await fetch("http://localhost:3000/user");
    const currentUserEmail = sessionStorage.getItem("currentUser");

    if (!ticketresponse.ok || !userResponse.ok) {
      throw new Error(`HTTP error! status: ${ticketresponse.status}`);
    }
    const ticketList: ticket[] = await ticketresponse.json();
    const userList: user[] = await userResponse.json();

    userList.find((item) => {
      if (currentUserEmail === item.email) {
        currentUser.push(item);
        filterUserRole = item.roles;
        userFirstName = item.firstName;
        return;
      }
    });

    let ticketTable =
      filterUserRole === "Admin"
        ? ticketList
        : ticketList.filter(
            (ticket: ticket) => ticket.created_by === userFirstName
          );

    const ticketsTable = ticketTable || filterTicketList;
    ticketDisplay.innerHTML = ticketsTable
      .map((item: ticket, index: number) => {
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
          <td>${item.ticketStatus}</td>
          <td class="ticket-action"><i class="fa-solid fa-pen-to-square"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#add-ticket-modal"
          aria-label="Close" onclick="editTickets(${item.id})">
          </i> 
          ${
            filterUserRole === "Admin"
              ? `<span class="btn delete-icon" id="delete-action" ><i data-bs-toggle="modal" data-bs-target="#delete-ticket" class="fa-solid fa-trash" onclick="deleteModal(${item.id})"></i></span>`
              : ""
          }</td>
          </tr>`;
      })
      .join("");
  } catch (error) {
    console.error(error);
  }
};
displayTickets();

// ticket edit function
let ticketIndex: number;
const editTickets = async (index: number) => {
  ticketIndex = index;
  addTicketHeading.style.display = "none";
  ticketSubmitBtn.style.display = "none";
  editTicket.style.display = "block";
  ticketUpdateBtn.style.display = "block";
  resetValidation();

  (
    document.querySelector(".modal-backdrop.show") as HTMLDivElement
  ).style.opacity = "0.4";
  (document.querySelector(".modal-content") as HTMLDivElement).style.display =
    "block";

  const allTicket = await fetch(`http://localhost:3000/ticket/${ticketIndex}`);
  const ticketList: ticket = await allTicket.json();

  const role: string = currentUser[0].roles;
  if (role == "Admin") {
    statusUpdated.style.display = "block";
  } else {
    statusUpdated.style.display = "none";
  }

  title.value = ticketList.title;
  description.value = ticketList.description;
  tags.value = ticketList.tags;
  assignee.value = ticketList.assignee;
  priority.value = ticketList.priority;
  defaultTicketStatus.value = ticketList.ticketStatus;

  ticketUpdateBtn.addEventListener("click", (e:Event) => {
    e.preventDefault();
    ticketList.title = title.value;
    ticketList.description = description.value;
    ticketList.tags = tags.value;
    ticketList.assignee = assignee.value;
    ticketList.priority = priority.value;
    ticketList.ticketStatus = defaultTicketStatus.value;

    fetch(`http://localhost:3000/ticket/${ticketIndex}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketList),
    }).then((data) => console.log(data));

    displayTickets();
    ticketCardsDetails();

    (
      document.querySelector(".modal-backdrop.show") as HTMLDivElement
    ).style.opacity = "0";
    (document.querySelector(".modal-content") as HTMLDivElement).style.display =
      "none";
  });
};

// delete function
let deleteTicketId: number;
const deleteTicket = async (ticketId: number) => {
  try {
    if (filterUserRole === "Admin") {
      const deleteResponse = await fetch(
        `http://localhost:3000/ticket/${ticketId}`,
        {
          method: "DELETE",
        }
      );
      debugger
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
const deleteModal = (ticketId: number): void => {
  deleteTicketId = ticketId;
};

deleteModalBtn.addEventListener("click", () => {
  deleteTicket(deleteTicketId);
  displayTickets();
  ticketCardsDetails();
});

// filter fn
const filterTicketsTable = async () => {
  const filterValue = document.getElementById(
    "ticket-filter"
  ) as HTMLSelectElement;
  const ticketresponse = await fetch("http://localhost:3000/ticket");
  const ticketList = await ticketresponse.json();
  const ticketTable: ticket[] = ticketList;

  filterTicketList = filterValue.value
    ? ticketTable.filter((ticket: ticket) => ticket.tags === filterValue.value)
    : ticketTable;

  let filteredticketTable =
    filterUserRole === "Admin"
      ? filterTicketList
      : filterTicketList.filter(
          (ticket: ticket) => ticket.created_by === userFirstName
        );

  const ticketsTable = filteredticketTable || filterTicketList;

  // displayTickets();
  // ticketCardsDetails();

  ticketDisplay.innerHTML = ticketsTable
    .map((item: ticket, index: number) => {
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
      <td>${item.ticketStatus}</td>
      <td class="ticket-action"><i class="fa-solid fa-pen-to-square"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#add-ticket-modal"
      aria-label="Close" onclick="editTickets(${item.id})">
      </i> 
      ${
        filterUserRole === "Admin"
          ? `<span class="btn delete-icon" id="delete-action" ><i data-bs-toggle="modal" data-bs-target="#delete-ticket" class="fa-solid fa-trash" onclick="deleteModal(${item.id})"></i></span>`
          : ""
      }</td>
      </tr>`;
    })
    .join("");
  ticketCard.innerHTML = ticketsTable
    .map((item: ticket) => {
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
 <p class="ticket-txt"> ${item.ticketStatus}</p>
 </div>
 <div class=" ticket-title ">
 <p>Description  </p>
 <p> ${item.description}</p>
 </div>
 <div class="edit-btn-details">
   <button class="btn details-edit-btn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#add-ticket-modal"
      aria-label="Close"
      onclick="editTickets(${item.id})">Edit
      </button>
      ${
        filterUserRole === "Admin"
          ? `<span  id="delete-action" ><button  class="btn details-delete-btn" data-bs-toggle="modal" data-bs-target="#delete-ticket"  onclick="deleteModal(${item.id})"> Delete</button></span>`
          : ""
      }
    </div>
 </div>`;
    })
    .join("");

  if (filterTicketList.length == 0) {
    (
      document.getElementById("error") as HTMLDivElement
    ).innerHTML = `<p class="search-error">Tickets does not Found !!!</p>`;
  } else {
    (document.getElementById("error") as HTMLDivElement).innerHTML = ``;
  }
};
(
  document.getElementById("ticket-filter") as HTMLSelectElement
).addEventListener("change", filterTicketsTable);

searchInput.addEventListener("input", async (e: Event) => {
  const searchString = (e.target as HTMLInputElement).value.toLowerCase();
  const ticketresponse = await fetch("http://localhost:3000/ticket");
  const ticketList: ticket[] = await ticketresponse.json();

  let ticketTable: ticket[] =
    filterUserRole === "Admin"
      ? ticketList
      : ticketList.filter(
          (ticket: ticket) => ticket.created_by === userFirstName
        );

  filterTicketList = ticketTable.filter((ticket: ticket) => {
    return (
      ticket.title.toLowerCase().includes(searchString) ||
      ticket.description.toLowerCase().includes(searchString) ||
      ticket.tags.toLowerCase().includes(searchString) ||
      ticket.assignee.toLowerCase().includes(searchString)
    );
  });

  if (filterTicketList.length == 0) {
    (
      document.getElementById("error") as HTMLDivElement
    ).innerHTML = `<p class="search-error">Tickets does not Found !!!</p>`;
  } else {
    (document.getElementById("error") as HTMLDivElement).innerHTML = ``;
  }
  ticketCardsDetails();
  const ticketsTable = filterTicketList || ticketTable;
  ticketDisplay.innerHTML = ticketsTable
    .map((item: ticket, index: number) => {
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
        <td>${item.ticketStatus}</td>
        <td class="ticket-action"><i class="fa-solid fa-pen-to-square"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#add-ticket-modal"
        aria-label="Close" onclick="editTickets(${item.id})">
        </i> 
        ${
          filterUserRole === "Admin"
            ? `<span class="btn delete-icon" id="delete-action" ><i data-bs-toggle="modal" data-bs-target="#delete-ticket" class="fa-solid fa-trash" onclick="deleteModal(${item.id})"></i></span>`
            : ""
        }</td>
        </tr>`;
    })
    .join("");
});

// details card ticket
const ticketCardsDetails = async () => {
  try {
    const response = await fetch("http://localhost:3000/ticket");
    const userResponse = await fetch("http://localhost:3000/user");
    const currentUserEmail = sessionStorage.getItem("currentUser");

    if (!response.ok || !userResponse.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ticketList: ticket[] = await response.json();
    const userList: user[] = await userResponse.json();
    userList.map((item: user) => {
      if (currentUserEmail === item.email) {
        currentUser.push(item);
        filterUserRole = item.roles;
        userFirstName = item.firstName;
        return;
      }
    });

    let ticketTable =
      filterUserRole === "Admin"
        ? ticketList
        : ticketList.filter(
            (ticket: ticket) => ticket.created_by === userFirstName
          );

    const detailsTicketsTable = filterTicketList || ticketTable;
    ticketCard.innerHTML = detailsTicketsTable
      .map((item: ticket) => {
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
   <p class="ticket-txt"> ${item.ticketStatus}</p>
   </div>
   <div class=" ticket-title ">
   <p>Description  </p>
   <p> ${item.description}</p>
   </div>
   <div class="edit-btn-details">
     <button class="btn details-edit-btn"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#add-ticket-modal"
        aria-label="Close"
        onclick="editTickets(${item.id})">Edit
        </button>
        ${
          filterUserRole === "Admin"
            ? `<span  id="delete-action" ><button  class="btn details-delete-btn" data-bs-toggle="modal" data-bs-target="#delete-ticket"  onclick="deleteModal(${item.id})"> Delete</button></span>`
            : ""
        }

      </div>

   </div>
   `;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
};
ticketCardsDetails();
