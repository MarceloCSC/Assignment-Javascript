import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/pages/AccessRequests.module.css";
import Table from "../../components/common/Table";
import SearchBar from "../../components/common/SearchBar";
import ViewersTabs from "../../components/page-components/ViewersTabs";

const AccessRequests = ({ users }) => {
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    users.forEach((user, index) => {
      setUserAction(user, index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const handleClickAction = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      const newStatus = selectedUser.status;

      if (selectedUser.status === "Requested") {
        newStatus = "Granted";
      } else if (selectedUser.status === "Granted") {
        newStatus = "Declined";
      } else if (selectedUser.status === "Declined") {
        newStatus = "Granted";
      }
      selectedUser.status = newStatus;
      updateUserStatus(selectedUser);
    }
  };

  const updateUserStatus = async (user) => {
    setIsUpdating(true);

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await response.json();
    const i = users.findIndex((user) => user.id === data.id);
    users[i].status = data.status;
    setUserAction(users[i], i);
    setIsUpdating(false);
  };

  const setUserAction = (user, i) => {
    const actionLabel = "Edit Access";
    if (user.status === "Requested") {
      actionLabel = "Accept Invite";
    } else if (user.status === "Link Sent") {
      actionLabel = "Resend";
    }

    users[i].action = (
      <a
        className={styles.action}
        key="action"
        onClick={() => handleClickAction(user.id)}
      >
        {actionLabel}
      </a>
    );
  };

  const columns = [
    { label: "Viewer Name", columnId: "name", width: "22%", sortable: true },
    { label: "Company", columnId: "company", width: "20%", sortable: true },
    { label: "Job", columnId: "job", width: "22%", sortable: true },
    { label: "Status", columnId: "status", width: "12%", sortable: true },
    { label: "Date", columnId: "createdAt", width: "12%", sortable: true },
    { label: "Action", columnId: "action", width: "12%", sortable: false },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Access Requests</h1>
      <div className={styles.topCard}>
        <div className={styles.text}>
          <h3>Grant Access To Your Verified Credentials</h3>
          <p>
            Share your verified credentials directly with anyone. Granting
            access sends a custom link to the selected credentials you choose to
            share from your Digital Work Passport. You can revoke access at
            anytime
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <btn className={styles.button}>Grant Access</btn>
        </div>
      </div>
      <div className={styles.bottomCard}>
        <div className={styles.tableHeader}>
          <ViewersTabs viewers={users} onTabChange={setUsersToDisplay} />
          <SearchBar
            placeholder="Search by name"
            data={users}
            setFilteredData={setUsersToDisplay}
          />
        </div>
        <div className={styles.tableContainer}>
          <Table columns={columns} data={usersToDisplay} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();
  return {
    props: {
      users,
    },
  };
};

AccessRequests.propTypes = {
  users: PropTypes.array.isRequired,
};

export default AccessRequests;
