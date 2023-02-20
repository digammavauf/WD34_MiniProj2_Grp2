import { generateNavBar, generateTop } from "./nav.js";
/* BEGIN CREATE AND GENERATE NAVBAR */
generateNavBar();
generateTop();
/* END CREATE AND GENERATE NAVBAR */

/* BEGIN CREATE AND GENERATE CATALOG */
import { loadResource, generateCatalog, generateBooking } from "./services.js";
loadResource("../data/services.json");
generateCatalog();
generateBooking();
/* END CREATE AND GENERATE CATALOG */
