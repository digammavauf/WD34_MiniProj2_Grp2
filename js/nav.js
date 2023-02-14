export let navBar = {
    icon: "https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg",
    brand: "NavBar",
    nav: [{fa: "fa-house", label: "Home", url: "index.html", title: "Homepage"}],
    add: function(fa, label, url, title) {
        let newNav = {fa: fa, label: label, url: url, title: title};
        this.nav.push(newNav);
    },
    generate: function() {
        let nav = document.createElement("nav");
        nav.classList.add("navbar", "navbar-expand-lg", "navabar-light", "bg-light", "my-2", "my-lg-0", "mr-sm-0", "my-sm-0", "px-3");
        let brand = document.createElement("a");
        brand.classList.add("navbar-brand", "mb-0", "h1");
        brand.textContent = this.brand;
        brand.href = "index.html";
        brand.title = "Homepage";
        let icon = document.createElement("img");
        icon.classList.add("d-inline-block", "align-top", "me-1");
        icon.alt = "icon";
        icon.width = 30;
        icon.height = 30;
        icon.src = this.icon;
        brand.prepend(icon);
        nav.appendChild(brand);
        let toggler = document.createElement("button");
        toggler.classList.add("navbar-toggler");
        toggler.type = "button";
        toggler.setAttribute("data-toggle", "collapse");
        toggler.setAttribute("data-target", "#navbarSupportedContent");
        toggler.setAttribute("aria-controls", "navbarSupportedContent");
        toggler.setAttribute("aria-expanded", false);
        toggler.setAttribute("aria-label", "Toggle navigation");
        let togglerIcon = document.createElement("span");
        togglerIcon.classList.add("navbar-toggler-icon");
        toggler.appendChild(togglerIcon);
        nav.appendChild(toggler);
        let navContent = document.createElement("div");
        navContent.classList.add("collapse", "navbar-collapse");
        navContent.id = "navbarSupportedContent";
        nav.appendChild(navContent);
        let navList = document.createElement("ul");
        navList.classList.add("navbar-nav", "mr-auto");
        this.nav.forEach(function(navItem) {
            let listItem = document.createElement("li");
            listItem.classList.add("nav-item");
            let link = document.createElement("a");
            link.classList.add("nav-link");
            link.innerText = navItem.label;
            link.href = navItem.url;
            link.title = navItem.title;
            let fa = document.createElement("span");
            fa.classList.add("fa-solid", navItem.fa, "me-1");
            link.prepend(fa);
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        navContent.appendChild(navList);
        document.body.prepend(nav);
    }
};