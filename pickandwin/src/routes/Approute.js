import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";


function AppRoute(props) {
    return (
        <Router {...props}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="product/:id" element={<ProductPage />} />

                


            </Routes>
        </Router>
    );
}
export default AppRoute;