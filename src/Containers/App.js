import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate }  from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "../Components/Footer";
import Error404 from "../Pages/404";
import Home from "../Pages/Home2";
import DatasContextProvider from "../Contexts/DatasContext";
import InfoObject from "../Pages/InfoObject";
import Advanced from "../Pages/Advanced"

class App extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
              <Router>
                <DatasContextProvider>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="404" element={<Error404/>} />
                    <Route path="*" element={<Navigate to="/404"/>} />
                    <Route path="/art/:objectID" element={<InfoObject/>} />
                    <Route path="/advanced" element={<Advanced/>} />
                  </Routes>
                  <Footer />
                </DatasContextProvider>
              </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
