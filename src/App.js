import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, orange } from '@mui/material/colors';

import "./index.css"
import { getCoInfo } from './redux/actions';

import Home from './components/home'
import Company from './components/company';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

function App() {

  // const dispatch = useDispatch();
  // const { getAll } = useSelector(state => state)


  return (
    <div>
      <ThemeProvider theme={outerTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dx/:name" element={<Company />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;