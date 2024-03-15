// //3rd time 
// // CRUD - create, read, update, delete

// // global variables

    var table = document.getElementById("table");
    var row = null;

    function Submit() {
        var dataEntered = Retrivedata();
        var readData = readingdatafromlocalstorage(dataEntered);

        if (dataEntered == false) {
            msg.innerHTML = '<h3 class="p">Please enter Data!</h3>';
        } else {
            if (row == null) {
                insert(readData);
                msg.innerHTML = '<h3 class="g">Data Inserted</h3>';
            } else {
                update();
                msg.innerHTML = '<h3 class="d">Data Updated</h3>';
            }
        }
        document.getElementById("form").reset();
    }

    function Retrivedata() {
        var name1 = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var Phonenumber = document.getElementById("number").value;
        var array = [name1, email, Phonenumber];

        if (array.includes("")) {
            return false;
        } else {
            return array;
        }
    }

    function readingdatafromlocalstorage(dataEntered) {
        // Get stored data or initialize if not exists
        var storedDataString = localStorage.getItem("storedData");
        var storedData;
    
        try {
            storedData = JSON.parse(storedDataString) || [];
        } catch (error) {
            storedData = [];
        }
    
        // Add new data
        storedData.push({
            n1: dataEntered[0],
            e1: dataEntered[1],
            p1: dataEntered[2]
        });
    
        // Update local storage
        localStorage.setItem("storedData", JSON.stringify(storedData));
    
        return dataEntered;
    }
    
    

    function insert(readData) {
        var newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = readData[0];
        newRow.insertCell(1).innerHTML = readData[1];
        newRow.insertCell(2).innerHTML = readData[2];
        newRow.insertCell(3).innerHTML = '<button onclick="edit(this)">Edit</button> <button onclick="remove(this)">Delete</button>';

        // Update local storage
        updateLocalStorage();
    }

    function edit(a) {
        row = a.parentElement.parentElement;
        document.getElementById("name").value = row.cells[0].innerHTML;
        document.getElementById("email").value = row.cells[1].innerHTML;
        document.getElementById("number").value = row.cells[2].innerHTML;
    }

    function update() {
        row.cells[0].innerHTML = document.getElementById("name").value;
        row.cells[1].innerHTML = document.getElementById("email").value;
        row.cells[2].innerHTML = document.getElementById("number").value;

        // Update local storage
        updateLocalStorage();

        row = null;
    }

    function remove(a) {
        var ans = confirm("Warning: Are you sure you want to delete this record?");
        if (ans == true) {
            row = a.parentElement.parentElement;

            document.getElementById("table").deleteRow(row.rowIndex);

            // Update local storage after removing the row
            updateLocalStorage();

            row = null;
        }
    }

    function updateLocalStorage() {
        var data = [];
        var rows = table.rows;
        for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header row
            var cells = rows[i].cells;
            data.push({
                n1: cells[0].innerHTML,
                e1: cells[1].innerHTML,
                p1: cells[2].innerHTML
            });
        }
        localStorage.setItem("storedData", JSON.stringify(data));
    }

    // Check if the data is already in the table
    function isDataInTable(data) {
        var rows = table.rows;
        for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header row
            var cells = rows[i].cells;
            if (cells[0].innerHTML === data.n1 && cells[1].innerHTML === data.e1 && cells[2].innerHTML === data.p1) {
                return true;
            }
        }
        return false;
    }

    // Load data from local storage when the page loads
    window.onload = function() {
        var storedData = JSON.parse(localStorage.getItem("storedData")) || [];
        storedData.forEach(function(data) {
            if (!isDataInTable(data)) {
                insert([data.n1, data.e1, data.p1]);
            }
        });
    };