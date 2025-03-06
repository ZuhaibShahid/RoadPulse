import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoadPulse.css";

const Dashboard = React.lazy(() => import('./Pages/Dashboard'));
const Countries = React.lazy(() => import('./Pages/Countries'));
const Vehicles = React.lazy(() => import('./Pages/Vehicles'));
const Header = React.lazy(() => import('./Components/Header'));
const Nav = React.lazy(() => import('./Components/Nav'));

const App = () => {
  return (
    <> 
      <Router>
      <Header />
      <div className="container-fluid">
        <div className="row" style={{height: "100vh"}}>
          <div className="col-2 sidebar">
            <Nav />
          </div>
          <div className="col-10 p-5 mt-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/vehicles" element={<Vehicles />} />
            </Routes>
            </div>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
