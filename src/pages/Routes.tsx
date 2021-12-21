import {
  BrowserRouter,
  Routes as ReactRouterRoutes,
  Route,
} from "react-router-dom";
import Songs from "./Songs";
import Users from "./Users";
import RecentListens from "./RecentListens";
import Header from "components/layout/Header";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <ReactRouterRoutes>
      <Route path="songs" element={<Songs />} />
      <Route path="users" element={<Users />} />
      <Route path=":id/recentlistens" element={<RecentListens />} />
    </ReactRouterRoutes>
  </BrowserRouter>
);

export default Routes;
