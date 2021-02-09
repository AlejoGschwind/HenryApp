import React from 'react';

import {
  SearchWrapper,
  SearchIconStyled,
  CloseIconStyled,
  WhiteBox
} from "./styles";

const SearchInput = ({ search, setSearch, ...props }) => {


  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const clearInput = () => {
    setSearch("");
  };

  return (
    <SearchWrapper>
      <SearchIconStyled />
      <input
        autoComplete={false}
        value={search}
        onChange={handleChange}
        {...props}
      />
      {
        search.length > 0 ?
          <CloseIconStyled onClick={clearInput} />
          : <WhiteBox />
      }
    </SearchWrapper>
  );
};

export default SearchInput;
