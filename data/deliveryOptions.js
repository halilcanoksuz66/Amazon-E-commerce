import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: 1,
    deliveryDays: 7,
    priceCents: 0
}, {
    id: 2,
    deliveryDays: 3,
    priceCents: 499
},
{
    id: 3,
    deliveryDays: 1,
    priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption = deliveryOptions.find((deliveryOption) => deliveryOption.id == deliveryOptionId);
    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    let today = dayjs();
    let deliveryDateCount = deliveryOption.deliveryDays;

    while (deliveryDateCount > 0) {
        today = today.add(1, 'day');

        if (today.format('dddd') !== 'Saturday' && today.format('dddd') !== 'Sunday') {
            deliveryDateCount--;
        }
    }

    const dateString = today.format('dddd, MMMM D');
    return dateString;
}
