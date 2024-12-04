document.addEventListener("DOMContentLoaded", function () {
    var currentStep = 0;
    var employeeData = {};
    var steps = [{
        id: "fname",
        type: "text",
        label: "Enter your full name:",
        placeholder: "Enter full name",
        validate: function (value) {
            var isValid = value.length >= 2 && !/\d/.test(value);
            return isValid ? "" : "Name must be at least 2 characters and not contain numbers.";
        },
    }, {
        id: "gender",
        type: "select",
        label: function (name) {
            return "Hi " + name + "! Can I know your gender?";
        },
        options: ["Male", "Female", "Other"],
    }, {
        id: "email",
        type: "email",
        label: "Enter your email address:",
        placeholder: "Enter Email ID",
        validate: function (value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? "" : "Please enter a valid email address.";
        },
    }, {
        id: "pwd",
        type: "password",
        label: "Create a strong password:",
        placeholder: "Enter Password",
        validate: function (value) {
            var hasUppercase = /[A-Z]/.test(value);
            var hasLowercase = /[a-z]/.test(value);
            var hasNumber = /\d/.test(value);
            var hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            var isValid = value.length >= 8 && hasUppercase && hasLowercase && hasNumber && hasSpecial;
            return isValid ? "" : "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
        },
    }, {
        id: "confirmpassword",
        type: "password",
        label: "Confirm your password:",
        placeholder: "Confirm Password",
        validate: function (value) {
            return value === employeeData["pwd"] ? "" : "Passwords do not match.";
        },
    }, {
        id: "mobile",
        type: "tel",
        label: "Enter your mobile number:",
        placeholder: "Enter Mobile Number",
        validate: function (value) {
            return /^\d{9,}$/.test(value) ? "" : "Contact number must be numeric and at least 9 digits.";
        },
    },];
    var formContainer = document.querySelector(".content-inner");
    var submitButton = document.querySelector(".form-submit-btn");

    function validatePasswordStrength(password) {
        if (password.length < 8) return "Weak";
        if (password.length < 12) return "Normal";
        return "Strong";
    }

    function renderStep() {
        formContainer.innerHTML = "";
        var step = steps[currentStep];
        var label = document.createElement("label");
        label.setAttribute("for", step.id);
        label.textContent = typeof step.label === "function" ? step.label(employeeData.fname || "") : step.label;
        var input;
        if (step.type === "select") {
            input = document.createElement("select");
            input.id = step.id;
            input.name = step.id;
            input.required = true;
            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select Gender";
            input.appendChild(defaultOption);
            for (var i = 0; i < step.options.length; i++) {
                var optionElement = document.createElement("option");
                optionElement.value = step.options[i].toLowerCase();
                optionElement.textContent = step.options[i];
                input.appendChild(optionElement);
            }
        } else {
            input = document.createElement("input");
            input.type = step.type;
            input.id = step.id;
            input.name = step.id;
            input.placeholder = step.placeholder || "";
            input.required = true;
        }
        var errorMessage = document.createElement("small");
        errorMessage.style.color = "red";
        errorMessage.style.display = "none";
        var passwordStrengthMessage = document.getElementById("password-strength-message") || document.createElement("p");
        passwordStrengthMessage.id = "password-strength-message";
        passwordStrengthMessage.style.display = "none";
        formContainer.appendChild(label);
        formContainer.appendChild(input);
        formContainer.appendChild(errorMessage);
        if (step.id === "pwd") {
            formContainer.appendChild(passwordStrengthMessage);
            input.addEventListener("input", function () {
                var strength = validatePasswordStrength(input.value);
                input.className = strength.toLowerCase();
                passwordStrengthMessage.textContent = strength === "Weak" ? "Weak password!" : strength === "Normal" ? "Normal password! Try adding some numbers and special characters." : "Strong password!";
                passwordStrengthMessage.style.display = "block";
            });
        }
    }
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        var step = steps[currentStep];
        var input = document.getElementById(step.id);
        if (!input || !input.value.trim()) {
            alert("This field is required!");
            return;
        }
        var validationError = step.validate ? step.validate(input.value.trim()) : "";
        if (validationError) {
            var errorMessage = formContainer.querySelector("small");
            errorMessage.textContent = validationError;
            errorMessage.style.display = "block";
            return;
        }
        employeeData[step.id] = input.value.trim();
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        } else {
            alert("Employee registered successfully! Your registration ID is EMP-" + Math.floor(Math.random() * 10000));
            console.log("Employee Data:", employeeData);
            currentStep = 0;
            renderStep();
            var collapsibleCheckbox = document.getElementById("employee-collapsible");
            if (collapsibleCheckbox) collapsibleCheckbox.checked = false;
        }
    });
    renderStep();
});