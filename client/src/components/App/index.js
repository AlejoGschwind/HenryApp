import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppWrapper, CenterInPage, Quote, QuoteWrapper, Author } from './styles';
import routes from '../../routes';
import { autoLoginUser } from "../../redux/actions/authActions";
import Loading from '../Loading';

import { quotes } from "../../data";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(autoLoginUser());
  }, []);

  if (loading) {
    const num = Math.round(Math.random() * (quotes.length - 1));
    return (
      <CenterInPage>
        <Loading />
        <QuoteWrapper>
          <Quote>‟{quotes[num].text}”</Quote>
          <Author>{quotes[num].author}</Author>
        </QuoteWrapper>
      </CenterInPage>
    );
  };

  return (
    <AppWrapper>
      {routes()}
    </AppWrapper>
  );
}

export default App;
