class Employee {
    private employeeId: string;
    private fullName: string;
    private gender: string;
    private email: string;
    private mobile: string;

    constructor(employeeId: string, fullName: string, gender: string, email: string, mobile: string) {
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.gender = gender;
        this.email = email;
        this.mobile = mobile;
    }

    public getDetails(): string {
        return `Employee ID: ${this.employeeId}, Name: ${this.fullName}, Gender: ${this.gender}, Email: ${this.email}, Mobile: ${this.mobile}`;
    }
}
