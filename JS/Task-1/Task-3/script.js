let selectedRow = null;
        const events = [];

        document.getElementById("eventForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = readFormData();
            if (selectedRow == null) {
                insertEvent(formData);
            } else {
                updateEvent(formData);
            }
            resetForm();
            showResultSection();
        });

        function readFormData() {
            let formData = {};
            formData["title"] = document.getElementById("eventTitle").value;
            formData["date"] = document.getElementById("eventDate").value;
            formData["status"] = calculateStatus(formData["date"]);
            return formData;
        }

        function calculateStatus(date) {
            return new Date(date) < new Date() ? "Past" : "Upcoming";
        }

        function insertEvent(data) {
            events.push(data);
            renderEvents();
        }

        function renderEvents(filter = "all") {
            const tbody = document.getElementById("eventList");
            tbody.innerHTML = "";

            const filteredEvents = events.filter(event => {
                if (filter === "all") return true;
                return event.status.toLowerCase() === filter;
            });

            filteredEvents.forEach((event, index) => {
                const row = tbody.insertRow();
                row.insertCell(0).innerHTML = event.title;
                row.insertCell(1).innerHTML = event.date;
                row.insertCell(2).innerHTML = event.status;
                row.insertCell(3).innerHTML = `
                    <button onclick="editEvent(${index})">Edit</button>
                    <button onclick="deleteEvent(${index})">Delete</button>
                `;
            });
        }

        function editEvent(index) {
            selectedRow = index;
            const event = events[index];

            document.getElementById("eventTitle").value = event.title;
            document.getElementById("eventDate").value = event.date;
            document.getElementById("submitButton").textContent = "Update Event";
            document.getElementById("form-section").style.display = "block";
    document.getElementById("result").style.display = "none";
        }

        function updateEvent(data) {
            events[selectedRow] = data;
            renderEvents();
            document.getElementById("submitButton").textContent = "Add Event";
            selectedRow = null;
        }

        function deleteEvent(index) {
            if (confirm("Are you sure you want to delete this event?")) {
                events.splice(index, 1);
                renderEvents();
            }
        }

        function filterEvents(status) {
            renderEvents(status);
            showResultSection();
        }

        function resetForm() {
            document.getElementById("eventForm").reset();
            selectedRow = null;
            document.getElementById("submitButton").textContent = "Add Event";
        }
        function showResultSection() {
            document.getElementById("form-section").style.display = "none";
            document.getElementById("result").style.display = "block";
        }
        function Back() {
            resetForm();
    document.getElementById("form-section").style.display = "block";
    document.getElementById("result").style.display = "none";
        }
        