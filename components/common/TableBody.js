import PropTypes from "prop-types";
import styles from "../../styles/components/Table.module.css";
import { formatDate } from "../../utilities/utils";

const TableBody = ({ columns, tableData }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr className={styles.row} key={data.id}>
            {columns.map(({ columnId }) => {
              const field = data[columnId] ? data[columnId] : "—";

              if (Date.parse(field)) {
                field = formatDate(field);
              }

              return (
                <td
                  className={
                    field === "Granted"
                      ? styles.greenColor
                      : field === "Declined"
                      ? styles.redColor
                      : ""
                  }
                  key={columnId}
                >
                  {field}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default TableBody;
