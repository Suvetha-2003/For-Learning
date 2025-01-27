let selectedRow = null;

function isValidName(name){
    const nameRegex = /[A-Z][a-z\s]/;
    return nameRegex.test(name);
}
function isValidPhone(phone) {
    const phoneRegex = /[89][0-9]{9}/;
    return phoneRegex.test(phone);
}

function onFormSubmit() {
    var formData = readFormData();

    if(!isValidName(formData.name)){
        alert("Please enter a valid name.");
        return;
    }
    if (!isValidPhone(formData.phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    let formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["phone"] = document.getElementById("phone").value;

    let genderRadios = document.getElementsByName("gender");
    for (let radio of genderRadios) {
        if (radio.checked) {
            formData["gender"] = radio.value;
            break;
        }
    }

    let selectedSubjects = [];
    let checkboxes = document.getElementsByName("subjects");
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selectedSubjects.push(checkbox.value);
        }
    }
    formData["subjects"] = selectedSubjects.join(", ");

    formData["dob"] = document.getElementById("dob").value;
    formData["loc"] = document.getElementById("loc").value;

    return formData;
}

function insertNewRecord(data) {
    let table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);


    var cell1 = newRow.insertCell(0);
        cell1.innerHTML=data.name;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML=data.age;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML=data.phone;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML=data.gender;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML=data.subjects;
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML=data.dob;
    var cell7 = newRow.insertCell(6);
        cell7.innerHTML=data.loc;
    var cell8 = newRow.insertCell(7);
        cell8.innerHTML = '<button onClick="editRecord(this)" class="edit">Edit</button> <button onClick="deleteRecord(this)" class="delete">Delete</button>';
}

function editRecord(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("age").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;

    let genderRadios = document.getElementsByName("gender");
    for (let radio of genderRadios) {
        radio.checked = radio.value === selectedRow.cells[3].innerHTML;
    }

    let selectedSubjects = selectedRow.cells[4].innerHTML.split(", ");
    let checkboxes = document.getElementsByName("subjects");
    for (let checkbox of checkboxes) {
        checkbox.checked = selectedSubjects.includes(checkbox.value);
    }

    document.getElementById("dob").value = selectedRow.cells[5].innerHTML;
    document.getElementById("loc").value = selectedRow.cells[6].innerHTML;
    document.getElementById("submit-button").textContent = "Update";
}

function updateRecord(data) {
    selectedRow.cells[0].innerHTML = data.name;
    selectedRow.cells[1].innerHTML = data.age;
    selectedRow.cells[2].innerHTML = data.phone;
    selectedRow.cells[3].innerHTML = data.gender;
    selectedRow.cells[4].innerHTML = data.subjects;
    selectedRow.cells[5].innerHTML = data.dob;
    selectedRow.cells[6].innerHTML = data.loc;
    selectedRow = null;
    document.getElementById("submit-button").textContent = "Submit";
}

function deleteRecord(td) {
    if (confirm("Are you sure you want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("studentlist").deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("details-form").reset();
    selectedRow = null;
    document.getElementById("submit-button").textContent = "Submit";
}
