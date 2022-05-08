let employees;

function getAllEmployees() {
  fetch("http://localhost:3004/employees")
    .then((res) => res.json())
    .then((data) => {
      print1(data);
    });
}

function print1(data) {
  document.getElementById("employeeslist").innerHTML = "";

  for (i of data) {
    document.getElementById(
      "employeeslist"
    ).innerHTML += `fname: ${i.fname}, lname: ${i.lname}, id: ${i.id}, city: ${i.city} <br><br>`;
  }
}

function input1() {
  let idEmployee = document.getElementById("findemployee").value;
  let errorMsg = document.getElementById("errorMsgEmployeeByID");
  errorMsg.innerHTML = "";
  if (idEmployee.length != 9 || idEmployee == "") {
    errorMsg.innerHTML = "Please Enter 9-digit ID";
  } else {
    getEmByID(idEmployee);
  }
}

function getEmByID(idEmployee) {
  fetch(`http://localhost:3004/employees/${idEmployee}`)
    .then((res) => res.json())
    .then((data) => {
      print2(data);
    });
}

function print2(data) {
  console.log(data);
  document.getElementById("employeebyID").innerHTML = "";
  let errorMsg = document.getElementById("errorMsgEmployeeByID");
  if (data.length == 0) {
    errorMsg.innerHTML = "This employee does not exist in the system.";
  } else {
    document.getElementById(
      "employeebyID"
    ).innerHTML = `fname: ${data[0].fname}, lname: ${data[0].lname}, id: ${data[0].id}, city: ${data[0].city}`;
  }
}

function input2() {
  let firstName = document.getElementById("employeefName").value;
  let lastName = document.getElementById("employeelName").value;
  let idNew = document.getElementById("employeeID").value;
  let cityNew = document.getElementById("employeeCity").value;
  let errMsg = document.getElementById("errorMsgNewEmployee");
  let errMsg2 = document.getElementById("errorMsgNewEmployee2");
  console.log(idNew);
  errMsg.innerHTML = "";
  errMsg2.innerHTML = "";
  if (firstName == "" || lastName == "" || idNew == "" || cityNew == "") {
    errMsg.innerHTML = "Please fill in all the fields. <br>";
  }
  if (idNew.length != 9 || idNew == "") {
    errMsg2.innerHTML = "Please enter 9-digit ID.";
  } else {
    let employee = {
      fname: firstName,
      lname: lastName,
      id: idNew,
      city: cityNew,
    };
    enterNewEm(employee);
  }
}

function enterNewEm(employee) {
  fetch("http://localhost:3004/employees", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .then((data) => {
      print1(data);
    });
}

let idEm;
function input3() {
  let fnameEm = document.getElementById("updatefName").value;
  let lnameEm = document.getElementById("updatelName").value;
  idEm = document.getElementById("idEmployee").value;
  let changeCity = document.getElementById("updateCity").value;
  let errMsg = document.getElementById("errorMsgUpdateEmployee");
  let errMsg2 = document.getElementById("errorMsgUpdateEmployee2");
  errMsg.innerHTML = "";
  errMsg2.innerHTML = "";
  if (fnameEm == "" || lnameEm == "" || idEm == "" || changeCity == "") {
    errMsg.innerHTML = "Please fill in all the fields. <br>";
  }
  if (idEm.length != 9 || idEm == "") {
    errMsg2.innerHTML = "Please enter 9-digit ID.";
  } else {
    let change = {
      fname: fnameEm,
      lname: lnameEm,
      id: idEm,
      city: changeCity,
    };
    getEmByID2(change);
  }
}

function getEmByID2(change) {
  fetch(`http://localhost:3004/employees/${idEm}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(change),
  })
    .then((res) => res.json())
    .then((data) => {
      print1(data);
    });
}

function input4() {
  let idEmployee1 = document.getElementById("findEmforDelete").value;
  if (idEmployee1.length != 9 || idEmployee1 == "") {
    let errorMsg = document.getElementById("errorMsgDeleteEmployee");
    errorMsg.innerHTML = "Please Enter 9-digit ID";
  }
  getEmByID3(idEmployee1);
}

function getEmByID3(idEmployee1) {
  fetch(`http://localhost:3004/employees/${idEmployee1}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      print1(data);
      let result = data.filter((data) => data.id == Number(idEmployee1));
      if (result.length == 0) {
        alert("An employee has been successfully deleted from the system.");
      }
    });
}
