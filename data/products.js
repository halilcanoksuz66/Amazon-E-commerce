import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct = products.find((product) => product.id === productId);
  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML() {
    return "";
  }
}

export class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}">Size Chart</a>`
  }
}

export class Appliance extends Product {
  instructionLink;
  warrantyLink;
  constructor(productDetails) {
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.instructionLink}">Instruction Manual</a>
    <a href="${this.warrantyLink}">Warranty Information</a>
  `;
  }
}

export let products = [];

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function () {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      } else if (productDetails.type === "appliance") {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    callback();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}



