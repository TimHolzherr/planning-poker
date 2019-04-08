import { Injectable } from "@angular/core";

const goldenRatio = 0.618033988749895;

@Injectable({
    providedIn: "root",
})
export class ColorService {
    private lastRandomNumber: number;

    constructor() {
        this.lastRandomNumber = Math.random();
    }

    public nextRandomColor(): string {
        return `hsl(${this.getHue()}, ${this.getSaturation()}, ${this.getLightness()})`;
    }

    private getHue(): string {
        return (this.nextEvenlySpreadRandom() * 360).toString();
    }

    private getSaturation(): string {
        return "50%";
    }

    private getLightness(): string {
        return "88%";
    }

    // Uses golden ratio to ensure that colors are evenly spread
    private nextEvenlySpreadRandom(): number {
        this.lastRandomNumber = (this.lastRandomNumber + goldenRatio) % 1;
        return this.lastRandomNumber;
    }
}
