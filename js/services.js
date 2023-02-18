export let catalog = [
    {
        serviceSKU: "PTIS",
        serviceImage: "https://picsum.photos/seed/1/300/300",
        serviceName: "Psychiatry Initial Session",
        serviceVariant: "45-minute session",
        serviceDescription: "This is for NEW clients without records with us. As this is an initial intake, your Psychiatrist will spend more time with you. The initial intake takes more time compared to your follow-ups. Please allow up to one hour of your time during your initial consultation.",
        servicePrice: 2490
    },
    {
        serviceSKU: "PTFS",
        serviceImage: "https://picsum.photos/seed/2/300/300",
        serviceName: "Psychiatry Follow Up Session",
        serviceVariant: "30-minute session",
        serviceDescription: "General Psychiatry for existing clients only.",
        servicePrice: 2490
    },
    {
        serviceSKU: "CCIS",
        serviceImage: "https://picsum.photos/seed/3/300/300",
        serviceName: "Copuples Counseling Initial Session",
        serviceVariant: "1-hour session",
        serviceDescription: "An initial consultation is required for both parties. Please book separately.",
        servicePrice: 8990
    },
    {
        serviceSKU: "CCFS",
        serviceImage: "https://picsum.photos/seed/4/300/300",
        serviceName: "Copuples Counseling Followup Session",
        serviceVariant: "1-hour-30-minute session",
        serviceDescription: "Individual initial session is required. Please book the Couple Counselling Initial session for both parties before proceeding with this service.",
        servicePrice: 2990
    },
    {
        serviceSKU: "PGIS",
        serviceImage: "https://picsum.photos/seed/5/300/300",
        serviceName: "Psychology Initial Session",
        serviceVariant: "1-hour session",
        serviceDescription: "This service is for NEW clients requiring counselling, CBT, Talk therapy and general Psychological services (except testing)",
        servicePrice: 2450
    },
    {
        serviceSKU: "PGFS",
        serviceImage: "https://picsum.photos/seed/6/300/300",
        serviceName: "Psychology Follow Up Session",
        serviceVariant: "45-minute session",
        serviceDescription: "CBT, Talk therapy, adolescent psychology, Counselling",
        servicePrice: 1990
    },
    {
        serviceSKU: "PGBP",
        serviceImage: "https://picsum.photos/seed/7/300/300",
        serviceName: "Psychology Bulk Follow Up Pack",
        serviceVariant: "45-minute session",
        serviceDescription: "5 Sessions with a Psychologist with a discount",
        servicePrice: 8990
    }
];

export let booking = [];

export function generateCatalog() {
    console.log("generateCatalog-start");
    let servicesHTML = "";
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
                                <button class="btn btn-addtobooking bg-info col-md-6 col-sm-6 col-12" data-tlc-item="${item.serviceSKU}|${item.serviceName}|${item.serviceVariant}|${item.servicePrice}"><span class="fa-solid fa-calendar-plus"></span> Book Now</span></button>
                            </div>
                        </div>
                    </div>
                </div>
`;
    }
    if(!document.querySelector("#catalog")) return;
    document.querySelector("#catalog").innerHTML = servicesHTML;
    document.querySelectorAll(".btn-addtobooking").forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let item;
            if(event.target.nodeName == "SPAN") {
                item = event.target.parent.getAttribute("data-tlc-item");
            } else {
                item = event.target.getAttribute("data-tlc-item");
            }
            let service = item.split("|");
            let particulars = service[0] + "|" + service[1] + "|" + service[2];
            addToBooking(particulars, Number(service[3]))
        });
    });
    console.log("generateCatalog-stop");
}

export function generateBooking() {
    console.log("generateBooking-start");
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
    if(localStorage.getItem("booking")) booking = JSON.parse(localStorage.getItem("booking"));
    let itemIndex = 0;
    for(let item of booking) {
        let service = item.serviceName.split("|");
        servicesHTML += `
                    <tr>
                        <th scope="row">${itemIndex+1}</th>
                        <td>
                            <span class="bg-stimupurehue text-relaxtint p-1 rounded">SKU: ${service[0]}</span>
                            <span class="fs-5 fw-semibold">${service[1]}</span>
                            <span class="text-muted">${service[2]}</span>
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
    if(!document.querySelector("#bookingItemCount")) return;
    document.querySelector("#bookingItemCount").innerText = itemIndex;
    if(!document.querySelector("#booking")) return;
    document.querySelector("#booking").innerHTML =  servicesHTML;
    document.querySelectorAll(".btn-removefrombooking").forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let item;
            if(event.target.nodeName == "SPAN") {
                item = event.target.parent.getAttribute("data-tlc-item");
            } else {
                item = event.target.getAttribute("data-tlc-item");
            }
            removeFromBooking(item);
        });
    });
    console.log("generateBooking-stop");
}

export function addToBooking(name, price) {
    console.log("addToBooking-start");
    booking.push({serviceName: name, servicePrice: price});
    localStorage.setItem("booking", JSON.stringify(booking));
    console.log("addToBooking-stop");
    generateBooking();
}

export function removeFromBooking(itemIndex) {
    console.log("removeFromBooking-start");
    booking.splice(itemIndex, 1);
    localStorage.setItem("booking", JSON.stringify(booking));
    console.log("removeFromBooking-stop");
    generateBooking();
}

