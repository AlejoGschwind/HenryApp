import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

export const ButtonCancel = styled.button`
  height: 30px;
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: center;
  background: #4286F5;
  color: white;
  font-weight: 500;
  font-size: 18px;
  background: #000000;
  backdrop-filter: blur(250px);
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  `;

export const ButtonConfirm = styled(ButtonCancel)`
  background-color: white;
  color: black;
  border: 2px solid black;
`;

export const ConfirmationWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled.button`
  height: 50px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  /* width: 200px; */
  justify-content: center;
  background: white;
  color: black;
  font-weight: 500;
  font-size: 18px;
  backdrop-filter: blur(250px);
  border: 2px solid black;
  margin: 0 1rem 1rem 0;
  cursor: pointer;
`;