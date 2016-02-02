"use strict";

class Shape {
    static get TYPE_MM() {
        return 'mm';
    }
    static get TYPE_CM() {
        return 'cm';
    }
    static get TYPE_M() {
        return 'm';
    }
    constructor(type) {
        this.shapeType = type || 'shape'
    }
    static getFormattedOutputArea(value, units) {
        units = units || Shape.TYPE_MM;
        switch (units) {
            case Shape.TYPE_MM:
                return value * 1000000 + 'mm^2';
            case Shape.TYPE_CM:
                return value * 10000 + 'cm^2';
            case Shape.TYPE_M:
                return value + 'm^2';
        }

    }
    static getFormattedOutputLength(value, units) {
        units = units || Shape.TYPE_MM;
        switch (units) {
            case Shape.TYPE_MM:
                return value * 1000 + Shape.TYPE_MM;
                break;
            case Shape.TYPE_CM:
                return value * 100 + Shape.TYPE_CM;
                break;
            case Shape.TYPE_M:
                return value + Shape.TYPE_M;
                break;
        }

    }
    getPerimeter(units) {
        return Shape.getFormattedOutputLength(this.calculatePerimeter(), units);
    }

    getArea(units) {
        return Shape.getFormattedOutputArea(this.calculateArea(), units);
    }
}

class Polygon extends Shape {
    constructor(type) {
        super(type);
        this.sides = {};
    }
    calculatePerimeter() {
        var perimeter = 0;
        for (var sideName in this.sides) {
            //console.log(sideName + this.sides[sideName]);
            perimeter += this.sides[sideName];
        }
        return perimeter
    }
    getSides(units) {
        var sidesPrint = "";
        for (var sideName in this.sides) {
            //console.log(sideName + this.sides[sideName]);
            sidesPrint += sideName + ':' +
                Shape.getFormattedOutputLength(this.sides[sideName], units) + ' ';
        }
        return sidesPrint;
    }
    getDescription(units) {
        return 'Type:' + this.shapeType + ' Sides:[' + this.getSides(units) + ']' +
            ' Perimeter:' + this.getPerimeter(units) +
            ' Area:' + this.getArea(units);
    }
    toString() {
        return this.getDescription(Shape.TYPE_MM);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
    calculatePerimeter() {
        return 2 * Math.PI * this.radius;
    }
    getDescription(units) {
        return 'Type:' + this.shapeType + ' Radius:' + this.radius +
            ' Perimeter:' + this.getPerimeter(units) +
            ' Area:' + this.getArea(units);
    }
    toString() {
        return this.getDescription(Shape.TYPE_MM);
    }
}

class Triangle extends Polygon {
    constructor(lengthA, lengthB, lengthC) {
        super("Triangle");
        this.sides.sideA = lengthA;
        this.sides.sideB = lengthB;
        this.sides.sideC = lengthC;
    }
    calculateArea() {
        var semiPerimeter = this.calculatePerimeter() / 2;
        return Math.sqrt(semiPerimeter *
            (semiPerimeter - this.sides.sideA) *
            (semiPerimeter - this.sides.sideB) *
            (semiPerimeter - this.sides.sideC)
        );
    }
}

class Rectangle extends Polygon {
    constructor(lengthA, lengthB) {
        super("Rectangle");
        this.sides.sideA = lengthA;
        this.sides.sideB = lengthB;
        this.sides.sideC = lengthA;
        this.sides.sideD = lengthB;
    }
    calculateArea() {
        return this.sides.sideA * this.sides.sideB;
    }
}

class Trapezoid extends Polygon {
    constructor(baseA, lengthB, baseB, lengthD, height) {
        super("Trapezoid");
        this.sides.sideA = baseA;
        this.sides.sideB = lengthB;
        this.sides.sideC = baseB;
        this.sides.sideD = lengthD;
        this.heigth = height;
    }
    calculateArea() {
        var semiPerimeter = this.calculatePerimeter() / 2;
        return (this.sides.sideA + this.sides.sideC) / 2 * this.heigth;
    }
}

