import { cart } from "../../data/cart-class.js";

describe('test suite : addToCart', () => {
    beforeEach(() => {
        cart.cartItems.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });


    it('adds an existing product to the cart', () => {
        cart.cartItems.push({
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        });

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: 1
        }]))
        expect(cart.cartItems[0].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toBe(2);
    });


    it('adds a new product to the cart', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        }]))
        expect(cart.cartItems[0].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toBe(1);
    });
})

describe('test suite : removeFromCart', () => {
    beforeEach(() => {
        cart.cartItems.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });


    it('remove a productId that is in the cart ', () => {
        cart.cartItems.push({
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        });

        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]))
    });

    it('remove a productId that is not in the cart ', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]))
    });
})

describe('test suite : updateDeliveryOption', () => {
    beforeEach(() => {
        cart.cartItems.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });

    it('update the delivery option of a product in the cart', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);

        expect(cart.cartItems[0].deliveryOptionId).toBe(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    })

    it('update the delivery option of a product not in the cart', () => {
        cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })

    it('use a delivery option that is not in the list', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    })
})



