import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/components/Pagination.module.css";

const Pagination = ({ totalPages, handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageToChange) => {
    const newPage = Math.min(
      totalPages,
      Math.max(1, currentPage + pageToChange)
    );
    setCurrentPage(newPage);
    handlePageChange(newPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrow} onClick={() => handleClick(-1)}>
        {"<"}
      </div>
      <div className={styles.pageNumber}>{currentPage}</div>
      <div className={styles.arrow} onClick={() => handleClick(1)}>
        {">"}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
