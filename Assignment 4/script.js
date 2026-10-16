document.getElementById("regForm").addEventListener("submit", function (e) {
    let isValid = true;

    const emp = document.getElementById("emp").value.trim();
    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const designation = document.getElementById("designation").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;


    document.getElementById("empErr").textContent = "";
    document.getElementById("firstErr").textContent = "";
    document.getElementById("lastErr").textContent = "";
    document.getElementById("genderErr").textContent = "";
    document.getElementById("emailErr").textContent = "";
    document.getElementById("passwordErr").textContent = "";
    document.getElementById("phoneErr").textContent = "";
    document.getElementById("designationErr").textContent = "";
    if (emp === "") {
        document.getElementById("empErr").textContent = "ID required";
        isValid = false;
    }
    if (!nameRegex.test(first)) {
        document.getElementById("firstErr").textContent = "Letters only";
        isValid = false;
    }
    if (!nameRegex.test(last)) {
        document.getElementById("lastErr").textContent = "Letters only";
        isValid = false;
    }
    if (!gender) {
        document.getElementById("genderErr").textContent = "Select gender";
        isValid = false;
    }
    if (!emailRegex.test(email)) {
        document.getElementById("emailErr").textContent = "Invalid email";
        isValid = false;
    }
    if (password.length < 6) {
        document.getElementById("passwordErr").textContent = "Min 6 characters";
        isValid = false;
    }
    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneErr").textContent = "10 digit number";
        isValid = false;
    }
    if (designation === "") {
        document.getElementById("designationErr").textContent = "Select role";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }
});
document.getElementById("resetBtn").addEventListener("click", function () {
    document.getElementById("regForm").reset();
    document.getElementById("empErr").textContent = "";
    document.getElementById("firstErr").textContent = "";
    document.getElementById("lastErr").textContent = "";
    document.getElementById("genderErr").textContent = "";
    document.getElementById("emailErr").textContent = "";
    document.getElementById("passwordErr").textContent = "";
    document.getElementById("phoneErr").textContent = "";
    document.getElementById("designationErr").textContent = "";
});
