document.addEventListener("DOMContentLoaded", () => {
    const carForm = document.getElementById("car-form");
    const carListBody = document.getElementById("car-list-body");
    let cars = [];
    const updateCarList = () => {
        carListBody.innerHTML = ""; 
        cars.forEach((car, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.model}</td>
                <td>₹${car.price}</td>
                <td>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </td>
            `;
            carListBody.appendChild(row);
        });
        document.querySelectorAll(".remove-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                confirmAndRemoveCar(index);
            });
        });
    };
    const confirmAndRemoveCar = (index) => {
        const confirmRemove = window.confirm(
            `Are you sure you want to remove the car record?`
        );
        if (confirmRemove) {
            removeCar(index);
        }
    };
    const removeCar = (index) => {
        cars.splice(index, 1);
        updateCarList(); 
    };
    carForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const carModel = document.getElementById("carModel").value;
        const carPrice = document.getElementById("carPrice").value;
        if (carModel && carPrice) {
            cars.push({ model: carModel, price: carPrice });
            updateCarList();
            carForm.reset(); 
        } else {
            alert("Please fill in all fields.");
        }
    });
});
