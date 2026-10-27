

let cart = JSON.parse(localStorage.getItem("cart")) || [];




function addToCart(name, price) {

    price = Number(price);

    let existingItem = cart.find(
        item => item.name === name
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    saveCart();

    alert(name + " added to cart! ☕");

}




function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}



function displayCart() {

    const container =
        document.getElementById("cart-container");

    const totalElement =
        document.getElementById("cart-total");


    /*
       This page may not contain
       cart-container.
    */

    if (!container) {
        updateCartCount();
        return;
    }


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty ☕</h2>

                <p>
                    Add some delicious coffee
                    from our menu!
                </p>

                <a
                    href="menu.html"
                    class="btn">

                    EXPLORE MENU

                </a>

            </div>

        `;


        if (totalElement) {
            totalElement.textContent = "0";
        }

        updateCartCount();

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                        ×
                        ${item.quantity}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <div class="item-price">

                    ₹${itemTotal}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    updateCartCount();

}




function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity++;

    saveCart();

}



function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

}




function removeItem(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);

    saveCart();

}




function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty.");

        return;

    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (confirmClear) {

        cart = [];

        saveCart();

    }

}



function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! Add some coffee first. ☕"
        );

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    alert(
        "Thank you for ordering from BREW & BEAN! ☕❤️\n" +
        "Your order is received.\n" +
        "Your order ID is #" +
        Math.floor(Math.random() *1000000) +
        ".\n" +
        "Your total is ₹" +
        total +
        "."
    );

}




function sendMessage(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        "Thank you, " +
        name +
        "! ❤️\n\n" +
        "Your message has been received by BREW & BEAN."
    );


    const form =
        document.querySelector(".contact-form form");


    if (form) {

        form.reset();

    }

}


function updateCartCount() {

    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    let count = 0;
    cart.forEach(item => {

        count += item.quantity;

    });

    cartLinks.forEach(link => {

        link.innerHTML =
            "🛒 CART (" + count + ")";

    });

}
document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);