// Load names from storage when the extension popup is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['namesList'], function(result) {
        if (result.namesList) {
            result.namesList.forEach(function(name) {
                addNameToList(name);
            });
        }
    });
});

function addName() {
    var name = document.getElementById("articleName").value;
    if (name.trim() === "") return;

    addNameToList(name);

    // Save the updated list to local storage
    saveNames();
}

function addNameToList(name) {
    var table = document.getElementById("namesList");

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = name;
    cell2.innerHTML = "<span class='remove-button'>X</span>";

    cell2.firstChild.addEventListener("click", function() {
        removeName(this);
    });
}

function removeName(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("namesList").deleteRow(i);
    
    // Save the updated list to local storage
    saveNames();
}

function saveNames() {
    var names = [];
    var rows = document.getElementById("namesList").rows;
    for (var i = 0; i < rows.length; i++) {
        names.push(rows[i].cells[0].textContent);
    }

    chrome.storage.local.set({'namesList': names});
}

document.getElementById("confirmButton").addEventListener("click", addName);

