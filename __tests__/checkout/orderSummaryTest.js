import { cart } from "../../data/cart-class.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadProducts } from "../../data/products.js";

describe('test suite : renderOrderSummary', () => {

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {

        spyOn(localStorage, 'setItem');
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: 1
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: 2
            }
        ];

        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(cart.cartItems));
    });

    afterEach(() => {
        document.querySelector('.js-order-summary').innerHTML = '';
    });

    it('displays the cart', () => {
        renderOrderSummary();

        const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        const product1Quantity = document.querySelector(`.js-product-quantity-${product1}`).innerText;
        const product2Quantity = document.querySelector(`.js-product-quantity-${product2}`).innerText;
        const product1Name = document.querySelector(`.js-product-name-${product1}`).innerText;
        const product2Name = document.querySelector(`.js-product-name-${product2}`).innerText;
        const product1Price = document.querySelector(`.js-product-price-${product1}`).innerText;
        const product2Price = document.querySelector(`.js-product-price-${product2}`).innerText;

        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
        expect(document.querySelector('.js-order-summary').innerHTML).toContain(product1);
        expect(document.querySelector('.js-order-summary').innerHTML).toContain(product2);
        expect(product1Name).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product2Name).toContain('Intermediate Size Basketball');
        expect(product1Price).toContain('$10.90');
        expect(product2Price).toContain('$20.95');
        expect(product1Quantity).toContain('Quantity: 2');
        expect(product2Quantity).toContain('Quantity: 1');
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
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(product2);
    })

    it('updating the delivery option', () => {
        renderOrderSummary();
        const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const specificDiv = document.querySelector(`[data-product-id= ${product1}][data-delivery-option-id="3"]`);
        specificDiv.querySelector('.delivery-option-input').click();
        const input = specificDiv.querySelector('.delivery-option-input');
        expect(input.checked).toBe(true);
        expect(cart.cartItems.length).toEqual(2);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

        const shippingPriceCents = document.querySelector('.js-payment-shipping-price').innerText;
        const totalPriceCents = document.querySelector('.js-payment-total-price').innerText;
        expect(shippingPriceCents).toContain('$14.98');
        expect(totalPriceCents).toContain('$63.50');
    })
});
