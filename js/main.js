import { generateNavBar, generateTop } from "./nav.js";
/* BEGIN CREATE AND GENERATE NAVBAR */
generateNavBar();
generateTop();
/* END CREATE AND GENERATE NAVBAR */

/* BEGIN CREATE AND GENERATE CATALOG */
import { generateCatalog, generateBooking } from "./services.js";
generateCatalog();
generateBooking();
/* END CREATE AND GENERATE CATALOG */
