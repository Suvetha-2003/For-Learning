let selectedRow = null;
let expenses = [];

function onFormSubmit() {
  const formData = readFormData();

  if (!isValidAmount(formData.amt)) {
    alert("Please enter a valid amount.");
    return;
  }

  if (selectedRow === null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }

  resetForm();
  showTable();
  calculateTotalExpense();
}

function readFormData() {
  return {
    name: document.getElementById("name").value.trim(),
    amt: document.getElementById("amt").value.trim(),
    cat: document.getElementById("cat").value,
    date: document.getElementById("date").value,
  };
}

function isValidAmount(amt) {
  const amountRegex = /^\d+$/;
  return amountRegex.test(amt);
}

function insertNewRecord(data) {
  expenses.push(data);
  renderExpenseTable(expenses);
}

function updateRecord(data) {
  selectedRow.cells[0].innerText = data.name;
  selectedRow.cells[1].innerText = data.amt;
  selectedRow.cells[2].innerText = data.cat;
  selectedRow.cells[3].innerText = data.date;
  selectedRow = null;
}

function deleteRecord(td) {
  if (confirm("Are you sure you want to delete this record?")) {
    const row = td.parentElement.parentElement;
    expenses.splice(row.rowIndex - 1, 1);
    renderExpenseTable(expenses);
  }
}

function editRecord(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerText;
  document.getElementById("amt").value = selectedRow.cells[1].innerText;
  document.getElementById("cat").value = selectedRow.cells[2].innerText;
  document.getElementById("date").value = selectedRow.cells[3].innerText;
  document.getElementById("submit-button").innerText = "Update";
}

function renderExpenseTable(expenses) {
  const tableBody = document.getElementById("Expense-Tracker");
  tableBody.innerHTML = "";
  expenses.forEach((expense, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = expense.name;
    row.insertCell(1).innerText = expense.amt;
    row.insertCell(2).innerText = expense.cat;
    row.insertCell(3).innerText = expense.date;
    const actions = row.insertCell(4);
    actions.innerHTML = `
      <button onClick="editRecord(this)" class="btn btn-success btn-sm">Edit</button>
      <button onClick="deleteRecord(this)" class="btn btn-danger btn-sm">Delete</button>
    `;
  });
}

function resetForm() {
  document.getElementById("details-form").reset();
  selectedRow = null;
  document.getElementById("submit-button").innerText = "Submit";
}

function showTable() {
  document.getElementById("form-section").style.display = "none";
  document.getElementById("table-section").style.display = "block";
}

function backToForm() {
  document.getElementById("form-section").style.display = "block";
  document.getElementById("table-section").style.display = "none";
}

function searchExpense() {
  const searchQuery = document.getElementById("search-input").value.toLowerCase();
  const filteredExpenses = expenses.filter(expense => expense.name.toLowerCase().includes(searchQuery));
  renderExpenseTable(filteredExpenses);
}

function filterByCategory() {
  const category = document.getElementById("category-filter").value;
  const filteredExpenses = category ? expenses.filter(exp => exp.cat === category) : expenses;
  renderExpenseTable(filteredExpenses);
  calculateTotalExpense(filteredExpenses);
}

function filterByDate() {
  const filterOption = document.getElementById("date-filter").value;
  let filteredExpenses = [];

  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);
  const lastSixMonths = new Date();
  lastSixMonths.setMonth(now.getMonth() - 6);
  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);

  switch (filterOption) {
    case "last-week":
      filteredExpenses = expenses.filter(exp => new Date(exp.date) >= lastWeek);
      break;
    case "last-month":
      filteredExpenses = expenses.filter(exp => new Date(exp.date) >= lastMonth);
      break;
    case "last-6-months":
      filteredExpenses = expenses.filter(exp => new Date(exp.date) >= lastSixMonths);
      break;
    case "last-year":
      filteredExpenses = expenses.filter(exp => new Date(exp.date) >= lastYear);
      break;
  }

  renderExpenseTable(filteredExpenses);
  calculateTotalExpense(filteredExpenses);
}

function calculateTotalExpense(filteredExpenses = expenses) {
  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + parseInt(expense.amt), 0);
  document.getElementById("total-expense").innerText = totalExpense;
}
