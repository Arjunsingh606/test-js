let notesArray = JSON.parse(localStorage.getItem("notesDetails")) || [];
let notesData = JSON.parse(sessionStorage.getItem("notesDetails")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("user")) || [];
let userLoginDetails = JSON.parse(sessionStorage.getItem("userDetails"));

let title = document.getElementById("title-input");
let description = document.getElementById("description");
let colorPicker = document.getElementById("color-item");
let submitNotesButton = document.getElementById("submit-btn");
let notesCard = document.getElementById("notes-card");
let customModalforDelete = document.getElementById("delete-pop");
let addNoteFormTitle = document.getElementById("add-note");
let editNoteFormTitle = document.getElementById("edit-note");
let updateNoteButton = document.getElementById("update-notes");
let noteAddingButton = document.getElementById("modelOpenBtn");
let custombackground = document.getElementById("remove-modal");
let customPosition = document.getElementById("notes-body");
let customModalClass = document.getElementById("remove-modal");
let getColors;
let updatedNote;
let userNotes = {};
let defaultColor = "#eef6d0";


noteAddingButton.addEventListener("click", function () {
  editNoteFormTitle.style.display = "none";
  updateNoteButton.style.display = "none";
  addNoteFormTitle.style.display = "block";
  submitNotesButton.style.display = "block";
  title.value = "";
  description.value = "";
 
  const defaultColorRadioButton = document.querySelector(
    'input[value="' + defaultColor + '"]'
  );
  defaultColorRadioButton.checked = true;
  getColors = defaultColor;
});

let getRandomUserId = userLoginDetails.map((item) => {
  return item.userId;
});

let notesRandomId = notesArray.map((item) => {
  return item.noteUserId;
});

const notesKeyForRandomId = loggedInUser.filter((item) => {
  return item.userId == getRandomUserId;
});
let userMatchedId = notesKeyForRandomId[0].userId;

// time and date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

// functionality for adding notes
const addingNotes = (e) => {
  e.preventDefault();
  if (!title.value.trim() && !description.value.trim()) {
    return false;
  } else {
    userNotes = {
      title: title.value,
      description: description.value,
      date: currentDate,
      color: getColors || defaultColor,
      noteUserId: userMatchedId,
    };

    notesArray.push(userNotes);
    notesArray.map((note, index) => {
      note.id = index + 1;
    });
    localStorage.setItem("notesDetails", JSON.stringify(notesArray));

    resetNotesfields();
    displayNotes();
  }
};
submitNotesButton.addEventListener("click", addingNotes);

// display function
let notesMatchedId = notesRandomId.filter((item) => {
  return item == getRandomUserId;
});
const displayNotes = (filteredNotes) => {
  let matchedIdObject = notesArray.filter(
    (item) => item.noteUserId == notesMatchedId[0]
  );

  const notesToDisplay = filteredNotes || matchedIdObject;

  notesCard.innerHTML = notesToDisplay
    .map((item) => {
      return `
       <div class="col-md-3 card card-body" style="background-color:${item.color}">
  
         <span class="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fa-solid fa-pen edit-icon" onclick="updateNotes(${item.id})"></i>
         </span>
  
          <span class="delete" onclick="customDeleteModal(${item.id})">
           <i class="fa-solid fa-trash"></i>
          </span>
          <h5>${item.title}</h5>
          <p>${item.description}</p>
           <p class="date"> Note created at ${item.date}</p>
         </div>
         `;
    })
    .join("");
};
displayNotes();

//   reset details
const resetNotesfields = () => {
  title.value = "";
  description.value = "";
  getColors = "";
};

// notes card background color

function colorSelected() {
  let colorItem;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      colorItem = radioButton.getAttribute("value");
    }
  });
  getColors = colorItem;
}

let ids;
const customDeleteModal = (items) => {
  ids = items;
  customModalforDelete.style.display = "block";
  customModalforDelete.classList.add("position-modal");
  custombackground.style.display = "block";
  customModalClass.classList.add("modal-background");
  customPosition.style.position = customPosition.style.position = "relative"
    ? "fixed"
    : "relative";
};

const customCancelButton = () => {
  const deleteIcon = document.getElementById("delete-icon");
  customModalforDelete.style.display = "none";
  custombackground.style.display = "none";
  deleteIcon.style.display = "block";
  customPosition.style.position = customPosition.style.position = "fixed"
    ? "relative"
    : "fixed";
  customModalClass.classList.remove("modal-background");
};

// delete the note
const deleteNote = () => {
  let deletedNotes = notesArray.filter((item) => item.id !== ids);
  localStorage.setItem("notesDetails", JSON.stringify(deletedNotes));
  notesArray = deletedNotes;

  customModalforDelete.style.display = "none";
  customPosition.style.position = customPosition.style.position = "fixed"
    ? "relative"
    : "fixed";
  customModalClass.classList.remove("modal-background");
  displayNotes();
};

// update notes
const updateNotes = (id) => {
  addNoteFormTitle.style.display = "none";
  submitNotesButton.style.display = "none";
  editNoteFormTitle.style.display = "block";
  updateNoteButton.style.display = "block";

  updatedNote = notesArray.find((item) => {
    if (item.id == id) {
      return item;
    }
  });
  if (updatedNote) {
    title.value = updatedNote.title;
    description.value = updatedNote.description;
    getColors = updatedNote.color || defaultColor;
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let colorList = Array.from(radioButtons);

    colorList.map((radioButton) => {
      if (updatedNote.color === radioButton.getAttribute("value")) {
        radioButton.checked = true;
      } else {
        radioButton.checked = false;
      }
      updatedNote.color;
    });
  }
  updateNoteButton.addEventListener("click", function (e) {
    e.preventDefault();

    updatedNote.title = title.value;
    updatedNote.description = description.value;
    updatedNote.color = getColors;

    localStorage.setItem("notesDetails", JSON.stringify(notesArray));
    displayNotes();
  });
};

// search bar functionality
let searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredNotes = notesArray.filter((note) => {
    if (note.noteUserId === userMatchedId) {
      const titleMatch = note.title.toLowerCase().includes(searchString);
      const descriptionMatch = note.description
        .toLowerCase()
        .includes(searchString);
      return titleMatch || descriptionMatch;
    } else {
      return false;
    }
  });
  if (filteredNotes.length == 0) {
    document.getElementById(
      "error"
    ).innerHTML = `<p class="search-error">Notes does not Found !!!</p>`;
  } else {
    document.getElementById("error").innerHTML = ``;
  }
  displayNotes(filteredNotes);
});

