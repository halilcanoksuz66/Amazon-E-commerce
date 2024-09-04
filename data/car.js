class Car {
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    go() {
        if (this.speed < 200 && this.isTrunkOpen === false) {
            this.speed += 5;
        }
    }

    brake() {
        if (this.speed > 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (!this.isTrunkOpen && this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        if (this.isTrunkOpen && this.speed === 0) {
            this.isTrunkOpen = false;
        }
    }

    displayInfo() {
        console.log(this.brand, this.model, "Speed: " + this.speed, "Trunk: " + this.isTrunkOpen);
    }
}

class RaceCar extends Car {
    accleration;
    constructor(brand, model, accleration) {
        super(brand, model);
        this.accleration = accleration;
    }

    go() {
        if (this.speed < 300) {
            this.speed += this.accleration;
        }
    }

    openTrunk() { }
    closeTrunk() { }

    displayInfo() {
        console.log(this.brand, this.model, "Speed: " + this.speed);
    }
}


const object1 = new Car("Toyota", "Corolla");
const object2 = new Car("Tesla", "Model 3");
object1.displayInfo();
object2.displayInfo();




const object3 = new RaceCar("Toyota", "Corolla", 5);
const object4 = new RaceCar("Tesla", "Model 3", 10);

object3.go();
object3.go();
object3.brake();
object3.displayInfo();

object4.go();
object4.go();
object4.brake();
object4.displayInfo();