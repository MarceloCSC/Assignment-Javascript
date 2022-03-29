import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/components/Table.module.css";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const Table = ({ columns, data }) => {
  const [tableData, setTableData] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    setTableData(data.slice(0, pageSize));
  }, [data]);

  const handleSorting = (columnToSort, sortOrder) => {
    if (columnToSort) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[columnToSort] === null || a[columnToSort] === undefined) return 1;
        if (b[columnToSort] === null || b[columnToSort] === undefined)
          return -1;
        if (
          (a[columnToSort] === null || a[columnToSort] === undefined) &&
          (b[columnToSort] === null || b[columnToSort] === undefined)
        )
          return 0;

        if (a[columnToSort] < b[columnToSort]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[columnToSort] > b[columnToSort]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });

      setTableData(sorted);
    }
  };

  const handlePageChange = (currentPage) => {
    setTableData(
      data.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.tableContainer}>
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
      <Pagination
        totalPages={Math.ceil(data.length / pageSize)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
