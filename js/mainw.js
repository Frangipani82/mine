let keys = ["id", "name", "breed", "age"];

function getDogs() {
    fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };
    fetch("http://localhost:3000/dogs", fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => fillDataTable(data)
    );
}

document.querySelector("#dogButton").addEventListener("click", getDogs);

function fillDataTable(data) {
    let table = document.querySelector("#dogTable");
    let tBody = document.querySelector("#dogTable tbody")
    tBody.innerHTML = "";
    let newRow = setNewRow();
    tBody.appendChild(newRow);

    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            let input = createAnyElement("input", {
                class: "form-control",
                value: row[k],
                name: k
            });
            if (k == "id") {
                input.setAttribute("readonly", true)
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);

    }
}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let setBtn = createAnyElement("button", {class: "btn btn-set", onclick: "setRow(this)"});
    setBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    setBtn.style.backgroundColor = "skyBlue";
    let delBtn = createAnyElement("button", {class: "btn btn-del", onclick: "delRow(this)"});
    delBtn.innerHTML = '<i class="fa fa-eraser" aria-hidden="true"></i>';
    delBtn.style.backgroundColor = "salmon";

    group.appendChild(setBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");

    td.appendChild(group);

    return td;

}

document.body.style.backgroundColor = "mintCream";

function setNewRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }

    let newBtn = createAnyElement("button", {
        class: "btn btn-new",
        onclick: "newDog(this)"
    });
    newBtn.style.backgroundColor = "mediumOrchid";
    newBtn.innerHTML = '<i class="fa fa-plus-square" aria-hidden="true"></i>';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;

}

function newDog(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getRowData(tr);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/dogs", fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => 
            getDogs()
        
    );
}


function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };
    
    fetch(`http://localhost:3000/dogs/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => 
            getDogs()
        
    );
}

function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(`http://localhost:3000/dogs/${data.id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => 
            getDogs()
        
    );
}

    