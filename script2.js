
let basket = JSON.parse(localStorage.getItem("basket")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
    let ShoppingCart = document.getElementById("ShoppingCart");
    let label = document.getElementById("label");

    if (basket.length !== 0) {
        ShoppingCart.innerHTML = basket.map((item) => `
            <div class="cart-item">
                <h5>${item.name}</h5>
                <p>Quantity: ${item.item}</p>
                <p>Price: Rs.${item.price * item.item}</p>
            </div>
        `).join('');
    } else {
        ShoppingCart.innerHTML = '';
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="shop.html">Continue Shopping</a>
        `;
    }
};
generateCartItems();

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        let productId = event.target.dataset.productId;
        let productName = event.target.parentElement.querySelector('h5').innerText;
        let productPrice = parseFloat(event.target.parentElement.querySelector('h4').innerText.replace('Rs.', ''));
        
        let existingItem = basket.find(item => item.id === productId);

        if (existingItem) {
            existingItem.item += 1;
        } else {
            basket.push({
                id: productId,
                name: productName,
                price: productPrice,
                item: 1
            });
        }

       
        localStorage.setItem("basket", JSON.stringify(basket));

        
        calculation();
        generateCartItems();
    });
});
