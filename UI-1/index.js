function expandBtn(checkbox) {
    var checkboxes = document.getElementsByName(checkbox.name)
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the navbar links and checkboxes
    const navAddEmployee = document.getElementById("addEmployee");
    const navAddVehicle = document.getElementById("addVehicle");
    const collapsibleEmployee = document.getElementById("giveFeedback");
    const collapsibleVehicle = document.getElementById("pricing");

    // Add click event listener to "Add Employee" link
    navAddEmployee.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default link behavior
        collapsibleEmployee.checked = true; // Check the corresponding checkbox
        collapsibleVehicle.checked = false; // Uncheck the other checkbox
    });

    // Add click event listener to "Add Vehicle" link
    navAddVehicle.addEventListener("click", (e) => {
        e.preventDefault();
        collapsibleVehicle.checked = true; // Check the corresponding checkbox
        collapsibleEmployee.checked = false; // Uncheck the other checkbox
    });
});
