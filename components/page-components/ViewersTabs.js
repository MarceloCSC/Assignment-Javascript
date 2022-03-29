import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/pages/AccessRequests.module.css";

const ViewersTabs = ({ viewers, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex) => {
    if (tabIndex === 0 && activeTab !== 0) {
      onTabChange(viewers);
    } else if (tabIndex === 1 && activeTab !== 1) {
      const pending = viewers.filter((viewer) => {
        return viewer.status === "Requested" || viewer.status === "Link Sent";
      });
      onTabChange(pending);
    } else if (tabIndex === 2 && activeTab !== 2) {
      const history = viewers.filter((viewer) => {
        return viewer.status === "Granted" || viewer.status === "Declined";
      });
      onTabChange(history);
    }

    setActiveTab(tabIndex);
  };

  return (
    <ul className={styles.tabsRow}>
      <li
        className={activeTab === 0 ? styles.activeTab : styles.tab}
        onClick={() => handleTabChange(0)}
      >
        Viewer List
      </li>
      <div className={styles.vr} />
      <li
        className={activeTab === 1 ? styles.activeTab : styles.tab}
        onClick={() => handleTabChange(1)}
      >
        Pending Requests
      </li>
      <div className={styles.vr} />
      <li
        className={activeTab === 2 ? styles.activeTab : styles.tab}
        onClick={() => handleTabChange(2)}
      >
        Viewer History
      </li>
    </ul>
  );
};

ViewersTabs.propTypes = {
  viewers: PropTypes.array.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default ViewersTabs;
