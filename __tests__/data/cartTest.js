import { cart, addToCart } from "../../data/cart.js";

describe('test suite : addToCart', () => {
    beforeEach(() => {
        cart.length = 0;
        spyOn(localStorage, 'setItem');
        document.body.innerHTML += `
        <input class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6" value="1">`
    });


    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));

        cart.push({
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(2);
    });


    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(1);
    });
})