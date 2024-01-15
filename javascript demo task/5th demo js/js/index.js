let getPersonData = [];

const tableBody = document.getElementById("table-body");
const monthHeading = document.getElementById("month-heading");
const fromDateInput = document.getElementById("from-date");
const toDateInput = document.getElementById("to-date");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/person");
    const personData = await response.json();
    getPersonData = personData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};

const renderGanttChart = () => {
  const startDate = new Date(fromDateInput.value);
  const endDate = new Date(toDateInput.value);
  const invalidDateError = document.getElementById("invalid-date");
  const presentDate = new Date();

  const getRoleColor = (person, currentDate) => {
    const details = person.details.filter((detail) => {
      const startDate = new Date(detail.startDate);
      const endDate = new Date(detail.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });

    return details.length === 0? null: details[0].role.toLowerCase() === "internship" ? "table-danger": "table-success";
  };

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    invalidDateError.innerHTML = "";
    return;
  } else {
    tableBody.innerHTML = "";
    monthHeading.innerHTML = "";
  }

  if (startDate > endDate || startDate > presentDate) {
    invalidDateError.innerHTML =
      "Invalid date range. Start date must be on or before the end date.";
    tableBody.innerHTML = "";
    monthHeading.innerHTML = "";
    return;
  }
  invalidDateError.innerHTML = "";

  const months = [];
  let currentMonth;
  for (
    currentMonth = new Date(startDate);
    currentMonth <= endDate;
    currentMonth.setMonth(currentMonth.getMonth() + 1)
  ) {
    months.push(new Date(currentMonth));
  }

  months.unshift("");
  months.forEach((currMonth, index) => {
    if (index != 0) {
      const monthYearHeading = document.createElement("th");
      monthYearHeading.textContent = `${getMonthName(
        currMonth.getMonth()
      )} ${currMonth.getFullYear()}`;
      monthHeading.appendChild(monthYearHeading);
    } else {
      const personNameHeading = document.createElement("th");
      personNameHeading.textContent = "Employee Name";
      monthHeading.appendChild(personNameHeading);
    }
  });

  getPersonData.forEach((person) => {
    const row = document.createElement("tr");
    const personCell = document.createElement("td");
    personCell.textContent = `${person.firstName} ${person.lastName}`;
    row.appendChild(personCell);

    months.forEach((month, index) => {
      if (index != 0) {
        const cell = document.createElement("td");
        const roleColor = getRoleColor(person, month);
        if (roleColor) {
          cell.classList.add(roleColor);
          cell.textContent = roleColor == "table-danger" ? "5000" : "10000";
        }
        row.appendChild(cell);
      }
    });
    tableBody.appendChild(row);
  });
};

fromDateInput.addEventListener("change", () => {
  renderGanttChart();
});

toDateInput.addEventListener("change", () => {
  renderGanttChart();
});