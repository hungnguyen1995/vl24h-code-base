// #region Global Imports
const nextRoutes = require("next-routes");
// #endregion Global Imports

const routes = (module.exports = nextRoutes());

routes.add("home", "home");
routes.add("index", "/");
routes.add("profile", "/profile");
routes.add("profile/billing", "/profile/billing");
routes.add("form", "/form");
routes.add("form/billing", "/form/billing");
routes.add("form/simple3", "/form/simple3");

export default routes;
