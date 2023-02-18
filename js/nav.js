export let menu = [
    {label: "Home", url: "index.html", title: "Home page", icon: "fa-home"},
    {label: "Services", url: "services.html", title: "Services page", icon: "fa-gear"},
    {label: "About Us", url: "about.html", title: "About us page", icon: "fa-circle-question"},
    {label: "Contact Us", url: "contact.html", title: "Contact us page", icon: "fa-phone"}
];

export function generateNavBar() {
    let nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-sm", "navbar-dark", "bg-dark", "sticky-top");
    let container = document.createElement("div");
    container.classList.add("container-fluid");
    
    let brand = document.createElement("a");
    brand.classList.add("navbar-brand");
    brand.href = "index.html";
    brand.innerHTML = "TLC";
    container.appendChild(brand);

    let toggler = document.createElement("button");
    toggler.classList.add("navbar-toggler");
    toggler.type = "button";
    toggler.setAttribute("data-bs-toggle", "collapse");
    toggler.setAttribute("data-bs-target", "#tclnavbar");
    let togglerIcon = document.createElement("span");
    togglerIcon.classList.add("navbar-toggler-icon");
    toggler.appendChild(togglerIcon);
    nav.appendChild(toggler);
    
    let tclnavbar = document.createElement("div");
    tclnavbar.classList.add("collapse", "navbar-collapse");
    tclnavbar.id = "tclnavbar";
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
    tclnavbar.appendChild(navList);

    let navForm = document.createElement("form");
    navForm.classList.add("d-flex");
    let cartLink = document.createElement("a");
    cartLink.classList.add("btn", "bg-light");
    cartLink.href = "cart.html";
    let cartLinkIcon = document.createElement("span");
    cartLinkIcon.classList.add("fa-solid", "fa-cart-shopping", "pe-1");
    cartLink.appendChild(cartLinkIcon);
    let cartLinkText = document.createElement("span");
    cartLinkText.classList.add("fw-semibold");
    cartLinkText.id = "cartItemCount";
    cartLinkText.innerText = "0";
    cartLink.appendChild(cartLinkText);
    navForm.appendChild(cartLink);
    tclnavbar.appendChild(navForm);

    container.appendChild(tclnavbar);

    nav.appendChild(container);
    document.body.prepend(nav);
}

export function generateTop() {
    let top = document.createElement("div");
    top.classList.add("container-fluid", "text-center", "stimupurehue");
    let brand = document.createElement("span");
    brand.classList.add("fs-4", "fw-semibold");
    brand.innerText = "TLC";
    top.appendChild(brand);
    document.body.prepend(top);
}
