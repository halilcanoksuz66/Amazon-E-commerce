import { cart, addToCart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite : addToCart', () => {
    beforeEach(() => {
        cart.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });


    it('adds an existing product to the cart', () => {
        cart.push({
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: 1
        }]))
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(2);
    });


    it('adds a new product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        }]))
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(1);
    });
})

describe('test suite : removeFromCart', () => {
    beforeEach(() => {
        cart.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });


    it('remove a productId that is in the cart ', () => {
        cart.push({
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
        });

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
    });

    it('remove a productId that is not in the cart ', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
    });
})

describe('test suite : updateDeliveryOption', () => {
    beforeEach(() => {
        cart.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });

    it('update the delivery option of a product in the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);

        expect(cart[0].deliveryOptionId).toBe(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    })

    it('update the delivery option of a product not in the cart', () => {
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })

    it('use a delivery option that is not in the list', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    })
})



