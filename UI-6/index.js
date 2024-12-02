document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 0;
    const employeeData = {};
    const steps = [{
        id: "fname",
        type: "text",
        label: "Enter your full name:",
        placeholder: "Enter full name",
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
    }, {
        id: "pwd",
        type: "password",
        label: "Create a strong password:",
        placeholder: "Enter Password",
    }, {
        id: "confirmpassword",
        type: "password",
        label: "Confirm your password:",
        placeholder: "Confirm Password",
    }, {
        id: "mobile",
        type: "tel",
        label: "Enter your mobile number:",
        placeholder: "Enter Mobile Number",
    }, ];
    const formContainer = document.querySelector(".content-inner");
    const submitButton = document.querySelector(".form-submit-btn");
    // Render Form Step 
    const renderStep = () => {
        formContainer.innerHTML = "";
        // Clear previous step      
        const step = steps[currentStep];
        // Create label     
        const label = document.createElement("label");
        label.setAttribute("for", step.id);
        label.textContent = typeof step.label === "function" ? step.label(employeeData.fname || "") : step.label;
        // Create input/select element     
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
        // Append elements to the form    
        formContainer.appendChild(label);
        formContainer.appendChild(input);
        // Handle Password Strength Validation 
        if (step.id === "pwd") {
            input.addEventListener("input", () => {
                const strength = validatePasswordStrength(input.value);
                switch (strength) {
                    case "Weak":
                        input.style.borderColor = "red";
                        break;
                    case "Normal":
                        input.style.borderColor = "orange";
                        break;
                    case "Strong":
                        input.style.borderColor = "green";
                        break;
                }
            });
        }
    };
    // Validate Password Strength  
    const validatePasswordStrength = (password) => {
        if (password.length < 6) return "Weak";
        if (password.length < 10) return "Normal";
        return "Strong";
    };
    // Handle Form Submission    
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const step = steps[currentStep];
        const input = document.getElementById(step.id);
        // Validate Input
        if (!input || !input.value.trim()) {
            alert("This field is required!");
            return;
        }
        // Save the input data  
        employeeData[step.id] = input.value.trim();
        // Special handling for full name input  
        if (currentStep === 0) {
            employeeData.fname = input.value.trim();
        }
        // Move to the next step    
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        } else { // Registration Complete    

            alert(`Employee registered successfully!`);
            console.log("Employee Data:", employeeData);
            // Debugging          
            currentStep = 0;
            renderStep(); // Reset Form  
        }
    });
    // Initialize the first step  
    renderStep();
});