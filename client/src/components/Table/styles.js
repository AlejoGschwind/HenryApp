import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  min-height: 500px;
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 70px;
  /* padding: 0 2rem; */
  border-radius: 3px;
  background: black;

  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 2fr;
`;

export const TableHead = styled.div`
  width: 1fr;
  height: 70px;
  margin: 0 1rem;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TableBody = styled.div`
  width: 100%;
  height: 80vh;
  margin: 1rem 0;
  border-radius: 3px;
  background: #fcfcfc;


`;

export const Row = styled.div`
  width: 100%;
  /* height: 50px; */
  padding-bottom: 4px;

  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 2fr;
  grid-gap: 4px;
`;

export const Cell = styled.div`
  padding: 1rem;
  width: 1fr;
  min-height: 60px;
  max-height: 60px;
  height: 60px;
  /* margin: 0 1rem; */
  color: black;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-collapse: collapse;
  /* box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.07); */
  border-radius: 5px;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionBox = styled.div`
  height: 30px;
  width: 30px;
  margin: 3px;
  background: black;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;