document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeName = document.getElementById('name').value;
    const taskTitle = document.getElementById('title').value;
    const taskDesc = document.getElementById('desc').value;
    const dueDate = document.getElementById('due').value;

    const tableBody = document.getElementById('taskTableBody');
    const existingRows = Array.from(tableBody.rows);
    let existingCell = null;

    for (let row of existingRows) {
        if (row.cells[0].textContent === employeeName) {
            existingCell = row.cells[0];
            break;
        }
    }

    const newRow = tableBody.insertRow();

    if (existingCell) {
        const rowSpan = parseInt(existingCell.rowSpan) || 1;
        existingCell.rowSpan = rowSpan + 1;
    } else {
        const cell1 = newRow.insertCell(0);
        cell1.textContent = employeeName;
    }

    const cell2 = newRow.insertCell(existingCell ? 0 : 1); 
    const cell3 = newRow.insertCell(existingCell ? 1 : 2);
    const cell4 = newRow.insertCell(existingCell ? 2 : 3);
    const cell5 = newRow.insertCell(existingCell ? 3 : 4);

    cell2.textContent = taskTitle;
    cell3.textContent = taskDesc;
    cell4.textContent = dueDate;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        document.getElementById('name').value = employeeName;
        document.getElementById('title').value = taskTitle;
        document.getElementById('desc').value = taskDesc;
        document.getElementById('due').value = dueDate;

        document.querySelector('button[type="submit"]').textContent = 'Update Task';

        document.getElementById('taskForm').onsubmit = function(event) {
            event.preventDefault();

            cell2.textContent = document.getElementById('title').value;
            cell3.textContent = document.getElementById('desc').value;
            cell4.textContent = document.getElementById('due').value;

            document.getElementById('taskForm').reset();
            document.querySelector('button[type="submit"]').textContent = 'Assign Task';
            document.getElementById('taskForm').onsubmit = handleFormSubmit;
        };
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        const rowIndex = newRow.rowIndex - 1;

        if (existingCell && existingCell.rowSpan > 1) {
            existingCell.rowSpan--;
        }

        tableBody.deleteRow(rowIndex);
    });

    cell5.appendChild(editButton);
    cell5.appendChild(deleteButton);

    document.getElementById('taskForm').reset();
});

function handleFormSubmit(event) {
    event.preventDefault();
}
