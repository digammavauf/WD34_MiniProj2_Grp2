let menu = [];

export function loadMenuResource(file) {
    console.log("loadMenuResource-init");
    if(sessionStorage.getItem("menu") != null) {
        console.log("loadMenuResource-interrupt: session[menu] already exist");
        return;
    }
    fetch(file).then(function(response) {
        return response.text();
    }).then(function(data) {
        sessionStorage.setItem("menu", data);
        generateNavBar();
    });
    console.log("loadMenuResource-complete");
}

export function generateNavBar() {
    console.log("generateNavBar-init");
    if(sessionStorage.getItem("menu") == null){
        console.log("generateNavBar-interrupt: session[menu] does not exist");
        return;
    }
    menu = JSON.parse(sessionStorage.getItem("menu"));
        let nav = document.createElement("nav");
        nav.classList.add("navbar", "navbar-expand-sm", "navbar-dark", "bg-stimupurehue", "text-relaxtint", "sticky-top");
            let toggler = document.createElement("button");
            toggler.classList.add("navbar-toggler");
            toggler.type = "button";
            toggler.setAttribute("data-bs-toggle", "collapse");
            toggler.setAttribute("data-bs-target", "#tlcnavbar");
                let togglerIcon = document.createElement("span");
                togglerIcon.classList.add("navbar-toggler-icon");
            toggler.appendChild(togglerIcon);
        nav.appendChild(toggler);
            let container = document.createElement("div");
            container.classList.add("container-fluid");
                let brand = document.createElement("a");
                brand.classList.add("navbar-brand", "fw-semibold", "text-relaxtint");
                brand.href = "index.html";
                brand.innerHTML = "TLC";
            container.appendChild(brand);
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
    console.log("generateNavBar-complete");
}

export function generateHeader() {
    console.log("generateHeader-init");
    let header = document.createElement("div");
    header.classList.add("container-fluid", "text-center", "bg-relaxtint", "text-stimupurehue");
        let brand = document.createElement("span");
        brand.classList.add("fs-4", "fw-semibold");
        brand.innerText = "TLC";
    header.appendChild(brand);
    document.body.prepend(header);
    console.log("generateHeader-complete");
}

export function generateFooter() {
    console.log("generateFooter-init");
    let footer = document.createElement("div");
    footer.classList.add("container-fluid", "text-center", "bg-stimupurehue", "text-relaxtint");
        let copyright = document.createElement("span");
        copyright.classList.add("fs-6");
        copyright.innerHTML = "Copyright &copy; 2023. TLC. All rights reserved.";
    footer.appendChild(copyright);
    document.body.append(footer);
    console.log("generateFooter-complete");
}
