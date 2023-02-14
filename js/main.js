/* BEGIN CREATE AND GENERATE NAVBAR */
import { navBar } from "./nav.js";
navBar.brand = "TCL";
navBar.icon = "img/Tena.jpg";
navBar.add("fa-user-doctor", "Services", "services.html", "Our services");
navBar.add("fa-circle-info", "About", "about.html", "About us");
navBar.add("fa-phone", "Contact", "contact.html", "Contact us");
navBar.generate();
/* END CREATE AND GENERATE NAVBAR */

