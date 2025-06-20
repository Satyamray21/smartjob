import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AppTheme from './themes/AppTheme';
import MainRouter from "./router/MainRouter";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { candidateLoginSuccess } from "./reduxSlice/candidateSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(candidateLoginSuccess({
        token,
        user: JSON.parse(user),
      }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
