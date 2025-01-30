document.addEventListener("DOMContentLoaded", function () {
    const mainContainer = document.getElementById("mainContainer");
    const greetingContainer = document.getElementById("greeting");
    const loginDetails = window.location.search;
    const parameters = new URLSearchParams(loginDetails);
    const username = parameters.get("name");

    if (!username) {
        greetingContainer.innerHTML = "<p class='text-danger'>Error: Username missing in URL.</p>";
        return;
    } else {
        greetingContainer.innerHTML = `<h3>Welcome</h3>`;
    }
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                mainContainer.innerHTML = "<p class='text-warning'>No products available at the moment.</p>";
                return;
            }
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            mainContainer.innerHTML = "<p class='text-danger'>Failed to load products. Please try again later.</p>";
        });

    function displayProducts(products) {
        mainContainer.innerHTML = ""; 

        products.forEach(product => {
            const productCard = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                        <div class="card-body">
                            <h6 class="card-text">${product.title}<br>
                                <span class="price">₹${product.price}</span>
                            </h6>
                            <a class="btn btn-primary" href="product-details.html?id=${product.id}">View Product</a>
                        </div>
                    </div>
                </div>`;
            mainContainer.insertAdjacentHTML("beforeend", productCard);
        });
        document.querySelectorAll(".product-image").forEach(img => {
            img.onerror = function () {
                this.src = "fallback.jpg"; 
            };
        });
    }
});
