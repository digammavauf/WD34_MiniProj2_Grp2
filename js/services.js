let catalog = [];

let booking = [];

export function loadResource(file) {
    console.log("loadResource-init");
    if(sessionStorage.getItem("catalog") != null) {
        console.log("loadResource-interrupt: session[catalog] already exist");
        return;
    }
    fetch(file).then(function(response) {
        return response.text();
    }).then(function(data) {
        sessionStorage.setItem("catalog", data);
        generateCatalog();
    });
    console.log("loadResource-complete");
}

export function generateCatalog() {
    console.log("generateCatalog-init");
    if(sessionStorage.getItem("catalog") == null){
        console.log("generateCatalog-interrupt: session[catalog] does not exist");
        return;
    }
    catalog = JSON.parse(sessionStorage.getItem("catalog"));
    let servicesHTML = "";
    let itemIndex = 0;
    for(let item of catalog) {
        servicesHTML += `
                <div class="col-md-3 col-sm-6 col-8 mx-auto">
                    <div class="card h-100">
                        <img class="card-img-top" src="${item.serviceImage}">
                        <div class="card-header bg-relaxtint">
                            <h4 class="card-title">${item.serviceName} <span class="fs-5 text-stimupurehue">SKU: ${item.serviceSKU}</span></h4>
                            <h6 class="card-subtitle text-muted">${item.serviceVariant}</h6>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${item.serviceDescription}</div>
                        </div>
                        <div class="card-footer bg-relaxtint">
                            <div class="row d-flex flex-row flex-wrap pe-1 justify-content-between align-items-stretch">
                                <div class="fw-bold col-md-6 col-sm-6 col-12 my-auto">&#x20B1; ${Number(item.servicePrice).toLocaleString("en-US")}</div>
                                <button class="btn btn-reliable zoom-on-hover btn-addtobooking col-md-6 col-sm-6 col-12 my-auto" data-tlc-item="${itemIndex++}"><span class="fa-solid fa-calendar-plus fs-4"></span><div>Book</div></span></button>
                            </div>
                        </div>
                    </div>
                </div>
`;
    }
    if(!document.querySelector("#catalog")) {
        console.log("generateCatalog-interrupt: #catalog not found");
        return;
    };
    document.querySelector("#catalog").innerHTML = servicesHTML;
    document.querySelectorAll(".btn-addtobooking").forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let item = 0;
            if(event.target.nodeName == "SPAN" || event.target.nodeName == "DIV") {
                item = Number(event.target.parent.getAttribute("data-tlc-item"));
            } else {
                item = Number(event.target.getAttribute("data-tlc-item"));
            }
            addToBooking(item);
        });
    });
    console.log("generateCatalog-complete");
}

export function generateBooking() {
    console.log("generateBooking-init");
    if(sessionStorage.getItem("booking") == null){
        console.log("generateBooking-interrupt: session[booking] does not exist");
        return;
    }
    booking = JSON.parse(sessionStorage.getItem("booking"));
    let servicesHTML = `
                <caption>List of services</caption>
                <thead class="bg-stimupurehue text-relaxtint">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Particulars</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
`;
    let amountDue = 0;
    let itemIndex = 0;
    for(let item of booking) {
        servicesHTML += `
                    <tr>
                        <th scope="row">${itemIndex+1}</th>
                        <td>
                            <span class="bg-stimupurehue text-relaxtint px-2 py-1 rounded">SKU: ${item.serviceSKU}</span>
                            <span class="fs-5 fw-semibold">${item.serviceName}</span>
                            <span class="text-muted">${item.serviceVariant}</span>
                            <div>${item.serviceDescription}</div>
                        </td>
                        <td>&#x20B1; ${Number(item.servicePrice).toLocaleString("en-US")}</td>
                        <td><button class="btn btn-royalty zoom-on-hover btn-removefrombooking" data-tlc-item="${itemIndex++}"><span class="fa-solid fa-calendar-minus fs-4"></span><div>Remove<div></button></td>
                    </tr>
`;
        amountDue += item.servicePrice;
    }
    servicesHTML += `
                </tbody>
`;
    if(amountDue > 0) {
        servicesHTML += `
                <tfoot class="bg-stimupurehue text-relaxtint">
                    <tr>
                        <td scope="col" class="fw-bold">&nbsp;</td>
                        <td scope="col" class="fw-bold">Amount Due</td>
                        <td scope="col" class="fw-bold">&#x20B1; ${Number(amountDue).toLocaleString("en-US")}</td>
                        <td scope="col" class="fw-bold"><button type="button" class="btn btn-health zoom-on-hover" id="btn-confirmbooking" data-tlc-due="${amountDue}"><span class="fa-solid fa-calendar-check fs-4"></span><div>Confirm</div></button></td>
                    </tr>
                </tfoot>
`;
    }
    if(!document.querySelector("#bookingItemCount")) {
        console.log("generateBooking-interrupt: #bookingItemCount not found");
        return;
    };
    document.querySelector("#bookingItemCount").innerText = itemIndex;
    if(!document.querySelector("#booking")) {
        console.log("generateBooking-interrupt: #booking not found");
        return;
    };
    document.querySelector("#booking").innerHTML =  servicesHTML;
    document.querySelectorAll(".btn-removefrombooking").forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let item = 0;
            if(event.target.nodeName == "SPAN" || event.target.nodeName == "DIV") {
                item = Number(event.target.parent.getAttribute("data-tlc-item"));
            } else {
                item = Number(event.target.getAttribute("data-tlc-item"));
            }
            removeFromBooking(item);
        });
    });
    document.querySelector("#btn-confirmbooking").addEventListener("click", function(event) {
        let due = 0;
        if(event.target.nodeName == "SPAN" || event.target.nodeName == "DIV") {
            due = Number(event.target.parent.getAttribute("data-tlc-due"));
        } else {
            due = Number(event.target.getAttribute("data-tlc-due"));
        } 
        if(due > 0) {
            sessionStorage.setItem("due", due);
            location.href = "confirm.html";
        }
    });
    console.log("generateBooking-complete");
}

export function getDue() {
    console.log("getDue-init");
    if(!document.querySelector("#due")) {
        console.log("getDue-interrupt: #due not found");
        return;
    };
    let due = 0;
    if(sessionStorage.getItem("due") == null){
        console.log("getDue-interrupt: session[due] does not exist");
        return;
    }
    due = sessionStorage.getItem("due");
    document.querySelector("#due").innerHTML = `&#x20B1; ${Number(due).toLocaleString("en-US")}`;
    console.log("getDue-complete");
}

export function pay() {
    console.log("pay-init");
    if(!document.querySelector("#paymentSucceeded")) {
        console.log("pay-interrupt: #paymentSucceeded not found");
        return;
    };
    let items = booking.splice(0, booking.length);
    items.forEach(function(item) {
        catalog.push(item);
    });
    sessionStorage.setItem("catalog", JSON.stringify(catalog));
    sessionStorage.setItem("booking", JSON.stringify(booking));
    generateCatalog();
    generateBooking();
    console.log("pay-complete");
}

function addToBooking(itemIndex) {
    console.log("addToBooking-init");
    let item = catalog.splice(itemIndex, 1);
    booking.push(item[0]);
    sessionStorage.setItem("catalog", JSON.stringify(catalog));
    sessionStorage.setItem("booking", JSON.stringify(booking));
    generateCatalog();
    generateBooking();
    console.log("addToBooking-complete");
}

function removeFromBooking(itemIndex) {
    console.log("removeFromBooking-init");
    let item = booking.splice(itemIndex, 1);
    catalog.push(item[0]);
    sessionStorage.setItem("catalog", JSON.stringify(catalog));
    sessionStorage.setItem("booking", JSON.stringify(booking));
    generateCatalog();
    generateBooking();
    console.log("removeFromBooking-complete");
}
