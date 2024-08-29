import { cart, addToCart } from "../../data/cart.js";

describe('test suite : addToCart', () => {
    beforeEach(() => {
        const input = document.createElement('input');
        input.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        input.value = '1';
        document.body.appendChild(input);
        spyOn(localStorage, 'setItem');
    });


    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));

        cart.length = 1;


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(2);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        cart.length = 0;


        console.log(localStorage.getItem('cart'));
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toBe(1);
    });
})