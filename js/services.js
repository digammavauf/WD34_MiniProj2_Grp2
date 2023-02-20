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
                <div class="col-md-3 col-sm-6 col-12">
                    <div class="card h-100">
                        <img class="card-img-top" src="${item.serviceImage}">
                        <div class="card-header">
                            <h4 class="card-title">${item.serviceName} <span class="fs-5 text-stimupurehue">SKU: ${item.serviceSKU}</span></h4>
                            <h6 class="card-subtitle text-muted">${item.serviceVariant}</h6>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${item.serviceDescription}</div>
                        </div>
                        <div class="card-footer">
                            <div class="row d-flex flex-row flex-wrap pe-1 justify-content-between">
                                <div class="fs-4 fw-bold col-md-6 col-sm-6 col-12">&#x20B1; ${item.servicePrice}</div>
                                <button class="btn btn-addtobooking bg-info col-md-6 col-sm-6 col-12" data-tlc-item="${itemIndex++}"><span class="fa-solid fa-calendar-plus"></span> Book Now</span></button>
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
            if(event.target.nodeName == "SPAN") {
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
                            <span class="bg-stimupurehue text-relaxtint p-1 rounded">SKU: ${item.serviceSKU}</span>
                            <span class="fs-5 fw-semibold">${item.serviceName}</span>
                            <span class="text-muted">${item.serviceVariant}</span>
                        </td>
                        <td>${item.servicePrice}</td>
                        <td><button class="btn btn-removefrombooking btn-danger" data-tlc-item="${itemIndex++}"><span class="fa-solid fa-calendar-minus"></span> Remove</button></td>
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
                        <td scope="col" class="fw-bold">${amountDue}</td>
                        <td scope="col" class="fw-bold"><button class="btn btn-success"><span class="fa-solid fa-calendar-check"></span> Checkout</button></td>
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
            if(event.target.nodeName == "SPAN") {
                item = Number(event.target.parent.getAttribute("data-tlc-item"));
            } else {
                item = Number(event.target.getAttribute("data-tlc-item"));
            }
            removeFromBooking(item);
        });
    });
    console.log("generateBooking-complete");
}

export function addToBooking(itemIndex) {
    console.log("addToBooking-init");
    let item = catalog.splice(itemIndex, 1);
    booking.push(item[0]);
    sessionStorage.setItem("catalog", JSON.stringify(catalog));
    sessionStorage.setItem("booking", JSON.stringify(booking));
    generateCatalog();
    generateBooking();
    console.log("addToBooking-complete");
}

export function removeFromBooking(itemIndex) {
    console.log("removeFromBooking-init");
    let item = booking.splice(itemIndex, 1);
    catalog.push(item[0]);
    sessionStorage.setItem("catalog", JSON.stringify(catalog));
    sessionStorage.setItem("booking", JSON.stringify(booking));
    generateCatalog();
    generateBooking();
    console.log("removeFromBooking-complete");
}

