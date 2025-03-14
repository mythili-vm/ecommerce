import React from "react";
import "./App.css";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./customer/pages/Home/Home";

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
        <Navbar /> 
        <Home/>
        </div>
      </ThemeProvider>
  );
}

export default App;
