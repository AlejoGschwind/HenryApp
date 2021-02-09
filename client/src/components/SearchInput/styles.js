import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";


export const SearchWrapper = styled.label`
  height: 100%;
  padding: 0 1rem;
  min-width: 300px;
  background: #FCFCFC;
  border: 0.1px solid #B3B3B3;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  & input {
    height:  30px;
    margin: 0.5rem;
    background: #FCFCFC;
    font-weight: 500;
    font-size: 18px;
    border: none;
    outline: none;
  }
`;

export const SearchIconStyled = styled(SearchIcon)`
  width: 26px;
  height: 26px;
  `;

export const CloseIconStyled = styled(CloseIcon)`
  width: 26px;
  height: 26px;
`;

export const WhiteBox = styled.div`
  width: 26px;
  height: 26px;
`;