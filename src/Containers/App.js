import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Paging from "../Components/Paging";
import Footer from "../Components/Footer";
import Error404 from "./404";
import Home from "../Pages/Cards/Home/Home";
import DatasContextProvider from "../Contexts/DatasContext";

class App extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <div>
              <Router>
                <DatasContextProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Error404 />} />    
                  </Routes>
                </DatasContextProvider>
              </Router>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
