import Header from "@src/components/layout/Header";
import {
  BrowserRouter,
  Route,
  Routes as ReactRouterRoutes,
} from "react-router-dom";
import RecentListens from "./RecentListens";
import Songs from "./Songs";
import Stats from "./Stats";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import Users from "./Users";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <ReactRouterRoutes>
      <Route path="songs" element={<Songs />} />
      <Route path="/" element={<Users />} />
      <Route path=":id/topsongs" element={<TopSongs />} />
      <Route path=":id/topartists" element={<TopArtists />} />
      <Route path=":id/recentlistens" element={<RecentListens />} />
      {/* <Route path=":id/aggregate" element={<TopRecentListened />} /> */}
      <Route path=":id/aggregate" element={<Stats />} />
    </ReactRouterRoutes>
  </BrowserRouter>
);

export default Routes;
