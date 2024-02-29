import SideBar from "../components/layout/Sidebar/SideBar";
import Map from "../components/Map/Map";
import User from "../components/User/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />

      <User />
    </div>
  );
}

export default AppLayout;
