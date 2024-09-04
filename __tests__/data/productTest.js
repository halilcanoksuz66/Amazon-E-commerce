import { Product, Clothing, Appliance } from "../../data/products.js";


describe('test suite : Checking Product, Clothing, Appliance classes', () => {
    it('creates an instance of Product', () => {
        const product = new Product({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
        expect(product instanceof Product).toBe(true);
        expect(product.getStarsUrl()).toBe("images/ratings/rating-45.png");
        expect(product.getPrice()).toBe("$7.99");
        expect(product.extraInfoHTML()).toBe('');
    });


    it('creates an instance of Clothing', () => {
        const product = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plainotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
        expect(product instanceof Clothing).toBe(true);
        expect(product.getStarsUrl()).toBe("images/ratings/rating-45.png");
        expect(product.getPrice()).toBe("$7.99");
        expect(product.extraInfoHTML()).toBe('<a href="images/clothing-size-chart.png">Size Chart</a>');
    });


    it('creates an instance of Appliance', () => {
        const product = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: "appliance",
            instructionLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        });
        expect(product instanceof Appliance).toBe(true);
        expect(product.getStarsUrl()).toBe("images/ratings/rating-50.png");
        expect(product.getPrice()).toBe("$18.99");
        expect(product.extraInfoHTML()).toMatch(/<a href="images\/appliance-instructions.png">Instruction Manual<\/a>\s*<a href="images\/appliance-warranty.png">Warranty Information<\/a>/);
    });
})