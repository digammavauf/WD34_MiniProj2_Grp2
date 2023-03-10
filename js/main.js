import { loadMenuResource, generateNavBar, generateHeader, generateFooter } from "./nav.js";
/* BEGIN CREATE AND GENERATE NAVBAR */
loadMenuResource("data/menu.json");
generateNavBar();
generateHeader();
generateFooter();
/* END CREATE AND GENERATE NAVBAR */

/* BEGIN CREATE AND GENERATE CATALOG */
import { loadResource, generateCatalog, generateBooking, getDue, pay } from "./services.js";
loadResource("data/services.json");
generateCatalog();
generateBooking();
getDue();
pay();
/* END CREATE AND GENERATE CATALOG */