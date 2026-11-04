
/* =====================================
   STORE CONFIGURATION
===================================== */

// IMPORTANT: Replace with seller's WhatsApp number.
// South African format: 27821234567
const SELLER_WHATSAPP = "27821234567";


/* =====================================
   PRODUCT DATABASE
===================================== */

const products = [

    {
        id: "UW001",
        name: "Classic White T-Shirt",
        price: 199,
        description: "A premium cotton white T-shirt. Comfortable, stylish and perfect for everyday wear.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: "UW002",
        name: "Black Street Hoodie",
        price: 450,
        description: "Premium streetwear hoodie with a comfortable fit. Perfect for casual occasions.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: "UW003",
        name: "Casual Denim Jacket",
        price: 599,
        description: "Modern denim jacket designed for a timeless and fashionable look.",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "UW004",
        name: "Classic Summer Shirt",
        price: 299,
        description: "Lightweight and breathable shirt suitable for summer and casual outings.",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "UW005",
        name: "Premium Black T-Shirt",
        price: 220,
        description: "A stylish black T-shirt made from comfortable premium fabric.",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: "UW006",
        name: "Casual Fashion Outfit",
        price: 550,
        description: "A fashionable outfit designed for comfort and everyday style.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
        sizes: ["S", "M", "L", "XL"]
    }

];


/* =====================================
   GLOBAL VARIABLES
===================================== */

let selectedProduct = null;
let selectedSize = null;
let orderInformation = null;


/* =====================================
   CURRENCY FORMATTER
===================================== */

function formatPrice(amount) {

    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR"
    }).format(amount);

}


/* =====================================
   LOAD PRODUCTS
===================================== */

function loadProducts() {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    document.getElementById("productCount").textContent =
        `${products.length} Products`;

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const id = document.createElement("p");
        id.textContent = `Product ID: ${product.id}`;

        const price = document.createElement("strong");
        price.textContent = formatPrice(product.price);

        const link = document.createElement("span");
        link.className = "view-product";
        link.textContent = "VIEW PRODUCT →";

        card.append(image, name, id, price, link);

        card.addEventListener("click", () => {
            openProduct(product.id);
        });

        productGrid.appendChild(card);

    });

}


/* =====================================
   PAGE NAVIGATION
===================================== */

function hideAllPages() {

    document.getElementById("homePage").classList.add("hidden");

    document.getElementById("productPage").classList.add("hidden");

    document.getElementById("orderPage").classList.add("hidden");

    document.getElementById("confirmationModal").classList.add("hidden");

}


function showHome() {

    hideAllPages();

    document.getElementById("homePage").classList.remove("hidden");

    window.scrollTo(0, 0);

}


function showProduct() {

    document.getElementById("orderPage").classList.add("hidden");

    document.getElementById("productPage").classList.remove("hidden");

    window.scrollTo(0, 0);

}


/* =====================================
   OPEN PRODUCT DETAILS
===================================== */

function openProduct(productId) {

    selectedProduct = products.find(
        product => product.id === productId
    );

    if (!selectedProduct) return;

    selectedSize = null;

    document.getElementById("homePage").classList.add("hidden");

    document.getElementById("productPage").classList.remove("hidden");

    document.getElementById("orderPage").classList.add("hidden");

    document.getElementById("detailImage").src = selectedProduct.image;

    document.getElementById("detailName").textContent = selectedProduct.name;

    document.getElementById("detailId").textContent = selectedProduct.id;

    document.getElementById("detailPrice").textContent =
        formatPrice(selectedProduct.price);

    document.getElementById("detailDescription").textContent =
        selectedProduct.description;

    document.getElementById("quantity").value = 1;

    loadSizes();

    window.scrollTo(0, 0);

}


/* =====================================
   LOAD AVAILABLE SIZES
===================================== */

function loadSizes() {

    const sizeContainer = document.getElementById("sizeOptions");

    sizeContainer.innerHTML = "";

    selectedProduct.sizes.forEach(size => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "size-option";

        button.textContent = size;

        button.addEventListener("click", () => {

            document.querySelectorAll(".size-option").forEach(option => {
                option.classList.remove("active");
            });

            button.classList.add("active");

            selectedSize = size;

        });

        sizeContainer.appendChild(button);

    });

}


/* =====================================
   QUANTITY CONTROL
===================================== */

function changeQuantity(amount) {

    const quantityInput = document.getElementById("quantity");

    let quantity = Number(quantityInput.value) || 1;

    quantity += amount;

    if (quantity < 1) quantity = 1;

    if (quantity > 20) quantity = 20;

    quantityInput.value = quantity;

}


/* =====================================
   OPEN ORDER FORM
===================================== */

function openOrderForm() {

    if (!selectedSize) {

        alert("Please select a size before continuing.");

        return;

    }

    const quantity = Number(document.getElementById("quantity").value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {

        alert("Please select a valid quantity between 1 and 20.");

        return;

    }

    const total = selectedProduct.price * quantity;

    // Populate order summary

    document.getElementById("orderImage").src = selectedProduct.image;

    document.getElementById("orderProductName").textContent =
        selectedProduct.name;

    document.getElementById("orderProductId").textContent =
        selectedProduct.id;

    document.getElementById("orderSize").textContent = selectedSize;

    document.getElementById("orderQuantity").textContent = quantity;

    document.getElementById("orderTotal").textContent =
        formatPrice(total);

    // Populate hidden form information

    document.getElementById("formProductId").value =
        selectedProduct.id;

    document.getElementById("formSize").value =
        selectedSize;

    document.getElementById("formQuantity").value =
        quantity;

    // Switch views

    document.getElementById("productPage").classList.add("hidden");

    document.getElementById("orderPage").classList.remove("hidden");

    window.scrollTo(0, 0);

}


/* =====================================
   CUSTOMER FORM SUBMISSION
===================================== */

document.getElementById("customerForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        // Collect customer information

        const customerName =
            document.getElementById("customerName").value.trim();

        const customerPhone =
            document.getElementById("customerPhone").value.trim();

        const customerEmail =
            document.getElementById("customerEmail").value.trim();

        const customerAddress =
            document.getElementById("customerAddress").value.trim();

        const customerNotes =
            document.getElementById("customerNotes").value.trim();

        if (!this.reportValidity()) return;

        // Build order object

        orderInformation = {

            productId: selectedProduct.id,

            productName: selectedProduct.name,

            size: selectedSize,

            quantity: Number(document.getElementById("quantity").value),

            unitPrice: selectedProduct.price,

            total: selectedProduct.price *
                Number(document.getElementById("quantity").value),

            customerName,

            customerPhone,

            customerEmail,

            customerAddress,

            customerNotes

        };


        // Display confirmation summary

        document.getElementById("confirmationSummary").innerHTML = `
            <div>
                <strong>Product:</strong>
                ${escapeHTML(orderInformation.productName)}
            </div>

            <div>
                <strong>Product ID:</strong>
                ${escapeHTML(orderInformation.productId)}
            </div>

            <div>
                <strong>Size:</strong>
                ${escapeHTML(orderInformation.size)}
            </div>

            <div>
                <strong>Quantity:</strong>
                ${orderInformation.quantity}
            </div>

            <div>
                <strong>Total:</strong>
                ${formatPrice(orderInformation.total)}
            </div>

            <div>
                <strong>Customer:</strong>
                ${escapeHTML(orderInformation.customerName)}
            </div>
        `;


        // Show popup

        document.getElementById("confirmationModal")
            .classList.remove("hidden");

    }
);


/* =====================================
   HTML ESCAPING
===================================== */

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


/* =====================================
   CLOSE CONFIRMATION POPUP
===================================== */

function closeConfirmation() {

    document.getElementById("confirmationModal")
        .classList.add("hidden");

}


/* =====================================
   SEND ORDER TO WHATSAPP
===================================== */

function sendWhatsAppOrder() {

    if (!orderInformation) return;

    if (!/^\d{10,15}$/.test(SELLER_WHATSAPP)) {

        alert("Please configure the seller's WhatsApp number in script.js.");

        return;

    }

    const order = orderInformation;

    const message = `Hello Urban Wear!

I would like to place the following order:

ORDER DETAILS
--------------------------
Product: ${order.productName}
Product ID: ${order.productId}
Size: ${order.size}
Quantity: ${order.quantity}
Unit Price: ${formatPrice(order.unitPrice)}
Total: ${formatPrice(order.total)}

CUSTOMER INFORMATION
--------------------------
Name: ${order.customerName}
Contact: ${order.customerPhone}
Email: ${order.customerEmail || "Not provided"}
Delivery Address: ${order.customerAddress}
Additional Notes: ${order.customerNotes || "None"}

Please confirm availability and delivery arrangements.

Thank you!`;


    const whatsappURL =
        `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the prepared order

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

}


/* =====================================
   INITIALISE WEBSITE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

});
