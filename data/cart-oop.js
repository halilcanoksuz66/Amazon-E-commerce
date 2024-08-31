import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        loadFromStorage: function () {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: 1
            }, {
                id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: 2
            }];
        },
        saveToStorage: function () {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },


        addToCart: function (productId) {
            let matchingItem = this.cartItems.find((cartItem) => cartItem.id === productId);
            if (matchingItem) {
                matchingItem.quantity++;
            } else {
                this.cartItems.push({
                    id: productId,
                    quantity: 1,
                    deliveryOptionId: 1
                });
            }
            this.saveToStorage();
        },
        removeFromCart: function (productId) {
            const item = this.cartItems.find((cartItem) => cartItem.id === productId);
            if (item) {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
            this.saveToStorage();
        },

        calculateCartQuantity: function () {
            let cartQuantity = 0;
            this.cartItems.forEach(cartItem => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },

        updateQuantity: function (productId, quantity) {
            const item = this.cartItems.find((cartItem) => cartItem.id === productId);
            if (item) {
                item.quantity = quantity;
            }

            this.saveToStorage();
        },
        updateDeliveryOption: function (productId, deliveryOptionId) {
            let matchingItem = this.cartItems.find((cartItem) => cartItem.id === productId);
            matchingItem.id = deliveryOptionId;
            this.saveToStorage();
        }
    }

    return cart
}


const cart = Cart('cart');
const businessCart = Cart('businessCart');



cart.loadFromStorage()
businessCart.loadFromStorage()
console.log(cart);
console.log(businessCart);






