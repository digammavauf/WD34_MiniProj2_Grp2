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

export function generateNavBarOrig() {
    console.log("generateNavBar-init");
    if(sessionStorage.getItem("menu") == null){
        console.log("generateNavBar-interrupt: session[menu] does not exist");
        return;
    }
    menu = JSON.parse(sessionStorage.getItem("menu"));
        let nav = document.createElement("nav");
        nav.classList.add("navbar", "navbar-expand-sm", "navbar-dark", "bg-dominic", "text-relaxtint", "sticky-top");
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
                brand.classList.add("navbar-brand", "fw-semibold", "text-relaxtint", "d-none", "d-sm-block");
                brand.href = "index.html";
                brand.innerHTML = "TLC";
            container.appendChild(brand);
            let tlcnavbar = document.createElement("div");
            tlcnavbar.classList.add("collapse", "navbar-collapse");
            tlcnavbar.id = "tlcnavbar";
                let navList = document.createElement("ul");
                navList.classList.add("navbar-nav", "me-auto", "me-3");
                for(let item of menu) {
                    let navItem = document.createElement("li");
                    navItem.classList.add("nav-item", "zoom-on-hover");
                    let navLink = document.createElement("a");
                    navLink.classList.add("nav-link", "text-center");
                    navLink.href = item.url;
                    navLink.title = item.title;
                        let navLinkIcon = document.createElement("span");
                        navLinkIcon.classList.add("pe-1", "fa-solid", item.icon, "fs-4");
                    navLink.appendChild(navLinkIcon);
                        let navLinkLabel = document.createElement("div");
                        navLinkLabel.innerText = item.label;
                    navLink.appendChild(navLinkLabel);
                    navItem.appendChild(navLink);
                    navList.appendChild(navItem);
                }   
            tlcnavbar.appendChild(navList);
                let navForm = document.createElement("form");
                navForm.classList.add("d-flex");
                    let bookingGroup = document.createElement("div");
                    bookingGroup.classList.add("input-group");
                    
                    /* FILTER IS ONLY AVAILABLE IF #catalog IS PRESENT */
                    if(document.querySelector("#catalog") != null) {
                        let bookingFilter = document.createElement("input");
                        bookingFilter.classList.add("form-control");
                        bookingFilter.id = "filter";
                        bookingFilter.type = "text";
                        bookingFilter.placeholder = "Filter Services";
                        bookingFilter.addEventListener("keyup", filterCatalog);
                    bookingGroup.appendChild(bookingFilter);
                        let bookingFilterButton = document.createElement("button");
                        bookingFilterButton.classList.add("btn", "btn-outline-relaxtint", "bg-dominic", "text-relaxtint", "zoom-on-hover", "mx-2");
                        bookingFilterButton.type = "button";
                            let bookingFilterButtonIcon = document.createElement("span");
                            bookingFilterButtonIcon.classList.add("fa-solid", "fa-filter-circle-xmark", "fs-4", "pe-1");
                        bookingFilterButton.appendChild(bookingFilterButtonIcon);
                                let bookingFilterButtonLabel = document.createElement("span");
                                bookingFilterButtonLabel.classList.add("fw-semibold");
                                bookingFilterButtonLabel.id = "bookingFilter";
                                bookingFilterButtonLabel.innerText = "0";
                        bookingFilterButton.appendChild(bookingFilterButtonLabel);
                    bookingGroup.appendChild(bookingFilterButton);
                        bookingFilterButton.addEventListener("click", unfilterCatalog);
                    }

                        let bookingLink = document.createElement("a");
                        bookingLink.classList.add("btn", "bg-relaxtint", "text-dominic", "text-center", "zoom-on-hover");
                        bookingLink.href = "booking.html";
                            let bookingLinkIcon = document.createElement("span");
                            bookingLinkIcon.classList.add("fa-solid", "fa-calendar", "fs-4");
                        bookingLink.appendChild(bookingLinkIcon);
                            let bookingLinkText = document.createElement("div");
                            bookingLinkText.classList.add("fw-semibold");
                            bookingLinkText.id = "bookingItemCount";
                            bookingLinkText.innerText = "0";
                        bookingLink.appendChild(bookingLinkText);
                    bookingGroup.appendChild(bookingLink);
                navForm.appendChild(bookingGroup);
            tlcnavbar.appendChild(navForm);
            container.appendChild(tlcnavbar);
        nav.appendChild(container);
    document.body.prepend(nav);
    console.log("generateNavBar-complete");
}

export function generateNavBar() {
    console.log("generateNavBar-init");
    if(sessionStorage.getItem("menu") == null){
        console.log("generateNavBar-interrupt: session[menu] does not exist");
        return;
    }
    menu = JSON.parse(sessionStorage.getItem("menu"));
        let nav = document.createElement("div");
        nav.classList.add("bg-dominic-dark", "text-dominic-light", "align-items-center", "my-0", "mx-auto", "p-3", "w-100", "position-sticky", "fixed-top");
            let navcon = document.createElement("div");
            navcon.classList.add("d-flex", "justify-content-space-between", "align-items-center", "gap-5");
                let brand = document.createElement("div");
                brand.classList.add("fw-normal", "fs-4", "text-uppercase");
                brand.innerText = "TLC";
            navcon.appendChild(brand);
                let tlcnavbar = document.createElement("div");
                tlcnavbar.classList.add("ms-auto");
                    /* let toggler = document.createElement("input");
                    toggler.classList.add("d-none");
                    toggler.id = "toggler";
                    toggler.type = "checkbox";
                    toggler.setAttribute("data-bs-toggle", "collapse");
                    toggler.setAttribute("data-bs-target", "#menu");
                    let togglerLabel = document.createElement("label");
                    togglerLabel.setAttribute("for", "toggler");
                    togglerLabel.classList.add("fs-3", "d-md-none", "d-block");
                    togglerLabel.id = "togglerLabel";
                        let togglerIcon = document.createElement("span");
                        togglerIcon.classList.add("fa-solid", "fa-bars");
                    togglerLabel.appendChild(togglerIcon);
                tlcnavbar.appendChild(toggler);
                tlcnavbar.appendChild(togglerLabel); */
                    let navList = document.createElement("div");
                    navList.classList.add("d-flex", "align-items-center", "gap-5");
                    navList.id = "menu";
                    for(let item of menu) {
                        let navItem = document.createElement("div");
                        navItem.classList.add("nav-link", "text-center", "zoom-on-hover");
                        let navLink = document.createElement("a");
                        navLink.href = item.url;
                        navLink.title = item.title;
                            let navLinkIcon = document.createElement("span");
                            navLinkIcon.classList.add("pe-1", "fa-solid", item.icon, "fs-1", "d-md-none", "d-block");
                        navLink.appendChild(navLinkIcon);
                            let navLinkLabel = document.createElement("span");
                            navLinkLabel.classList.add("d-md-block", "d-none");
                            navLinkLabel.innerText = item.label;
                        navLink.appendChild(navLinkLabel);
                        navItem.appendChild(navLink);
                        navList.appendChild(navItem);
                    }   
                tlcnavbar.appendChild(navList);
            navcon.appendChild(tlcnavbar);
                let navForm = document.createElement("form");
                navForm.classList.add("d-flex");
                    let bookingGroup = document.createElement("div");
                    bookingGroup.classList.add("input-group");
                    
                    /* FILTER IS ONLY AVAILABLE IF #catalog IS PRESENT */
                    if(document.querySelector("#catalog") != null) {
                        let bookingFilter = document.createElement("select");
                        bookingFilter.classList.add("form-select-lg", "mb-auto", "mb-md-2");
                        bookingFilter.id = "filter";
                        let items = ["", "Psychology", "Psychiatry", "Counseling"];
                        for(let item of items) {
                            let option = document.createElement("option");
                            option.innerText = item;
                        bookingFilter.appendChild(option);
                        }

                        bookingFilter.addEventListener("change", filterCatalog);
                    bookingGroup.appendChild(bookingFilter);
                        let bookingFilterButton = document.createElement("button");
                        bookingFilterButton.classList.add("btn", "bg-dominic-dark", "text-dominic-light", "btn-outline-dominic-light", "zoom-on-hover", "mx-1", "mb-auto", "mb-md-2");
                        bookingFilterButton.type = "button";
                            let bookingFilterButtonIcon = document.createElement("span");
                            bookingFilterButtonIcon.classList.add("fa-solid", "fa-filter-circle-xmark", "fs-4", "pe-1");
                        bookingFilterButton.appendChild(bookingFilterButtonIcon);
                                let bookingFilterButtonLabel = document.createElement("span");
                                bookingFilterButtonLabel.classList.add("fw-semibold");
                                bookingFilterButtonLabel.id = "bookingFilter";
                                bookingFilterButtonLabel.innerText = "0";
                        bookingFilterButton.appendChild(bookingFilterButtonLabel);
                    bookingGroup.appendChild(bookingFilterButton);
                        bookingFilterButton.addEventListener("click", unfilterCatalog);
                    }

                        let bookingLink = document.createElement("a");
                        bookingLink.classList.add("btn", "bg-dominic-light", "text-dominic-dark", "text-center", "zoom-on-hover", "mb-auto", "mb-md-2");
                        bookingLink.href = "booking.html";
                            let bookingLinkIcon = document.createElement("span");
                            bookingLinkIcon.classList.add("fa-solid", "fa-calendar", "fs-4");
                        bookingLink.appendChild(bookingLinkIcon);
                            let bookingLinkText = document.createElement("div");
                            bookingLinkText.classList.add("fw-semibold");
                            bookingLinkText.id = "bookingItemCount";
                            bookingLinkText.innerText = "0";
                        bookingLink.appendChild(bookingLinkText);
                    bookingGroup.appendChild(bookingLink);
                navForm.appendChild(bookingGroup);
            navcon.appendChild(navForm);
        nav.appendChild(navcon);
    document.body.prepend(nav);
    console.log("generateNavBar-complete");
}

function filterCatalog(event) {
    console.log("filterCatalog-init");
    let filterCount = 0;
    document.querySelector("#catalog").childNodes.forEach(function(child) {
        if(child.nodeName == "DIV") {
            let what = document.querySelector("#filter").value;
            let text = String(child.innerHTML);
            let found = (text.toUpperCase().indexOf(what.toUpperCase()) >= 0);
            console.log(`Finding ${what} from ${text}`);
            if(found) {
                filterCount++;
                child.classList.remove("d-none");
            } else {
                child.classList.add("d-none");
            }
            document.querySelector("#bookingFilter").innerText = filterCount;
        }
    });
    console.log("filterCatalog-complete");
}

function unfilterCatalog(event) {
    console.log("unfilterCatalog-init");
    document.querySelector("#catalog").childNodes.forEach(function(child) {
        if(child.nodeName == "DIV") {
            child.classList.remove("d-none");
            document.querySelector("#filter").value  = "";
            document.querySelector("#bookingFilter").innerText = "0";
        }
    });
    console.log("unfilterCatalog-complete");
}

export function generateHeader() {
    console.log("generateHeader-init");
    let header = document.createElement("div");
    header.classList.add("container-fluid", "text-center", "bg-relaxtint", "text-dominic", "d-sm-none", "d-block");
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
    footer.classList.add("container-fluid", "text-center", "bg-dominic", "text-relaxtint");
        let copyright = document.createElement("span");
        copyright.classList.add("fs-6");
        copyright.innerHTML = "Copyright &copy; 2023. TLC. All rights reserved.";
    footer.appendChild(copyright);
    document.body.append(footer);
    console.log("generateFooter-complete");
}
