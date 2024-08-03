export const cart = []

export function addToCart(productId) {
    const jsQuantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = parseInt(jsQuantitySelector.value);
    const item = cart.find((cartItem) => cartItem.id === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        });
    }
}