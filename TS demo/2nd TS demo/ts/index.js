var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var title = document.getElementById("title");
var description = document.getElementById("description");
var tags = document.getElementById("tags");
var assignee = document.getElementById("assignee");
var priority = document.getElementById("priority");
var defaultTicketStatus = document.getElementById("status");
var submitForm = document.getElementById("submit-form");
var userName = document.getElementById("user-name");
var userRoles = document.getElementById("user-roles");
var statusUpdated = document.getElementById("status-dropdown");
var addTicketBtn = document.getElementById("add-ticket");
var addTicketHeading = document.getElementById("add-ticket-heading");
var editTicket = document.getElementById("edit-ticket");
var ticketSubmitBtn = document.getElementById("submit-ticket");
var ticketUpdateBtn = document.getElementById("update-ticket");
var deleteModalBtn = document.getElementById("delete-btn");
var ticketCard = document.getElementById("ticket-card");
var searchInput = document.getElementById("search-ticket");
var ticketDisplay = document.getElementById("ticket-printing");
var filterUserRole;
var currentUser = [];
var userFirstName;
var getStatus;
var allTickets = [];
var filterTicketList;
addTicketBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".modal-backdrop.show").style.opacity = "0.4";
    document.querySelector(".modal-content").style.display = "block";
    addTicketHeading.style.display = "block";
    ticketSubmitBtn.style.display = "block";
    editTicket.style.display = "none";
    ticketUpdateBtn.style.display = "none";
    statusUpdated.style.display = "none";
    ticketFieldsReset();
    resetValidation();
});
var fetchUserData = function () { return __awaiter(_this, void 0, void 0, function () {
    var currentUserEmail_1, response, userInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                currentUserEmail_1 = sessionStorage.getItem("currentUser");
                return [4 /*yield*/, fetch("http://localhost:3000/user")];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                userInfo = _a.sent();
                userInfo.find(function (item) {
                    if (item.email === currentUserEmail_1) {
                        currentUser.push(item);
                        userFirstName = item.firstName;
                        userName.innerHTML = "".concat(item.firstName, "  ").concat(item.lastName);
                        userRoles.innerHTML = item.roles;
                    }
                    if (item.roles == "Admin") {
                        var option = document.createElement("option");
                        option.value = "".concat(item.firstName, "  ").concat(item.lastName);
                        option.text = "".concat(item.firstName, "  ").concat(item.lastName);
                        assignee.appendChild(option);
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
fetchUserData();
var addTicket = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var ticketTitle, ticketDescription, ticketTags, ticketAssignee, ticketPriority, ticketStatus, ticketPayload, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                ticketFormValidation();
                ticketTitle = title.value;
                ticketDescription = description.value;
                ticketTags = tags.value;
                ticketAssignee = assignee.value;
                ticketPriority = priority.value;
                ticketStatus = defaultTicketStatus.value;
                if (!(!ticketTitle ||
                    !ticketDescription ||
                    !ticketTags ||
                    !ticketAssignee ||
                    !ticketPriority)) return [3 /*break*/, 1];
                return [2 /*return*/, false];
            case 1:
                ticketPayload = {
                    title: ticketTitle,
                    description: ticketDescription,
                    tags: ticketTags,
                    assignee: ticketAssignee,
                    priority: ticketPriority,
                    ticketStatus: ticketStatus,
                    created_by: currentUser[0].firstName,
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/ticket", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(ticketPayload),
                    }).then(function (res) { return res.json(); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 5];
            case 5:
                document.querySelector(".modal-backdrop.show").style.opacity = "0";
                document.querySelector(".modal-content").style.display = "none";
                displayTickets();
                ticketCardsDetails();
                ticketFieldsReset();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
submitForm.addEventListener("submit", addTicket);
// logout function
var logout = function () {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
};
var formError = function (element, message) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
};
var formSuccess = function (element) {
    var inputControl = element.parentElement;
    var errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerHTML = "";
    inputControl.classList.remove("error");
};
var ticketFormValidation = function (values) {
    if (values === void 0) { values = "default"; }
    if (values == "title" || values == "default") {
        if (!title.value.trim()) {
            formError(title, "Please enter title");
        }
        else {
            formSuccess(title);
        }
    }
    if (values == "description" || values == "default") {
        if (!description.value.trim()) {
            formError(description, "Please enter description");
        }
        else {
            formSuccess(description);
        }
    }
    if (values == "tags" || values == "default") {
        if (!tags.value.trim()) {
            formError(tags, "please select tag");
        }
        else {
            formSuccess(tags);
        }
    }
    if (values == "assignee" || values == "default") {
        if (!assignee.value.trim()) {
            formError(assignee, "please select assignee");
        }
        else {
            formSuccess(assignee);
        }
    }
    if (values == "priority" || values == "default") {
        if (!priority.value.trim()) {
            formError(priority, "please select priority");
        }
        else {
            formSuccess(priority);
        }
    }
};
var ticketFieldsReset = function () {
    title.value = "";
    description.value = "";
    tags.value = "";
    assignee.value = "";
    priority.value = "";
    defaultTicketStatus.value = "In progress";
};
var resetValidation = function () {
    formSuccess(title);
    formSuccess(description);
    formSuccess(tags);
    formSuccess(assignee);
    formSuccess(priority);
};
var displayTickets = function () { return __awaiter(_this, void 0, void 0, function () {
    var ticketresponse, userResponse, currentUserEmail_2, ticketList, userList, ticketTable, ticketsTable, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch("http://localhost:3000/ticket")];
            case 1:
                ticketresponse = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/user")];
            case 2:
                userResponse = _a.sent();
                currentUserEmail_2 = sessionStorage.getItem("currentUser");
                if (!ticketresponse.ok || !userResponse.ok) {
                    throw new Error("HTTP error! status: ".concat(ticketresponse.status));
                }
                return [4 /*yield*/, ticketresponse.json()];
            case 3:
                ticketList = _a.sent();
                return [4 /*yield*/, userResponse.json()];
            case 4:
                userList = _a.sent();
                userList.find(function (item) {
                    if (currentUserEmail_2 === item.email) {
                        currentUser.push(item);
                        filterUserRole = item.roles;
                        userFirstName = item.firstName;
                        return;
                    }
                });
                ticketTable = filterUserRole === "Admin"
                    ? ticketList
                    : ticketList.filter(function (ticket) { return ticket.created_by === userFirstName; });
                ticketsTable = ticketTable || filterTicketList;
                ticketDisplay.innerHTML = ticketsTable
                    .map(function (item, index) {
                    return "<tr>\n          <td>".concat(index + 1, "</td>\n          <td>").concat(item.created_by, "</td>\n          <td>TN : 0").concat(index + 1, "</td>\n          <td><span class=\"ticket-tags ").concat(item.tags === "Replace"
                        ? "blue-color"
                        : item.tags === "New"
                            ? "yellow-color"
                            : item.tags === "Issue"
                                ? "red-color"
                                : item.tags === "Repair"
                                    ? "green-color"
                                    : "", "\">").concat(item.tags, "</span><b> ").concat(item.title, "</b> \n          <p>").concat(item.description, "</p>\n          </td>\n          <td>").concat(item.assignee, "</td>\n          <td><span class=\"ticket-tags ").concat(item.priority === "High"
                        ? "blue-color"
                        : item.priority === "Medium"
                            ? "red-color"
                            : item.priority === "Low"
                                ? "green-color"
                                : "", "\">").concat(item.priority, "\n          </span>\n          </td>\n          <td>").concat(item.ticketStatus, "</td>\n          <td class=\"ticket-action\"><i class=\"fa-solid fa-pen-to-square\"\n          type=\"button\"\n          data-bs-toggle=\"modal\"\n          data-bs-target=\"#add-ticket-modal\"\n          aria-label=\"Close\" onclick=\"editTickets(").concat(item.id, ")\">\n          </i> \n          ").concat(filterUserRole === "Admin"
                        ? "<span class=\"btn delete-icon\" id=\"delete-action\" ><i data-bs-toggle=\"modal\" data-bs-target=\"#delete-ticket\" class=\"fa-solid fa-trash\" onclick=\"deleteModal(".concat(item.id, ")\"></i></span>")
                        : "", "</td>\n          </tr>");
                })
                    .join("");
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
displayTickets();
// ticket edit function
var ticketIndex;
var editTickets = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var allTicket, ticketList, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketIndex = index;
                addTicketHeading.style.display = "none";
                ticketSubmitBtn.style.display = "none";
                editTicket.style.display = "block";
                ticketUpdateBtn.style.display = "block";
                resetValidation();
                document.querySelector(".modal-backdrop.show").style.opacity = "0.4";
                document.querySelector(".modal-content").style.display =
                    "block";
                return [4 /*yield*/, fetch("http://localhost:3000/ticket/".concat(ticketIndex))];
            case 1:
                allTicket = _a.sent();
                return [4 /*yield*/, allTicket.json()];
            case 2:
                ticketList = _a.sent();
                role = currentUser[0].roles;
                if (role == "Admin") {
                    statusUpdated.style.display = "block";
                }
                else {
                    statusUpdated.style.display = "none";
                }
                title.value = ticketList.title;
                description.value = ticketList.description;
                tags.value = ticketList.tags;
                assignee.value = ticketList.assignee;
                priority.value = ticketList.priority;
                defaultTicketStatus.value = ticketList.ticketStatus;
                ticketUpdateBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    ticketList.title = title.value;
                    ticketList.description = description.value;
                    ticketList.tags = tags.value;
                    ticketList.assignee = assignee.value;
                    ticketList.priority = priority.value;
                    ticketList.ticketStatus = defaultTicketStatus.value;
                    fetch("http://localhost:3000/ticket/".concat(ticketIndex), {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(ticketList),
                    }).then(function (data) { return console.log(data); });
                    displayTickets();
                    ticketCardsDetails();
                    document.querySelector(".modal-backdrop.show").style.opacity = "0";
                    document.querySelector(".modal-content").style.display =
                        "none";
                });
                return [2 /*return*/];
        }
    });
}); };
// delete function
var deleteTicketId;
var deleteTicket = function (ticketId) { return __awaiter(_this, void 0, void 0, function () {
    var deleteResponse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(filterUserRole === "Admin")) return [3 /*break*/, 2];
                return [4 /*yield*/, fetch("http://localhost:3000/ticket/".concat(ticketId), {
                        method: "DELETE",
                    })];
            case 1:
                deleteResponse = _a.sent();
                if (deleteResponse.ok) {
                    displayTickets();
                    ticketCardsDetails();
                }
                else {
                    console.log("Failed to delete ticket.");
                }
                return [3 /*break*/, 3];
            case 2:
                alert("User is not allowed to delete ticket.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteModal = function (ticketId) {
    deleteTicketId = ticketId;
};
deleteModalBtn.addEventListener("click", function () {
    deleteTicket(deleteTicketId);
    displayTickets();
    ticketCardsDetails();
});
// filter fn
var filterTicketsTable = function () { return __awaiter(_this, void 0, void 0, function () {
    var filterValue, ticketresponse, ticketList, ticketTable, filteredticketTable, ticketsTable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filterValue = document.getElementById("ticket-filter");
                return [4 /*yield*/, fetch("http://localhost:3000/ticket")];
            case 1:
                ticketresponse = _a.sent();
                return [4 /*yield*/, ticketresponse.json()];
            case 2:
                ticketList = _a.sent();
                ticketTable = ticketList;
                filterTicketList = filterValue.value
                    ? ticketTable.filter(function (ticket) { return ticket.tags === filterValue.value; })
                    : ticketTable;
                filteredticketTable = filterUserRole === "Admin"
                    ? filterTicketList
                    : filterTicketList.filter(function (ticket) { return ticket.created_by === userFirstName; });
                ticketsTable = filteredticketTable || filterTicketList;
                // displayTickets();
                // ticketCardsDetails();
                ticketDisplay.innerHTML = ticketsTable
                    .map(function (item, index) {
                    return "<tr>\n      <td>".concat(index + 1, "</td>\n      <td>").concat(item.created_by, "</td>\n      <td>TN : 0").concat(index + 1, "</td>\n      <td><span class=\"ticket-tags ").concat(item.tags === "Replace"
                        ? "blue-color"
                        : item.tags === "New"
                            ? "yellow-color"
                            : item.tags === "Issue"
                                ? "red-color"
                                : item.tags === "Repair"
                                    ? "green-color"
                                    : "", "\">").concat(item.tags, "</span><b> ").concat(item.title, "</b> \n      <p>").concat(item.description, "</p>\n      </td>\n      <td>").concat(item.assignee, "</td>\n      <td><span class=\"ticket-tags ").concat(item.priority === "High"
                        ? "blue-color"
                        : item.priority === "Medium"
                            ? "red-color"
                            : item.priority === "Low"
                                ? "green-color"
                                : "", "\">").concat(item.priority, "\n      </span>\n      </td>\n      <td>").concat(item.ticketStatus, "</td>\n      <td class=\"ticket-action\"><i class=\"fa-solid fa-pen-to-square\"\n      type=\"button\"\n      data-bs-toggle=\"modal\"\n      data-bs-target=\"#add-ticket-modal\"\n      aria-label=\"Close\" onclick=\"editTickets(").concat(item.id, ")\">\n      </i> \n      ").concat(filterUserRole === "Admin"
                        ? "<span class=\"btn delete-icon\" id=\"delete-action\" ><i data-bs-toggle=\"modal\" data-bs-target=\"#delete-ticket\" class=\"fa-solid fa-trash\" onclick=\"deleteModal(".concat(item.id, ")\"></i></span>")
                        : "", "</td>\n      </tr>");
                })
                    .join("");
                ticketCard.innerHTML = ticketsTable
                    .map(function (item) {
                    return "\n <div class=\"card-body details\" >\n <div>\n <p class=\"ticket-heading ".concat(item.tags === "New"
                        ? "yellow-color"
                        : item.tags === "Replace"
                            ? "blue-color"
                            : item.tags === "Issue"
                                ? "red-color"
                                : item.tags === "Repair"
                                    ? "green-color"
                                    : "", " \">").concat(item.tags, " Ticket</p></div>\n <div class=\"ticket-title\">\n <p >Title </p>\n <p >").concat(item.title, "</p>\n </div>\n <div class=\" ticket-title \">\n <p>Tags</p>\n <p class=\"ticket-txt\">").concat(item.tags, "</p>\n </div>\n <div class=\" ticket-title \">\n <p >Assignee </p>\n <p class=\"ticket-txt\">").concat(item.assignee, "</p>\n </div>\n <div class=\" ticket-title \">\n <p >Priority  </p>\n <p class=\"ticket-txt\">").concat(item.priority, "</p>\n </div>\n <div class=\" ticket-title \">\n <p >Status  </p>\n <p class=\"ticket-txt\"> ").concat(item.ticketStatus, "</p>\n </div>\n <div class=\" ticket-title \">\n <p>Description  </p>\n <p> ").concat(item.description, "</p>\n </div>\n <div class=\"edit-btn-details\">\n   <button class=\"btn details-edit-btn\"\n      type=\"button\"\n      data-bs-toggle=\"modal\"\n      data-bs-target=\"#add-ticket-modal\"\n      aria-label=\"Close\"\n      onclick=\"editTickets(").concat(item.id, ")\">Edit\n      </button>\n      ").concat(filterUserRole === "Admin"
                        ? "<span  id=\"delete-action\" ><button  class=\"btn details-delete-btn\" data-bs-toggle=\"modal\" data-bs-target=\"#delete-ticket\"  onclick=\"deleteModal(".concat(item.id, ")\"> Delete</button></span>")
                        : "", "\n    </div>\n </div>");
                })
                    .join("");
                if (filterTicketList.length == 0) {
                    document.getElementById("error").innerHTML = "<p class=\"search-error\">Tickets does not Found !!!</p>";
                }
                else {
                    document.getElementById("error").innerHTML = "";
                }
                return [2 /*return*/];
        }
    });
}); };
document.getElementById("ticket-filter").addEventListener("change", filterTicketsTable);
searchInput.addEventListener("input", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var searchString, ticketresponse, ticketList, ticketTable, ticketsTable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchString = e.target.value.toLowerCase();
                return [4 /*yield*/, fetch("http://localhost:3000/ticket")];
            case 1:
                ticketresponse = _a.sent();
                return [4 /*yield*/, ticketresponse.json()];
            case 2:
                ticketList = _a.sent();
                ticketTable = filterUserRole === "Admin"
                    ? ticketList
                    : ticketList.filter(function (ticket) { return ticket.created_by === userFirstName; });
                filterTicketList = ticketTable.filter(function (ticket) {
                    return (ticket.title.toLowerCase().includes(searchString) ||
                        ticket.description.toLowerCase().includes(searchString) ||
                        ticket.tags.toLowerCase().includes(searchString) ||
                        ticket.assignee.toLowerCase().includes(searchString));
                });
                if (filterTicketList.length == 0) {
                    document.getElementById("error").innerHTML = "<p class=\"search-error\">Tickets does not Found !!!</p>";
                }
                else {
                    document.getElementById("error").innerHTML = "";
                }
                ticketCardsDetails();
                ticketsTable = filterTicketList || ticketTable;
                ticketDisplay.innerHTML = ticketsTable
                    .map(function (item, index) {
                    return "<tr>\n        <td>".concat(index + 1, "</td>\n        <td>").concat(item.created_by, "</td>\n        <td>TN : 0").concat(index + 1, "</td>\n        <td><span class=\"ticket-tags ").concat(item.tags === "Replace"
                        ? "blue-color"
                        : item.tags === "New"
                            ? "yellow-color"
                            : item.tags === "Issue"
                                ? "red-color"
                                : item.tags === "Repair"
                                    ? "green-color"
                                    : "", "\">").concat(item.tags, "</span><b> ").concat(item.title, "</b> \n        <p>").concat(item.description, "</p>\n        </td>\n        <td>").concat(item.assignee, "</td>\n        <td><span class=\"ticket-tags ").concat(item.priority === "High"
                        ? "blue-color"
                        : item.priority === "Medium"
                            ? "red-color"
                            : item.priority === "Low"
                                ? "green-color"
                                : "", "\">").concat(item.priority, "\n        </span>\n        </td>\n        <td>").concat(item.ticketStatus, "</td>\n        <td class=\"ticket-action\"><i class=\"fa-solid fa-pen-to-square\"\n        type=\"button\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#add-ticket-modal\"\n        aria-label=\"Close\" onclick=\"editTickets(").concat(item.id, ")\">\n        </i> \n        ").concat(filterUserRole === "Admin"
                        ? "<span class=\"btn delete-icon\" id=\"delete-action\" ><i data-bs-toggle=\"modal\" data-bs-target=\"#delete-ticket\" class=\"fa-solid fa-trash\" onclick=\"deleteModal(".concat(item.id, ")\"></i></span>")
                        : "", "</td>\n        </tr>");
                })
                    .join("");
                return [2 /*return*/];
        }
    });
}); });
// details card ticket
var ticketCardsDetails = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, userResponse, currentUserEmail_3, ticketList, userList, ticketTable, detailsTicketsTable, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch("http://localhost:3000/ticket")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/user")];
            case 2:
                userResponse = _a.sent();
                currentUserEmail_3 = sessionStorage.getItem("currentUser");
                if (!response.ok || !userResponse.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                ticketList = _a.sent();
                return [4 /*yield*/, userResponse.json()];
            case 4:
                userList = _a.sent();
                userList.map(function (item) {
                    if (currentUserEmail_3 === item.email) {
                        currentUser.push(item);
                        filterUserRole = item.roles;
                        userFirstName = item.firstName;
                        return;
                    }
                });
                ticketTable = filterUserRole === "Admin"
                    ? ticketList
                    : ticketList.filter(function (ticket) { return ticket.created_by === userFirstName; });
                detailsTicketsTable = filterTicketList || ticketTable;
                ticketCard.innerHTML = detailsTicketsTable
                    .map(function (item) {
                    return "\n   <div class=\"card-body details\" >\n   <div>\n   <p class=\"ticket-heading ".concat(item.tags === "New"
                        ? "yellow-color"
                        : item.tags === "Replace"
                            ? "blue-color"
                            : item.tags === "Issue"
                                ? "red-color"
                                : item.tags === "Repair"
                                    ? "green-color"
                                    : "", " \">").concat(item.tags, " Ticket</p></div>\n   <div class=\"ticket-title\">\n   <p >Title </p>\n   <p >").concat(item.title, "</p>\n   </div>\n   <div class=\" ticket-title \">\n   <p>Tags</p>\n   <p class=\"ticket-txt\">").concat(item.tags, "</p>\n   </div>\n   <div class=\" ticket-title \">\n   <p >Assignee </p>\n   <p class=\"ticket-txt\">").concat(item.assignee, "</p>\n   </div>\n   <div class=\" ticket-title \">\n   <p >Priority  </p>\n   <p class=\"ticket-txt\">").concat(item.priority, "</p>\n   </div>\n   <div class=\" ticket-title \">\n   <p >Status  </p>\n   <p class=\"ticket-txt\"> ").concat(item.ticketStatus, "</p>\n   </div>\n   <div class=\" ticket-title \">\n   <p>Description  </p>\n   <p> ").concat(item.description, "</p>\n   </div>\n   <div class=\"edit-btn-details\">\n     <button class=\"btn details-edit-btn\"\n        type=\"button\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#add-ticket-modal\"\n        aria-label=\"Close\"\n        onclick=\"editTickets(").concat(item.id, ")\">Edit\n        </button>\n        ").concat(filterUserRole === "Admin"
                        ? "<span  id=\"delete-action\" ><button  class=\"btn details-delete-btn\" data-bs-toggle=\"modal\" data-bs-target=\"#delete-ticket\"  onclick=\"deleteModal(".concat(item.id, ")\"> Delete</button></span>")
                        : "", "\n\n      </div>\n\n   </div>\n   ");
                })
                    .join("");
                return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
ticketCardsDetails();
