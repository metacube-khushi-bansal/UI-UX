var vehiclePricing = {
    "cycle": {
        daily: 5,
        monthly: 100,
        yearly: 500
    },
    "motorcycle": {
        daily: 10,
        monthly: 200,
        yearly: 1000
    },
    "four-wheeler": {
        daily: 20,
        monthly: 500,
        yearly: 3500
    }
};
var selectedVehicle = "";
var selectedPlan = "";
var selectedCurrency = "INR";
// Function to show only the selected vehicle pricing card
function showPricing(vehicleType) {
    document.getElementById("cycle-pricing").style.display = "none";
    document.getElementById("motorcycle-pricing").style.display = "none";
    document.getElementById("four-wheeler-pricing").style.display = "none";
    if (vehicleType === "cycle") {
        document.getElementById("cycle-pricing").style.display = "block";
        document.getElementById("cycle-price-monthly").innerText = "₹" + vehiclePricing.cycle.monthly + " /month";
    } else if (vehicleType === "motorcycle") {
        document.getElementById("motorcycle-pricing").style.display = "block";
        document.getElementById("motorcycle-price-monthly").innerText = "₹" + vehiclePricing.motorcycle.monthly + " /month";
    } else if (vehicleType === "four-wheeler") {
        document.getElementById("four-wheeler-pricing").style.display = "block";
        document.getElementById("four-wheeler-price-monthly").innerText = "₹" + vehiclePricing["four-wheeler"].monthly + " /month";
    }
}

// Function to handle plan selection
function selectPlan(vehicleType) {
    selectedVehicle = vehicleType;
    var vehicle = vehiclePricing[vehicleType];
    // Show plan options as radio buttons
    var planOptions =
        '<form>' +
        '<label class="radio-container">' +
        '<input type="radio" name="plan" value="daily"> ' +
        '<span class="radio-label">Daily: ₹' +
        vehicle.daily + '</span>' +
        '</label><br>' +
        '<label class="radio-container">' +
        '<input type="radio" name="plan" value="monthly"> ' +
        '<span class="radio-label">Monthly: ₹' + vehicle.monthly +
        '</span>' + '</label><br>' +

        '<label class="radio-container">' +
        '<input type="radio" name="plan" value="yearly"> ' +
        '<span class="radio-label">Yearly: ₹' +
        vehicle.yearly + '</span>' +
        '</label>' + '</form>';
    document.getElementById(vehicleType + "-plan-options").innerHTML = planOptions;
    // Hide "Select Plan" button and show "Get Pass" button
    document.querySelector("#" + vehicleType + "-pricing .purchase-btn").style.display = "none";
    document.querySelector(".selected-plan").style.display = "block";
    // Set event listener for plan selection
    var radios = document.querySelectorAll('input[name="plan"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", function (event) {
            selectedPlan = event.target.value;
            console.log("Plan Selected: " + selectedPlan);
        });
    }
    // Update display with current plan selection 
    document.getElementById("selected-plan").innerText = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1) + " - Select a Plan";
}
// Function to handle currency change and update prices
function changeCurrency() {
    selectedCurrency = document.getElementById("currency").value;
    var conversionRates = {
        INR: 1,
        USD: 0.012,
        YEN: 1.65
    }; // Conversion rates    var rate = conversionRates[selectedCurrency];
    if (selectedVehicle) {
        var vehicle = vehiclePricing[selectedVehicle];
        var radios = document.querySelectorAll('input[name="plan"]');
        for (var i = 0; i < radios.length; i++) {
            var planType = radios[i].value;
            var convertedPrice = (vehicle[planType] * rate).toFixed(2);
            var currencySymbol = selectedCurrency === "USD" ? "$" : selectedCurrency === "YEN" ? "¥" : "₹";
            radios[i].nextElementSibling.innerText = planType.charAt(0).toUpperCase() + planType.slice(1) + ": " + currencySymbol + convertedPrice;
        }
    }
}

function getPass() {
    if (!selectedVehicle || !selectedPlan) {
        alert("Please select a vehicle and a plan first!");
        return;
    }
    var planPrice = vehiclePricing[selectedVehicle][selectedPlan];
    var currencySymbol = selectedCurrency === "USD" ? "$" : selectedCurrency === "YEN" ? "¥" : "₹";
    var conversionRate = selectedCurrency === "USD" ? 0.012 : selectedCurrency === "YEN" ? 1.65 : 1;
    var convertedPrice = (planPrice * conversionRate).toFixed(2);
    alert("You have selected the " + selectedPlan + " plan for a " + selectedVehicle + ". The price is " + currencySymbol + convertedPrice + ".");
    var collapsibleCheckbox = document.getElementById("pricing-collapsible");
    if (collapsibleCheckbox) {
        collapsibleCheckbox.checked = false;
    }
}