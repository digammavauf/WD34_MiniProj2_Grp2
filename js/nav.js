export let menu = [
    {label: "Home", url: "index.html", title: "Home page", icon: "fa-home"},
    {label: "Services", url: "services.html", title: "Services page", icon: "fa-gear"},
    {label: "About Us", url: "about.html", title: "About us page", icon: "fa-circle-question"},
    {label: "Contact Us", url: "contact.html", title: "Contact us page", icon: "fa-phone"}
];

export function generateNavBar() {
    console.log("generateNavBar-start");
    let nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-sm", "navbar-dark", "bg-stimupurehue", "text-relaxtint", "sticky-top");
    let container = document.createElement("div");
    container.classList.add("container-fluid");
    
    let brand = document.createElement("a");
    brand.classList.add("navbar-brand", "fw-semibold", "text-relaxtint");
    brand.href = "index.html";
    brand.innerHTML = "TLC";
    container.appendChild(brand);

    let toggler = document.createElement("button");
    toggler.classList.add("navbar-toggler");
    toggler.type = "button";
    toggler.setAttribute("data-bs-toggle", "collapse");
    toggler.setAttribute("data-bs-target", "#tlcnavbar");
    let togglerIcon = document.createElement("span");
    togglerIcon.classList.add("navbar-toggler-icon");
    toggler.appendChild(togglerIcon);
    nav.appendChild(toggler);
    
    let tlcnavbar = document.createElement("div");
    tlcnavbar.classList.add("collapse", "navbar-collapse");
    tlcnavbar.id = "tlcnavbar";
    let navList = document.createElement("ul");
    navList.classList.add("navbar-nav", "me-auto");
    for(let item of menu) {
        let navItem = document.createElement("li");
        navItem.classList.add("nav-item");
        let navLink = document.createElement("a");
        navLink.classList.add("nav-link");
        navLink.href = item.url;
        navLink.title = item.title;
        let navLinkIcon = document.createElement("span");
        navLinkIcon.classList.add("pe-1", "fa-solid", item.icon);
        navLink.appendChild(navLinkIcon);
        let navLinkLabel = document.createElement("span");
        navLinkLabel.innerText = item.label;
        navLink.appendChild(navLinkLabel);
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }   
    tlcnavbar.appendChild(navList);

    let navForm = document.createElement("form");
    navForm.classList.add("d-flex");
    let bookingLink = document.createElement("a");
    bookingLink.classList.add("btn", "bg-relaxtint", "text-stimupurehue");
    bookingLink.href = "booking.html";
    let bookingLinkIcon = document.createElement("span");
    bookingLinkIcon.classList.add("fa-solid", "fa-calendar", "pe-1");
    bookingLink.appendChild(bookingLinkIcon);
    let bookingLinkText = document.createElement("span");
    bookingLinkText.classList.add("fw-semibold");
    bookingLinkText.id = "bookingItemCount";
    bookingLinkText.innerText = "0";
    bookingLink.appendChild(bookingLinkText);
    navForm.appendChild(bookingLink);
    tlcnavbar.appendChild(navForm);

    container.appendChild(tlcnavbar);

    nav.appendChild(container);
    document.body.prepend(nav);
    console.log("generateNavBar-stop");
}

export function generateTop() {
    console.log("generateTop-start");
    let top = document.createElement("div");
    top.classList.add("container-fluid", "text-center", "bg-relaxtint", "text-stimupurehue");
    let brand = document.createElement("span");
    brand.classList.add("fs-4", "fw-semibold");
    brand.innerText = "TLC";
    top.appendChild(brand);
    document.body.prepend(top);
    console.log("generateTop-stop");
}
