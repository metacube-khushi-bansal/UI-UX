document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 0;
    const employeeData = {};
    const steps = [{
        id: "fname",
        type: "text",
        label: "Enter your full name:",
        placeholder: "Enter full name",
        validate: (value) => {
            const isValid = value.length >= 2 && !/\d/.test(value);
            return isValid ? "" : "Name must be at least 2 characters and not contain numbers.";
        },
    }, {
        id: "gender",
        type: "select",
        label: (name) => `Hi ${name}! Can I know your gender?`,
        options: ["Male", "Female", "Other"],
    }, {
        id: "email",
        type: "email",
        label: "Enter your email address:",
        placeholder: "Enter Email ID",
        validate: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(value);
            return isValid ? "" : "Please enter a valid email address.";
        },
    }, {
        id: "pwd",
        type: "password",
        label: "Create a strong password:",
        placeholder: "Enter Password",
        validate: (value) => {
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const isValid = value.length >= 8 && hasUppercase && hasLowercase && hasNumber && hasSpecial;
            return isValid ? "" : "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
        },
    }, {
        id: "confirmpassword",
        type: "password",
        label: "Confirm your password:",
        placeholder: "Confirm Password",
        validate: (value) => {
            const isValid = value === employeeData["pwd"];
            return isValid ? "" : "Passwords do not match.";
        },
    }, {
        id: "mobile",
        type: "tel",
        label: "Enter your mobile number:",
        placeholder: "Enter Mobile Number",
        validate: (value) => {
            const isValid = /^\d{9,}$/.test(value);
            return isValid ? "" : "Contact number must be numeric and at least 9 digits.";
        },
    },];
    const formContainer = document.querySelector(".content-inner");
    const submitButton = document.querySelector(".form-submit-btn");
    const renderStep = () => {
        formContainer.innerHTML = "";
        const step = steps[currentStep];
        const label = document.createElement("label");
        label.setAttribute("for", step.id);
        label.textContent = typeof step.label === "function" ? step.label(employeeData.fname || "") : step.label;
        let input;
        if (step.type === "select") {
            input = document.createElement("select");
            input.id = step.id;
            input.name = step.id;
            input.required = true;
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select Gender";
            input.appendChild(defaultOption);
            step.options.forEach((option) => {
                const optionElement = document.createElement("option");
                optionElement.value = option.toLowerCase();
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else {
            input = document.createElement("input");
            input.type = step.type;
            input.id = step.id;
            input.name = step.id;
            input.placeholder = step.placeholder || "";
            input.required = true;
        }

        const validatePasswordStrength = (password) => {
            // const hasUppercase = /[A-Z]/.test(password);
            // const hasLowercase = /[a-z]/.test(password);
            // const hasNumber = /\d/.test(password);
            // const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            // const isWeak = password.length < 8 || hasLowercase;
            // const isNormal = password.length >= 8 && password.length < 12 && hasLowercase && hasUppercase && hasNumber;
            // const isStrong = password.length >= 12 && hasLowercase && hasUppercase && hasNumber && hasSpecial;
            // if (isWeak) return "Weak";
            // if (isNormal) return "Normal";
            // if (isStrong) return "Strong";
            // return "Strong";
            if (password.length < 8) return "Weak";
            if (password.length < 12) return "Normal";
            return "Strong";
        };



        const errorMessage = document.createElement("small");
        errorMessage.style.color = "red";
        errorMessage.style.display = "none"; // Initially hidden

        const passwordStrengthMessage = document.getElementById("password-strength-message");
        if (passwordStrengthMessage) {
            passwordStrengthMessage.style.display = "none";
        }
        formContainer.appendChild(label);
        formContainer.appendChild(input);
        formContainer.appendChild(errorMessage);
        if (step.id === "pwd") {
            input.addEventListener("input", () => {
                const strength = validatePasswordStrength(input.value);
                input.classList.remove("weak", "normal", "strong");
                passwordStrengthMessage.classList.remove("weak", "normal", "strong");

                switch (strength) {
                    case "Weak":
                        input.classList.add("weak");
                        passwordStrengthMessage.classList.add("weak");
                        passwordStrengthMessage.textContent = "Weak password!"
                        passwordStrengthMessage.style.display = "block";
                        break;
                    case "Normal":
                        input.classList.add("normal");
                        passwordStrengthMessage.classList.add("normal");
                        passwordStrengthMessage.textContent = "Normal password! Try adding some numbers and special characters"
                        passwordStrengthMessage.style.display = "block";
                        break;
                    case "Strong":
                        input.classList.add("strong");
                        passwordStrengthMessage.classList.add("strong");
                        passwordStrengthMessage.textContent = "Strong password!"
                        passwordStrengthMessage.style.display = "block";
                        break;
                }




            });
            passwordStrengthMessage.style.display = "none";
        }
    };

    submitButton.addEventListener("click", (e) => {
        e.preventDefault(); // avoid getting submitted
        const step = steps[currentStep];
        const input = document.getElementById(step.id);
        if (!input || !input.value.trim()) {
            alert("This field is required!");
            return;
        }

        // if(step.id ==="pwd"){
        //     const strength = validatePasswordStrength(input.value.trim());
        //     if(strength === "Weak" ||  strength === "Normal"){
        //         alert("Please improve your password strenth before proceeding.");
        //         return ;
        //     }
        // }
        const validationError = step.validate ? step.validate(input.value.trim()) : "";
        if (validationError) {
            const errorMessage = formContainer.querySelector("small");
            errorMessage.textContent = validationError;
            errorMessage.style.display = "block";
            return;
        }
        employeeData[step.id] = input.value.trim();
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        }
        else {   // you are at the end step
            alert(`Employee registered successfully! Your registration ID is EMP-${Math.floor(Math.random() * 10000)}`);
            console.log("Employee Data:", employeeData);
            currentStep = 0;
            renderStep();

            const collapsibleCheckbox = document.getElementById("employee-collapsible");
            if (collapsibleCheckbox) {
                collapsibleCheckbox.checked = false;
            }

        }
    });
    renderStep();
});