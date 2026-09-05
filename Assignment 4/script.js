let totalStudents = 0;
let passedStudents = 0;
let failedStudents = 0;
let totalPercentage = 0;
let topperPercentage = 0;
let topperName = "";

function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let m1 = Number(document.getElementById("m1").value);
    let m2 = Number(document.getElementById("m2").value);
    let m3 = Number(document.getElementById("m3").value);
    let m4 = Number(document.getElementById("m4").value);
    let m5 = Number(document.getElementById("m5").value);
    let error = document.getElementById("error");

    if (name == "" || roll == "") {
        error.innerText = "Please enter student name and roll number.";
        return;
    }
    if (
        m1 < 0 || m1 > 100 ||
        m2 < 0 || m2 > 100 ||
        m3 < 0 || m3 > 100 ||
        m4 < 0 || m4 > 100 ||
        m5 < 0 || m5 > 100
    ) {
        error.innerText = "Marks must be between 0 and 100.";
        return;
    }
    error.innerText = "";
    let total = m1 + m2 + m3 + m4 + m5;
    let percentage = total / 5;
    totalStudents++;

    // Check result

    let result;

    if (percentage >= 40) {

        passedStudents++;

        result = "PASS";

    } else {

        failedStudents++;

        result = "FAIL";

    }


    // Calculate average

    totalPercentage = totalPercentage + percentage;

    let average = totalPercentage / totalStudents;


    // Find topper

    if (percentage > topperPercentage) {

        topperPercentage = percentage;

        topperName = name;

    }

    document.getElementById("students").innerText = totalStudents;
    document.getElementById("passed").innerText = passedStudents;
    document.getElementById("failed").innerText = failedStudents;
    document.getElementById("average").innerText = average.toFixed(2) + "%";


    document.getElementById("topper").innerText =
        topperName + " - " + topperPercentage + "%";

    let table = document.getElementById("tableBody");

    let row = table.insertRow();


    row.insertCell(0).innerText = roll;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = total;
    row.insertCell(3).innerText = percentage.toFixed(2) + "%";
    row.insertCell(4).innerText = result;

    if (result == "PASS") {
        row.cells[4].className = "pass";
    } else {
        row.cells[4].className = "fail";
    }

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("m1").value = "";
    document.getElementById("m2").value = "";
    document.getElementById("m3").value = "";
    document.getElementById("m4").value = "";
    document.getElementById("m5").value = "";

}