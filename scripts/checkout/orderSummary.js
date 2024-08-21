import { cart, addToCart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.id;
        let matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        let gettingDeliveryOption = getDeliveryOption(deliveryOptionId);
        const dateString = calculateDeliveryDate(gettingDeliveryOption);

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}"/>
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}"> Save </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked = deliveryOption.id == cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input
                type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                />
                <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">${priceString} Shipping</div>
                </div>
            </div>
            `
        })

        return html;
    }

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
    renderPaymentSummary();

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCart(productId);
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => { 
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

        });
    });


    document.querySelectorAll(".save-quantity-link").forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');
            const input = document.querySelector(`.js-quantity-input-${productId}`);
            validateAndUpdateQuantity(input, productId);
        });
    });

    document.querySelectorAll('.quantity-input').forEach((input) => {
        input.addEventListener('keydown', (event) => {
            const { productId } = input.dataset;
            if (event.key === 'Enter') {
                const saveButton = document.querySelector(`.save-quantity-link[data-product-id="${productId}"]`);
                saveButton.click();
            }
        });
    });


    function validateAndUpdateQuantity(input, productId) {
        const quantity = parseInt(input.value);
        if (isNaN(quantity)) {
            alert("Quantity must be a number");
            input.value = "";
        }
        else if (quantity < 0 || quantity > 1000) {
            alert("Quantity must be between 0 and 1000");
            input.value = "";
        }
        else {
            updateQuantity(productId, quantity);
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        }
    }
}

renderOrderSummary();

