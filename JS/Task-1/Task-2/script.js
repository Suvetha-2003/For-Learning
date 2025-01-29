function bookCar(carName) {
    localStorage.setItem('selectedCarName', carName);
}
document.addEventListener('DOMContentLoaded', () => {
    const carName = localStorage.getItem('selectedCarName');
    if (carName) {
        document.getElementById('name').value = carName;
    }
    const startDateInput = document.getElementById('startdate');
    const endDateInput = document.getElementById('enddate');
    const totalDaysInput = document.getElementById('total');
    const totalPriceInput = document.getElementById('price');
    function calculateTotal() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);
        if (end > start) {
            const Diff = end - start;
            const days = Math.ceil(Diff / (1000 * 60 * 60 * 24));
            const pricePerDay = getPricePerDay(carName);
            const totalPrice = days * pricePerDay;

            totalDaysInput.value = days;
            totalPriceInput.value = totalPrice;
        } else {
            totalDaysInput.value = '';
            totalPriceInput.value = '';
        }
    }
    function getPricePerDay(carName) {
        const carPrices = {
            'Hyundai': 2000,
            'Mercedes-Benz USA': 3000,
            'Mercedes-Benz G': 5000,
            'BMW': 5000,
            'Thar': 4000,
            'Tata Nano': 3000,
            'New Maruti Swift': 5000,
            'Skoda Kylaq': 6000,
            'Kia Carnival': 4000,
        };
        return carPrices[carName] || 0; 
    }
    startDateInput.addEventListener('change', calculateTotal);
    endDateInput.addEventListener('change', calculateTotal);

    const form = document.getElementById('booking-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        Alert(carName);
    });
    function Alert(carName) {
        const totalDays = totalDaysInput.value;
        const totalPrice = totalPriceInput.value;

        if (totalDays && totalPrice) {
            alert(
                `Your Booking was confirmed!\n` +
                `Car: ${carName}\n` +
                `Total Days: ${totalDays}\n` +
                `Total Price: ₹${totalPrice}`
            );
        } else {
            alert("Please fill in all fields correctly before booking.");
        }
    }
});
