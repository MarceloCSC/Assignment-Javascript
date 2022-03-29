import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/components/SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({ placeholder, data, setFilteredData }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const input = event.target.value;
    const filtered = data.filter((value) => {
      return value.name.toLowerCase().includes(input.toLowerCase());
    });

    setQuery(input);
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setQuery("");
    setFilteredData(data);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <div className={styles.icon}>
        {query === "" ? (
          <SearchIcon />
        ) : (
          <CloseIcon className={styles.clearButton} onClick={handleClear} />
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  setFilteredData: PropTypes.func.isRequired,
};

export default SearchBar;
