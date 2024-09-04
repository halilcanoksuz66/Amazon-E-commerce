export class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    };
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: 1
        }, {
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: 2
        }];
    };

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId) {
        const jsQuantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = parseInt(jsQuantitySelector.value);
        const item = this.cartItems.find((cartItem) => cartItem.id === productId);

        if (item) {
            item.quantity += quantity;
        } else {
            this.cartItems.push({
                id: productId,
                quantity: quantity,
                deliveryOptionId: 1
            });
        }

        this.saveToStorage();
    };

    removeFromCart(productId) {
        const item = this.cartItems.find((cartItem) => cartItem.id === productId);
        if (item) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
        }
        this.saveToStorage();
    };

    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    };

    updateQuantity(productId, quantity) {
        const item = this.cartItems.find((cartItem) => cartItem.id === productId);
        if (item) {
            item.quantity = quantity;
        }
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find((cartItem) => cartItem.id === productId);
        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };
}

export const cart = new Cart('cart-oop');
