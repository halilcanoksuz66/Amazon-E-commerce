import { cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe('test suite : renderOrderSummary', () => {

    beforeEach(() => {

        spyOn(localStorage, 'setItem');
        cart.length = 0;
        cart.push(
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: 1
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: 2
            }
        );

        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(cart));
    });

    it('displays the cart', () => {
        renderOrderSummary();

        const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        const product1Quantity = document.querySelector(`.js-product-quantity-${product1}`).innerText;
        const product2Quantity = document.querySelector(`.js-product-quantity-${product2}`).innerText;

        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
        expect(document.querySelector('.js-order-summary').innerHTML).toContain(product1);
        expect(document.querySelector('.js-order-summary').innerHTML).toContain(product2);
        expect(product1Quantity).toContain('Quantity: 2');
        document.querySelector(`.js-order-summary`).innerHTML = ''; // ekran biraz temizlensin .d
    });

    it('remove a product', () => {
        document.body.innerHTML += `<div class="header-content"></div>`;
        const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        renderOrderSummary();
        document.querySelector(`.js-delete-link[data-product-id="${product1}"]`).click();

        expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${product1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${product2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(product2);
    })
});
