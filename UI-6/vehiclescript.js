document.addEventListener("DOMContentLoaded", function () {
    var currentStep = 0;
    var vehicleData = {};
    var steps = [
        {
            id: "vname",
            type: "text",
            label: "Enter vehicle name:",
            placeholder: "Vehicle Name",
            validate: function (value) {
                return value.length >= 2 && !/\d/.test(value); // Minimum 2 chars, no digits
            },
            errorMsg: "Vehicle name must be at least 2 characters and cannot contain numbers.",
        },
        {
            id: "vtype",
            type: "select",
            label: function (name) {
                return 'Hi! Which type of vehicle is "' + name + '"?';
            },
            options: ["cycle", "motorcycle", "four-wheeler"],
        },
        {
            id: "vnumber",
            type: "text",
            label: "Enter vehicle number:",
            placeholder: "Vehicle Number (Alphanumeric)",
            validate: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value); // Alphanumeric check
            },
            errorMsg: "Vehicle number must be alphanumeric without spaces.",
        },
        {
            id: "empid",
            type: "text",
            label: "Enter employee ID associated with the vehicle:",
            placeholder: "Employee ID",
            validate: function (value) {
                return /^\d+$/.test(value); // Numeric only
            },
            errorMsg: "Employee ID must be numeric.",
        },
        {
            id: "identification",
            type: "textarea",
            label: "Enter vehicle identification details:",
            placeholder: "Provide additional details (optional)",
        },
    ];

    var formContainer = document.querySelector(".vehicle-content-inner");
    var submitButton = document.querySelector(".vehicle-form-submit-btn");

    function renderStep() {
        formContainer.innerHTML = "";
        var step = steps[currentStep];
        var label = document.createElement("label");
        label.setAttribute("for", step.id);
        label.textContent = typeof step.label === "function" ? step.label(vehicleData.vname || "") : step.label;

        var input;
        if (step.type === "select") {
            input = document.createElement("select");
            input.id = step.id;
            input.name = step.id;
            input.required = true;

            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select Type";
            input.appendChild(defaultOption);

            for (var i = 0; i < step.options.length; i++) {
                var optionElement = document.createElement("option");
                optionElement.value = step.options[i].toLowerCase();
                optionElement.textContent = step.options[i];
                input.appendChild(optionElement);
            }

            input.addEventListener("change", function (e) {
                vehicleData[step.id] = e.target.value; // Storing selected vehicle type
                showPricing(vehicleData[step.id]); // Call the show pricing function with selected vehicle type
            });
        } else if (step.type === "textarea") {
            input = document.createElement("textarea");
            input.id = step.id;
            input.name = step.id;
            input.placeholder = step.placeholder || "";
        } else {
            input = document.createElement("input");
            input.type = step.type;
            input.id = step.id;
            input.name = step.id;
            input.placeholder = step.placeholder || "";
        }

        formContainer.appendChild(label);
        formContainer.appendChild(input);
    }

    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        var step = steps[currentStep];
        var input = document.getElementById(step.id);

        if (!input || !input.value.trim()) {
            alert("This field is required!");
            return;
        }

        if (step.validate && !step.validate(input.value.trim())) {
            alert(step.errorMsg || "Invalid input.");
            return;
        }

        vehicleData[step.id] = input.value.trim();
        if (currentStep === 0) {
            vehicleData.vname = input.value.trim();
        }

        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        } else {
            alert(
                "Vehicle registered successfully! Registration ID: VEH-" +
                Math.floor(Math.random() * 10000)
            );
            console.log("Vehicle Data:", vehicleData);

            currentStep = 0;
            renderStep();

            var collapsibleCheckbox = document.getElementById("vehicle-collapsible");
            if (collapsibleCheckbox) {
                collapsibleCheckbox.checked = false;
            }
        }
    });

    renderStep();
});
