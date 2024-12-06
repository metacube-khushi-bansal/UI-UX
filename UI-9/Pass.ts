// Pass Class
class Pass {
    private passId: string;
    private employeeId: string;
    private vehicleId?: string;
    private validity: Date;

    constructor(passId: string, employeeId: string, validity: Date, vehicleId?: string) {
        this.passId = passId;
        this.employeeId = employeeId;
        this.validity = validity;
        this.vehicleId = vehicleId;
    }

    public getPassDetails(): string {
        return `Pass ID: ${this.passId}, Employee ID: ${this.employeeId}, Validity: ${this.validity.toISOString()}, Vehicle ID: ${this.vehicleId || "N/A"}`;
    }
}
