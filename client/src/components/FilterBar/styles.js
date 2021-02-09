import styled from "styled-components";

export const FilterBarWrapper = styled.div`
  height: 70px;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 9px rgba(0, 0, 0, 0.15);
  background: white;

  display:  flex;
  align-items: center;
  position: relative;
`;

export const FilterIconWrapper = styled.div`
  height: 70px;
  width: 70px;
  background: #FCFCFC;
  border: 0.1px solid #B3B3B3;

  display:  flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInputWrapper = styled.div`
  height: 100%;
  align-self: flex-end;
  position: absolute;
  top: 0;
  right: 0;
`;
