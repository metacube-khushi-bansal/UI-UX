class Vehicle {
    private vehicleId: string;
    private ownerId: string;
    private type: string;

    constructor(vehicleId: string, ownerId: string, type: string) {
        this.vehicleId = vehicleId;
        this.ownerId = ownerId;
        this.type = type;
    }

    public getVehicleDetails(): string {
        return `Vehicle ID: ${this.vehicleId}, Owner ID: ${this.ownerId}, Type: ${this.type}`;
    }
}