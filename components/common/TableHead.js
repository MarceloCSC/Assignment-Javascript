import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/components/Table.module.css";
import SwapVertIcon from "@material-ui/icons/SwapVert";

const TableHead = ({ columns, handleSorting }) => {
  const [clickedId, setClickedId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleClick = (columnId) => {
    const order =
      columnId === clickedId && sortOrder === "asc" ? "desc" : "asc";

    setClickedId(columnId);
    setSortOrder(order);
    handleSorting(columnId, order);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, columnId, width, sortable }) => {
          return (
            <th
              className={sortable ? styles.sortableHeader : styles.header}
              key={columnId}
              width={width}
              onClick={sortable ? () => handleClick(columnId) : null}
            >
              {label}
              {sortable && <SwapVertIcon className={styles.sortIcon} />}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  handleSorting: PropTypes.func.isRequired,
};

export default TableHead;
