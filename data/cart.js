export let cart = JSON.parse(localStorage.getItem("cart"));


if (!cart) {
    cart = [{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: 1
    }, {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: 2
    }];
}



function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    const jsQuantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = parseInt(jsQuantitySelector.value);
    const item = cart.find((cartItem) => cartItem.id === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            deliveryOptionId: 1
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (item) {
        cart.splice(cart.indexOf(item), 1);
    }

    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, quantity) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (item) {
        item.quantity = quantity;
    }

    saveToStorage();
}