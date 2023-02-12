import React, { Component } from "react";
import Navbar from "./Navbar";
import Paging from "../Components/Paging";
import Footer from "../Components/Footer";
import Carousel from "./Carousel"
import Error404 from "./404";

class App extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <div>
              <Error404/>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
